
const canvas = document.getElementById('Mycanvas')
const ctx = canvas.getContext('2d')
//ctx = Context
canvas.width  = 1024
canvas.height = 576

const collisionsMap = []
for (var i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, 70 + i))
}

const boundaries = []
const offset = {
  x: -930,
  y: -340
}

class Boundary {
  static width = 60
  static height = 60
  constructor({position}) {
    this.position = position
    this.width = 60
    this.height = 60
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}


collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if(symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y
          }
        })
      )
  })
})

const image = new Image()
image.src = './img/SunnyTown.png'

const playerImage = new Image()
playerImage.src = './img/mainchar/playerDown.png'

class Sprite {
  constructor({position, velocity, image, frames = {max: 1}}) {
    this.position = position
    this.image = image
    this.frames = frames
    //add onload if unsafe, for now not needed, image alrdy checked
    this.width = this.image.width / this.frames.max
    this.height = this.image.height

  }

  draw() {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height,
    )
  }
}

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const player = new Sprite({
  position: {
    x: canvas.width/2 - (192 / 4) / 2,
    y: canvas.height/2 - 68 / 2
  },
  image: playerImage,
  frames: {
    max: 4
  }
})

image.onload = () => {
  playerImage.onload = () => {
    animateCharacter()
  }
}

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

const testBoundary = new Boundary ({
  position: {
    x: 400,
    y: 400
  }
})

const moveables = [background, testBoundary]

function rectangularCollision({rectangle1, rectangle2}){
  return(
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function animateCharacter(){
  window.requestAnimationFrame(animateCharacter)

  background.draw()
  //boundaries.forEach(boundary => { boundary.draw()})
  testBoundary.draw()
  player.draw()

  if(rectangularCollision({
    rectangle1: player,
    rectangle2: testBoundary
  })){
    console.log('colliding')
    ctx.strokeRect(testBoundary.position.x, testBoundary.position.y, testBoundary.width, testBoundary.height);
  } else {
      console.log('not colliding');
    }

  if (keys.w.pressed && lastkey === 'w') {
    moveables.forEach((moveabel) => {
      moveabel.position.y += 3
    })
  }
  else if (keys.a.pressed && lastkey === 'a'){
    moveables.forEach((moveabel) => {
      moveabel.position.x += 3
    })
  }
  else if (keys.d.pressed && lastkey === 'd'){
    moveables.forEach((moveabel) => {
      moveabel.position.x -= 3
    })
  }
  else if (keys.s.pressed && lastkey === 's'){
    moveables.forEach((moveabel) => {
      moveabel.position.y -= 3
    })
  }
}

let lastkey = ''

window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = true;
        lastkey = 'w'
        break;
      case 'a':
        keys.a.pressed = true;
        lastkey = 'a'
        break;
      case 's':
        keys.s.pressed = true;
        lastkey = 's'
        break;
      case 'd':
        keys.d.pressed = true;
        lastkey = 'd'
        break;
    }
  })

  window.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'w':
          keys.w.pressed = false;
          break;
        case 'a':
          keys.a.pressed = false;
          break;
        case 's':
          keys.s.pressed = false;
          break;
        case 'd':
          keys.d.pressed = false;
          break;
      }
    })
