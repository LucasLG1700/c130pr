m1 = "";
m2 = "";
m1Status = "";
m2Status = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = "";
scoreLeftWrist = "";

function preload()
{
    m1 = loadSound("m1.mp3");
    m2 = loadSound("tem_pobre_ligando_pra.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded(){
    console.log('PoseNet Is Initialized');
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ABDCFE");
    

    m1Status = m1.isPlaying();
    m2Status = m2.isPlaying();
    if(scoreLeftWrist >0.1){
        circle(leftWristX, leftWristY, 100, 100);
        m2.stop();
        if( m1 == false){
         m1.play();
         document.getElementById("m1").innerHTML = "MINECRAFT INICIAL 1";
        }
    }
        if(scoreRightWrist >0.1){
            circle(rightWristX, rightWristY, 100, 100);
            m1.stop();
            if( m2 == false){
             m2.play();
             document.getElementById("m2").innerHTML = "MINECRAFT INICIAL 2";
            }

}
    }
    

function gotPoses(results)
{
    if(results.length > 0)
    {
    console.log(results);
    scoreRightWrist = results[0].pose.keypoints[10].score;
    scoreLeftWrist = results[0].pose.keypoints[9].score;


    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y; 
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}