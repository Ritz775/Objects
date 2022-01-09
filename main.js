img = "";

status = "";

object_detector = "";

objects = [];

function preload() {
  img = loadImage("dog_cat.jpg");
}

function setup() {
  canvas = createCanvas(640, 420);
  canvas.center();
  object_detector = ml5.objectDetector("Cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Dectecting Objects";
}

function modelLoaded() {
  console.log("modelLoaded");
  status = true;
  object_detector.detect(img, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  }  
    console.log(results);
    objects = results;
}

function draw() {
  image(img, 0, 0, 640, 420);
  if (status != "") {
    for (let i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status: Object Detected";
      fill("red");
      percent = floor(100 * objects[i].confidence);
      text(objects[i].label + " " + percent + " %", objects[i].x+15, objects[i].y+15);
      noFill();
      stroke("red");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}
