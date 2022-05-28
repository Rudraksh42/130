song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload() {

    song = loadSound("music.mp3");

}

function setup() {

    canvas = createCanvas(600, 600);
    canvas.center()

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model is READY");
}

function gotPoses(results) {



    if (results.length > 0) {

        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;

        console.log("score of Left Wrist = " + scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("value of left wrist x" + leftWristX, "value of left wrist y" + leftWristY);

        scoreRightWrist = results[0].pose.keypoints[10].score;

        rightWristX = results[0].pose.leftWrist.x;
        rightWristY = results[0].pose.leftWrist.y;
        console.log("value of right wrist x" + rightWristX, "value of right wrist y" + rightWristY);
    }


};


function draw() {

    image(video, 0, 0, 600, 600);

    fill("#FF0000")
    stroke("#FF0000")

    if (scoreLeftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);
        InNumberLeftWristY = Number(leftWristY);
        remove_decimel = floor(InNumberLeftWristY);
        volume = remove_decimel / 500;
        song.setVolume(volume)
        document.getElementById("volume").innerHTML = "volume = " + volume;

    }

    if (scoreRightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed = 1.0x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed = 2.0x";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }


}

function playMusic() {

    song.play();
    song.setVolume(1);
    song.rate(1)

}
