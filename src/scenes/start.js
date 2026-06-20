import {Scene, HemisphericLight, FreeCamera, Vector3, MeshBuilder,
    WebXRHitTest, WebXRAnchorSystem, PointerEventTypes, SceneLoader} from 'babylonjs';

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

    const {meshes, animationGroups} = await SceneLoader.ImportMeshAsync('', './models/', 'capoeira.glb', scene)
    
    meshes[0].position.x = 2

    const xr =await scene.createDefaultXRExperienceAsync({
        uiOptions: { sessionMode: 'immersive-ar' }
    })

    const fm = xr.baseExperience.featuresManager;
    const hitTest = fm.enableFeature(WebXRHitTest, 'latest');
    const anchorSystem = fm.enableFeature(WebXRAnchorSystem, 'latest');

    let lastHit = undefined
    hitTest.onHitTestResultObservable.add((results) => {
        if(results.length) {
            lastHit = results[0]
            results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
        }
    })
    anchorSystem.onAnchorAddedObservable.add( anchor => {
       //anchor.attachedNode = dot.clone()
       const clone = meshes[0].clone()
       //clone.position.x = Scalar.RandomRange(1.5, 2)
       anchor.attachedNode = clone
    })

    scene.onPointerObservable.add( event => {
        if(lastHit && anchorSystem) anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit)
        }, PointerEventTypes.POINTERDOWN)

    await scene.whenReadyAsync();
    return scene;
}