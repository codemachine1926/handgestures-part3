result_1 = "";
result_2 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:85
});

Webcam.attach("camera");

function take_snapshot() {

    Webcam.snap(function (dataURI) {

        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+dataURI+'">';
    });
}
console.log("ml5 version : ", ml5.version)

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/GF8CqWzj0/model.json",modelLoaded);

function modelLoaded() {
    console.log("model is loaded");
}

function speak() {

john = window.speechSynthesis;
predict1 = "Your hand gesture is either" + result_1;
predict2 = "Or it is " + result_2;
utterthis = new SpeechSynthesisUtterance(predict1 + predict2);

john.speak(utterthis);

}

function predict() {

    img = document.getElementById("captured_image");
    classifier.classify(img,gotresult);
}

function gotresult(error1,results) {

    if (error1) {
        console.error(error1);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        
        result_1 = results[0].label;
        result_2 = results[1].label;
        speak()

        if(results[0].label == "thumbs up")
        {

            document.getElementById("update_emoji").innerHTML ="&#128077;";
        }
        if(results[0].label == "thumbs down")
        {

            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "victory")
        {

            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "amazing")
        {

            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "mouth close ears open")
        {

            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }




        if(results[1].label == "thumbs up")
        {

            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if(results[1].label == "thumbs down")
        {

            document.getElementById("update_emoji2").innerHTML = "&#128078;";
        }
        if(results[1].label == "victory")
        {

            document.getElementById("update_emoji2").innerHTML = "&#9996;";
        }
        if(results[1].label == "amazing")
        {

            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
        if(results[1].label == "mouth close ears open")
        {

            document.getElementById("update_emoji2").innerHTML = "&#129304;";
        }
    }
}