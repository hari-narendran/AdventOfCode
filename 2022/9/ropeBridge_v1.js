const { readFileSync, promises: fsPromises } = require('fs');

function readFile(fileName) {
  const contents = readFileSync(fileName, 'utf-8');
  const arr = contents.split('\n').map((line) => {
    const [letter, number] = line.split(' ');
    return {
      direction: letter,
      totalMoves: parseInt(number),
    };
  });
  return arr;
}

//let lines = readFile('./sampleData_2.txt');
let lines = readFile('./moves.txt');

const moveDefenitions = {
  R: {
    x: 1,
    y: 0,
  },
  L: {
    x: -1,
    y: 0,
  },
  U: {
    x: 0,
    y: -1,
  },
  D: {
    x: 0,
    y: 1,
  },
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(direction) {
    const delta = moveDefenitions[direction];
    this.x += delta.x;
    this.y += delta.y;
  }

  follow(point) {
    const distance = Math.max(
      Math.abs(this.x - point.x),
      Math.abs(this.y - point.y)
    );
    if (distance > 1) {
      const directionX = point.x - this.x;
      this.x += Math.abs(directionX) == 2 ? directionX / 2 : directionX;
      const directionY = point.y - this.y;
      this.y += Math.abs(directionY) == 2 ? directionY / 2 : directionY;
    }
    /* if (distance > 1) {
      const directionX = point.x - this.x;
      if (directionX >= 1) this.x++;
      else if (directionX < 1) this.x--;

      const directionY = point.y - this.y;
      if (directionY >= 1) this.y--;
      else if (directionY < 1) this.y++;
    } */
  }
}

function markVisited(x, y, visited) {
  visited.add(`${x}-${y}`);
}

function part1() {
  const head = new Point(0, 0);
  const tail = new Point(0, 0);
  const visited = new Set();
  markVisited(0, 0, visited);
  console.log('***********************************************************');
  console.log(head);
  console.log(tail);
  //console.log(lines);

  for (const line of lines) {
    console.log(line);
    for (let i = 0; i < line.totalMoves; i++) {
      head.move(line.direction);
      console.log('------- HEAD -------');
      console.log(head);
      markVisited(tail.x, tail.y, visited);
      tail.follow(head);
      console.log('------- TAIL -------');
      console.log(tail);
    }
  }

  console.log(visited);
  console.log(visited.size);
}

function part2() {
  console.log('***********************************************************');
  let nodes = [];
  const visited = new Set();
  markVisited(0, 0, visited);

  for (let i = 0; i < 10; i++) {
    nodes.push(new Point(0, 0));
  }
  // console.log(nodes);

  for (const line of lines) {
    console.log(line);
    const nodeSize = nodes.length;
    for (let j = 0; j < line.totalMoves; j++) {
      //* Move the head first
      nodes[0].move(line.direction);
      //* Move the knots based on head
      for (let i = 0; i < nodeSize - 1; i++) {
        nodes[i+1].follow(nodes[i]);
      }
      //console.log(nodes);
      //* Mark down the poisitions last knot visited
      markVisited(nodes[nodeSize-1].x, nodes[nodeSize-1].y, visited);
    }
    //console.log(nodes);
  }
  console.log(visited);
  console.log(visited.size);
}

//part1();
part2();
