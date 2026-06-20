import {WebXRAnchorSystem, PointerEventTypes} from 'babylonjs';
let enabled = false
export function enableAnchorSystem(fm, scene) {
    try {
        const anchorSystem = fm.enableFeature(WebXRAnchorSystem, 'latest');
        anchorSystem.onAnchorAddedObservable.add( anchor => {
        //anchor.attachedNode = dot.clone()
        //const clone = meshes[0].clone()
        //anchor.attachedNode = clone
        })
        enabled = true

        scene.onPointerObservable.add( event => {
        //if(lastHit && anchorSystem) anchorSystem.addAnchorPointUsingHitTestResultAsync(lastHit)
        }, PointerEventTypes.POINTERDOWN)

        return anchorSystem
    } catch(error) {
        console.log(error);
        enabled = false
        return error
    }
}

