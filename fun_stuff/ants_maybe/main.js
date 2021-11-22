import Ant from "./Ant";

const FPS = 60;

window.onload = () => {
  const canvas = document.createElement("canvas");
  //canvas.width = window.innerWidth;
  //canvas.height = window.innerHeight;
  canvas.width = 300;
  canvas.height = 300;
  canvas.id = "animationScreen";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  //console.log(ctx.getImageData(10, 10, 1, 1).data);

  let ants = [];
  for (let i = 0; i < 10; i++)
    ants.push(new Ant({ x: canvas.width / 2, y: canvas.height / 2 }));

  function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.001)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ants.forEach((ant) => ant.update(ctx));
    requestAnimationFrame(animate);
  }

  animate();
  setInterval(() => {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  }, 500);
};
