const fs = require('fs')


//fs.readFile('./12/sampleInput.txt', 'utf-8', (err,data) => {
    fs.readFile('sampleInput.txt', 'utf-8', (err,data) => {
    let sr,sc,er,ec
    
    const grid = data.split('\n').map(row => row.split(''))
    
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[0].length; c++) {
            if (grid[r][c] === 'S'){
                sr = r
                sc = c
                grid[r][c] = 'a'
            }
            if (grid[r][c] === 'E'){
                er = r
                ec = c
                grid[r][c] = 'z'
            }
        }
    }

    const queue = []
    queue.push([sr,sc,0])
    
    const visited = []
    visited.push(`${sr}:${sc}`)

    while (queue.length) {
        const [r,c,d] = queue.shift();

        const next = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]]
        for (let i=0 ; i<next.length; i++) {
            const nr = next[i][0]
            const nc = next[i][1]

            if (nr < 0 || nc < 0 || nr >= grid.length || nc >= grid[0].length)
                continue
            if (visited.find(x => x === `${nr}:${nc}`))
                continue
            if (grid[nr][nc].charCodeAt() - grid[r][c].charCodeAt() > 1)
                continue
            if (nr == er && nc == ec){
                console.log(d + 1)
                return
            }

            visited.push(`${nr}:${nc}`)
            queue.push([nr, nc, d + 1])
            
        }
        console.log(visited);
    console.log(queue);
    }
})