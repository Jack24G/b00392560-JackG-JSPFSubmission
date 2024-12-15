import setSceneIndex from "./../index";
import {
  Scene,
  ArcRotateCamera,
  Vector3,
  Camera,
  Engine,
  Sound
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

// Create Text
function createText(scene: Scene, theText: string, x: string, y: string, s: string, c: string, advtex) {
  let text = new GUI.TextBlock();
  text.text = theText;
  text.color = c;
  text.fontSize = s;
  text.fontWeight = "bold";
  text.left = x;
  text.top = y;
  advtex.addControl(text);
  return text;
}

// Create Rectangle
function createRectangle(scene: Scene, w: string, h: string, x: string, y: string, cr: number, c: string, t: number, bg: string, advtext) {
  let rectangle = new GUI.Rectangle();
  rectangle.width = w;
  rectangle.height = h;
  rectangle.left = x;
  rectangle.top = y;
  rectangle.cornerRadius = cr;
  rectangle.color = c;
  rectangle.thickness = t;
  rectangle.background = bg;
  advtext.addControl(rectangle);
  return rectangle;
}

// Create Scene Button
function createSceneButton(scene: Scene, name: string, note: string, index: number, x: string, y: string, advtex) {
  let button = GUI.Button.CreateSimpleButton(name, note);
  button.left = x;
  button.top = y;
  button.width = "80px";
  button.height = "30px";
  button.color = "white";
  button.cornerRadius = 20;
  button.background = "purple";
  advtex.addControl(button);


  const ragnarokSound = new Sound("RagnarokSound", "./assets/audio/ragnarok.mp3", scene, null, {
    loop: false,      
    autoplay: false   // Do not autoplay, will be played only when button2 is clicked
  });

  // Add click handler to the button
  button.onPointerUpObservable.add(function() {
    console.log("THE BUTTON HAS BEEN CLICKED");

    // Check if it's button2 (Ragnarok) and play the sound
    if (name === "but2") {
      ragnarokSound.play(); // Only play this sound for button2
    }

    // Set the scene index (you can adjust this part as per your scene management)
    setSceneIndex(index - 1);
  });

  return button;
}

// Create Arc Rotate Camera
function createArcRotateCamera(scene: Scene) {
  let camAlpha = -Math.PI / 2,
    camBeta = Math.PI / 2.5,
    camDist = 10,
    camTarget = new Vector3(0, 0, 0);
  let camera = new ArcRotateCamera(
    "camera1",
    camAlpha,
    camBeta,
    camDist,
    camTarget,
    scene,
  );
  camera.attachControl(true);
  return camera;
}

// Main Rendering Area for Your Scene
export default function menuScene(engine: Engine) {
  interface SceneData {
    scene: Scene;
    advancedTexture: GUI.AdvancedDynamicTexture;
    button1: GUI.Button;
    button2: GUI.Button;
    camera: Camera;
  }

  let scene = new Scene(engine);
  let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
  var button1 = createSceneButton(scene,"but1", "Utopia", 1,"-150px", "120px", advancedTexture);
  var button2 = createSceneButton(scene,"but2", "Ragnarok", 2,"-50px", "120px", advancedTexture);
  var camera = createArcRotateCamera(scene);

  let that: SceneData = {
    scene,
    advancedTexture,
    button1,
    button2,
    camera
  };
    
  return that;
}
