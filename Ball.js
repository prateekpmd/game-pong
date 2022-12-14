const INITIAL_VELOCITY = 0.025;
const VELOCITY_INCREASE = 0.00001;

export default class Ball {
  constructor(ballElement) {
    this.ballElement = ballElement;
    this.reset();
  }
  get x() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--x")
    );
  }

  set x(value) {
    this.ballElement.style.setProperty("--x", value);
  }

  get y() {
    return parseFloat(
      getComputedStyle(this.ballElement).getPropertyValue("--y")
    );
  }
  set y(value) {
    this.ballElement.style.setProperty("--y", value);
  }
  rect() {
    return this.ballElement.getBoundingClientRect();
  }

  reset() {
    this.x = 50;
    this.y = 50;
    this.direction = { x: 0, y: 0 };
    while (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >=
        0.9 /* not gonna be fun if the vaalue is less that 0.2 it means its gonna just move up and dowan and if its more than 0.9 its gonna be moving only in x axis so the value showld be betwween 0.2 or 0.9 in x axis*/
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI);
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) };
    }
    console.log(this.direction);
    this.velocity = INITIAL_VELOCITY;
  }
  update(delta, paddleRects) {
    this.x += this.direction.x * this.velocity * delta;
    this.y += this.direction.y * this.velocity * delta;

    this.velocity += VELOCITY_INCREASE * delta;
    const rect = this.rect();
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1;
    }
    if (paddleRects.some((r) => isCollision(r, rect))) {
      this.direction.x *= -1;
    }
  }
}

function isCollision(paddR, ballR) {
  return (
    paddR.right >= ballR.left &&
    paddR.left <= ballR.right &&
    paddR.top <= ballR.bottom &&
    paddR.bottom >= ballR.top
  );
}
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
