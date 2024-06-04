
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
  y: -347
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

const foregroundImage = new Image()
foregroundImage.src = './img/SunnyTownForeground.png'

const playerImage = new Image()
playerImage.src = './img/mainchar/playerDown.png'


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

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
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

const moveables = [background, ...boundaries, foreground]

function rectangularCollision({rectangle1, rectangle2}){
  return(
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  )
}

function animateCharacter(){
  window.requestAnimationFrame(animateCharacter)

  background.draw()
  boundaries.forEach(boundary => {
    boundary.draw()

  })
  player.draw()

  foreground.draw()

  let moving = true

  if (keys.w.pressed && lastkey === 'w') {
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i]
      if(
        rectangularCollision({
          rectangle1: player,
          rectangle2: {...boundary, position: {
            x: boundary.position.x,
            y: boundary.position.y + 3
          }}
          })
      ) {
        console.log('colliding')
        ctx.strokeRect(boundary.position.x, boundary.position.y, boundary.width, boundary.height);
        moving = false
        break
      }
    }

    if(moving)
      moveables.forEach((moveabel) => {
        moveabel.position.y += 3
      })
  }
    else if (keys.a.pressed && lastkey === 'a'){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position: {
              x: boundary.position.x + 3,
              y: boundary.position.y
            }}
            })
        ) {
          console.log('colliding')
          ctx.strokeRect(boundary.position.x, boundary.position.y, boundary.width, boundary.height);
          moving = false
          break
        }
      }

      if(moving)
        moveables.forEach((moveabel) => {
          moveabel.position.x += 3
        })
    }
    else if (keys.d.pressed && lastkey === 'd'){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position: {
              x: boundary.position.x - 3,
              y: boundary.position.y
            }}
            })
        ) {
          console.log('colliding')
          ctx.strokeRect(boundary.position.x, boundary.position.y, boundary.width, boundary.height);
          moving = false
          break
        }
      }

      if(moving)
        moveables.forEach((moveabel) => {
          moveabel.position.x -= 3
        })
    }
    else if (keys.s.pressed && lastkey === 's'){
      for (let i = 0; i < boundaries.length; i++) {
        const boundary = boundaries[i]
        if(
          rectangularCollision({
            rectangle1: player,
            rectangle2: {...boundary, position: {
              x: boundary.position.x,
              y: boundary.position.y - 3
            }}
            })
        ) {
          console.log('colliding')
          ctx.strokeRect(boundary.position.x, boundary.position.y, boundary.width, boundary.height);
          moving = false
          break
        }
      }

      if(moving)
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
