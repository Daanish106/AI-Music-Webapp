song_H = "";
song_P = "";

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;

leftWrist = 0;
rightWrist = 0;
leftsong_stat = "";
rightsong_stat = "";

function preload() 
{  
   song1 = loadSound("Harry Potter Theme.mp4"); 
   song2 = loadSound("pirates of the caribin.mp4"); 
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded());
    poseNet.on('pose', gotPoses);
   
}

function modelLoaded()
{
    console.log("Model Loaded");
}


function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWrist = results[0].pose.keypoints[9].score;
        rightWrist = results[0].pose.keypoints[10].score;
    }
}   
function draw()
{
    image(video, 0, 0, 600, 500);

    leftsong_stat = song1.isPlaying();

    if(leftWrist > 0.2)
    {
        fill("#FF0000");
        stroke("#FF0000");
        circle(leftWristX, leftWristY, 30);

        song2.stop();

        if(leftsong_stat == false)
        {
            song1.play();
           
        }
    }

    rightsong_stat = song2.isPlaying();

    if(rightWrist > 0.2)
    {
        fill("#FF0000");
        stroke("#FF0000");
        circle(rightWristX, rightWristY, 30);

        song1.stop();

        if(rightsong_stat == false)
        {
            song2.play();
        }
    }
}