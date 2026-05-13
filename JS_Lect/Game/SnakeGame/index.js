let canvas = document.querySelector("canvas")
let pen = canvas.getContext("2d")
// pen.fillStyle="red"
// pen.fillRect(400, 100, 4, 4)
// pen.fillStyle = "red"
// pen.fillRect(100,100,40,40)
let snakeCell = [[0, 0]]
let cell = 50
let direction = "Right"
let gameover = false
let h1 = document.querySelector("h1")
let score = 0
let Generate = GenerateR()

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
  if (gameover == true) {
    clearInterval(id)
    h1.innerText = "GameOver"
    h2.innerText = "Score"
    return
  }
    pen.fillStyle = "red"
    pen.clearRect(0,0,1000,600)
    for (let a of snakeCell) {
        pen.fillRect(a[0],a[1],cell,cell)
  }
  pen.fillStyle="pink"
  pen.font="40px sans-sarif"
  pen.fillText(`${score}`,50,50)
  pen.fillStyle = "orange"
  pen.fillRect(Generate[0],Generate[1],cell,cell)
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
     newY = headY
     if (newX ==1000) {
       gameover=true
     }
  }
  else if(direction=="Left"){
    newX=headX-cell
     newY = headY
     if (newX <0) {
      gameover= true
     }
  }
  else if(direction=="Down"){
    newX=headX
     newY = headY + cell
     if (newY == 600) {
       gameover=true
     }
  }
  else{
    newX=headX
     newY = headY - cell
     if (newY < 0) {
       gameover=true
     }
  }
  snakeCell.push([newX, newY])
  if (newX == Generate[0] && newY ==Generate[1]) {
    Generate = GenerateR()
    score++;
  }
  else {
    snakeCell.shift()
  }
}
let id=setInterval(() => {
    draw()
    update()
}, 200)

//Generate food 
function GenerateR() {
  return[
  Math.floor(Math.random()*950/cell)*cell,
    Math.floor(Math.random() * 550 / cell) * cell
  ]
}
// console.log(Math.random()*950,"Random Data X")
// console.log(Math.random()*550,"Random Data Y")