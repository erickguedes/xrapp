import {Scene, HemisphericLight, FreeCamera, Vector3} from 'babylonjs';
import { enableXRExperience } from '../features/xrExperience';
const log = console.log

export async function startScene(engine) {
    const scene = new Scene(engine);
    const light = new HemisphericLight('light', new Vector3(0, 2, 0), scene);
    const cam = new FreeCamera('cam', new Vector3(0, 0, -2), scene);
    //cam.attachControl(document.querySelector('canvas'), true);
    cam.attachControl()    
    //const box = MeshBuilder.CreateBox('box', {size: .5}, scene)
    //const {meshes, animationGroups} = await SceneLoader.ImportMeshAsync('', './models/', 'capoeira.glb', scene)
    //meshes[0].position.x = 2
    await scene.whenReadyAsync();
    await enableXRExperience(scene);
    return scene;
}