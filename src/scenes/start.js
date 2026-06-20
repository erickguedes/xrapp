import {Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder, WebXRHitTest, WebXRAnchorSystem} from 'babylonjs';

export async function startScene(engine) {
    const scene = new Scene(engine);
    
    const light = new HemisphericLight('light', new Vector3(0, 2, 0), scene);
    const cam = new FreeCamera('cam', new Vector3(0, 0, -2), scene);
    //cam.attachControl(document.querySelector('canvas'), true);
    cam.attachControl()
    
    //const box = MeshBuilder.CreateBox('box', {size: .5}, scene)
    const dot = MeshBuilder.CreateSphere('dot', {diameter: .05}, scene);
    dot.material = new BABYLON.StandardMaterial('dotMat', scene);
    dot.material.diffuseColor.set(1, 0, 0);

    const xr =await scene.createDefaultXRExperienceAsync({
        uiOptions: { sessionMode: 'immersive-ar' }
    })

    const fm = xr.baseExperience.featuresManager;
    const hitTest = fm.enableFeature(WebXRHitTest, 'latest');

    hitTest.onHitTestResultObservable.add((results) => {
        if(results.length) {
            results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
        }
    });

    await scene.whenReadyAsync();
    return scene;
}