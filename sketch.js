var tower, door, climber, ghost, invis_block;
var tower_image, door_image, climber_image, ghost_image;
var doorGroup, climberGroup, invisGroup;
var play = 1
var end = 0
var gameState = play

function preload() {
  tower_image = loadImage("tower.png")
  door_image = loadImage("door.png")
  climber_image = loadImage("climber.png")
  ghost_image = loadImage("ghostStanding.png")
}

function setup() {
  createCanvas(600, 600)
  tower = createSprite(300, 300, 10, 10)
  tower.addImage(tower_image)
  tower.velocityY = 3

  ghost = createSprite(200, 300, 10, 10)
  ghost.addImage(ghost_image)
  ghost.scale = 0.4

  doorGroup = createGroup();
  climberGroup = createGroup();
  invisGroup = createGroup();
}

function draw() {
  background(0)
  if (gameState === play) {


    if (tower.y > 600) {
      tower.y = width / 2
    }



    if (keyDown("space")) {
      ghost.velocityY = -5
    }
    if (keyDown("right")) {
      ghost.x += 3
    }
    if (keyDown("left")) {
      ghost.x -= 3
    }
    ghost.velocityY = ghost.velocityY + 0.53
    spawnDoors()
    if (ghost.isTouching(climberGroup)) {
      ghost.velocityY = 0
    }
    if (ghost.isTouching(invisGroup) || ghost.y > 600) {
      ghost.destroy();
      gameState = end
    }
    drawSprites();
  }
  if (gameState === end) {
    textSize(30)
    fill("yellow")
    stroke("white")
    text("GAME OVER", 215, 300)
  }
  console.log(ghost.y)

}

function spawnDoors() {
  if (frameCount % 120 === 0) {
    door = createSprite(300, -50, 5, 5)
    door.addImage(door_image)
    door.velocityY = 4
    door.x = Math.round(random(150, 400))
    door.lifetime = 150
    ghost.depth = door.depth
    ghost.depth += 1
    doorGroup.add(door)

    climber = createSprite(300, 10, 5, 5)
    climber.addImage(climber_image)
    climber.velocityY = 4
    climber.x = door.x
    climber.lifetime = 150
    climberGroup.add(climber)

    invis_block = createSprite(300, 15, climber.width, 3)
    invis_block.velocityY = 4
    invis_block.x = door.x
    invis_block.lifetime = 150
    invis_block.visible = false
    invisGroup.add(invis_block)

  }
}