
const canvas = document.getElementById('Mycanvas')
const ctx = canvas.getContext('2d')
//ctx = Context

canvas.width  = 1024
canvas.height = 576

ctx.fillStyle = 'white'
ctx.fillRect(0,0,canvas.width, canvas.height)

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
    x: -1050,
    y: -775
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

  background.draw();

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
  if (keys.w.pressed) background.position.y = background.position.y + 3
  else if (keys.a.pressed) background.position.x = background.position.x - 3
  else if (keys.d.pressed) background.position.x = background.prosition.x + 3
  else if (keys.s.pressed) background.position.y = background.position.y - 3
}

window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'w':
        keys.w.pressed = true;
        break;
      case 'a':
        keys.a.pressed = true;
        break;
      case 's':
        keys.s.pressed = true;
        break;
      case 'd':
        keys.d.pressed = true;
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
