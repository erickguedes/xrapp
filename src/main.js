import {Engine, Scene} from 'babylonjs'; 
import 'babylonjs-loaders';
import {startScene} from './scenes/start.js'; 
const engine = new Engine(document.querySelector('canvas'), true); 

async function main() { 
    const scene = await startScene(engine) 
    
    engine.runRenderLoop(() => scene.render()) 
    window.addEventListener('resize', () => engine.resize()); 
} 

main();