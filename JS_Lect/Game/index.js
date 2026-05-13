let canvas = document.querySelector("canvas")
let pen = canvas.getContext("2d")
// pen.fillStyle="red"
// pen.fillRect(400, 100, 4, 4)
// pen.fillStyle = "red"
// pen.fillRect(100,100,40,40)
let snakeCell = [[0, 0]]
let cell = 50
let direction = "Right"

document.addEventListener("keydown", (e) => {
    console.log(e);
    if (e.key == 'ArrowUp') {
        direction="Up"
    } else if (e.key == 'ArrowDown') {
        direction="Down"
    } else if (e.key == 'ArrowLeft') {
        direction="Left"
    } else {
        direction="Right"
    }
    
})

function draw() {
    pen.fillStyle = "red"
    pen.clearRect(0,0,1000,600)
    for (let a of snakeCell) {
        pen.fillRect(a[0],a[1],cell,cell)
    }
    
}
function update() {
   let headX= snakeCell[snakeCell.length-1][0]
   let headY= snakeCell[snakeCell.length-1][1]
    // let newx = headx + cell
    // let newy = heady 
    let newX
    let newY
   if(direction=="Right"){
    newX=headX+cell
    newY=headY
  }
  else if(direction=="Left"){
    newX=headX-cell
    newY=headY
  }
  else if(direction=="Down"){
    newX=headX
    newY=headY+cell
  }
  else{
    newX=headX
    newY=headY-cell
  }
snakeCell.push([newX, newY])
snakeCell.shift()
    
}
setInterval(() => {
    draw()
    update()
},200)