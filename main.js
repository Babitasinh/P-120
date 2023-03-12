function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier=ml5.imageClassifier('MobileNet',modelLoaded);
  }
  
  function draw()
  {
    image(video,0,0,300,300);
    classifier.classify(video,gotResult);
  }
  
  function modelLoaded()
  {
    console.log('Model Loaded');
  }
  
  function gotResult(error,result)
  {
    if (error){
      console.error(error);
    }else{
    console.log(result);
    previous_result=result[0].label;
    var synth=window.speechSynthesis;
    speak_data="object detected is -"+result[0].label;
    utter_this=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
  
   document.getElementById("result_object_name").innerHTML=result[0].label;
   document.getElementById("result_object_accuracy").innerHTML=result[0].confidence.toFixed(2);
    }
  }