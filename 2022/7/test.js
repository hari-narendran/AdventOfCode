const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, './terminalOutput.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

class File {
	constructor(name, size) {
		this.name = name;
		this._size = size;
	}

	size() {
		return this._size;
	}
}

class Dir {
	constructor(name, parentDir) {
		this.isDir = true;
		this.parentDir = parentDir;
		this.name = name;
		this.contents = [];
	}

	// This should be cached, but our input is small enough that its OK to always recompute
	size(ignore) {
		if (ignore === this) {
			return 0;
		}

		return this.contents.map((v) => v.size(ignore)).reduce((a, b) => a + b, 0);
	}
}

class Filesystem {
	constructor(instructions) {
		this.rootDir = new Dir('/', null);
		this.build(instructions);
	}

	size(ignore) {
		return this.rootDir.size(ignore);
	}

	build(instructions) {
		let currentDir = this.rootDir;
		for (let line of instructions) {
			if (line.startsWith('$ cd')) {
				const [, dir] = /\$ cd (.+)$/.exec(line);
				if (dir === '/') {
					currentDir = this.rootDir;
				} else if (dir === '..') {
					currentDir = currentDir.parentDir;
				} else {
					currentDir = currentDir.contents.find((v) => v.isDir && v.name === dir);
				}
			} else if (line.startsWith('$ ls')) {
				continue;
			} else {
				// In a `ls` output
				if (line.startsWith('dir ')) {
					const [, dirName] = /dir (.+)$/.exec(line);
					const newDir = new Dir(dirName, currentDir);
					currentDir.contents.push(newDir);
				} else {
					// file
					let [, size, fileName] = /(\d+) (.+)$/.exec(line);
					size = parseInt(size, 10);

					const newFile = new File(fileName, size);
					currentDir.contents.push(newFile);
				}
			}
		}
	}

	static *walk(dir) {
		for (let c of dir.contents) {
			yield c;
			if (c.isDir) {
				yield* Filesystem.walk(c);
			}
		}
	}

	*[Symbol.iterator]() {
		yield* Filesystem.walk(this.rootDir);
	}
}

const drive = new Filesystem(input);
const dirs = [...drive].filter((v) => v.isDir);

// Part one
let smallDirsSum = 0;
for (let item of dirs) {
	let size = item.size();
	if (size <= 100000) {
		smallDirsSum += size;
	}
}

// Part two
let couldWork = new File('dummy', Number.MAX_VALUE);
const DRIVE_SIZE = 70000000;
for (let someDir of dirs) {
	const sizeWithoutSomeDir = drive.size(someDir);
	const unusedSpace = DRIVE_SIZE - sizeWithoutSomeDir;
	if (unusedSpace >= 30000000) {
		if (someDir.size() < couldWork.size()) {
			couldWork = someDir;
		}
	}
}

console.log('Part One:', smallDirsSum);
console.log('Part Two:', couldWork.size());
