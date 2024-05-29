
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
  constructor({position, velocity, image}) {
    this.position = position
    this.image = image
  }

  draw() {
    ctx.drawImage(this.image, this.position.x , this.position.y)
  }
}

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
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

function animateCharacter(){
  window.requestAnimationFrame(animateCharacter)

  background.draw()
  boundaries.forEach(boundary => {
    boundary.draw()
  })

  ctx.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    canvas.width/2 - (playerImage.width / 4) / 2,
    canvas.height/2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height,
  )
  if (keys.w.pressed && lastkey === 'w') background.position.y += 3
  else if (keys.a.pressed && lastkey === 'a') background.position.x += 3
  else if (keys.d.pressed && lastkey === 'd') background.position.x -= 3
  else if (keys.s.pressed && lastkey === 's') background.position.y -= 3
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
    console.log(keys)
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
      console.log(keys)
    })
