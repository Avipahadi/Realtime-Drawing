noseX = 0;
noseY = 0;
difference = 0;
leftwristX = 0;
rightristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(550, 500);
    video.position(100, 150);
    canvas = createCanvas(550, 550);
    canvas.position(800, 150);
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + ", " + "Nose Y = " + noseY);
        leftwristX = results[0].pose.leftWrist.x;
        rightwristX = results[0].pose.rightWrist.x;
        difference = floor(leftwristX - rightwristX);
        console.log("Left Wrist = " + leftwristX + ", " + "Right Wrist" + rightwristX + ", " + "Difference = " + difference);
    }
}

function modelLoaded() {
    console.log('PoseNet is initialized!');
}

function draw() {
    background('#969a97');
    fill("#00ffff");
    stroke("#ffffff");
    square(noseY, noseX, difference);
    document.getElementById("square_sides").innerHTML = "Width and Height of square will be = " + difference + "px";
}