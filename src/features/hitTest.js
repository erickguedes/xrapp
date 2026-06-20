import {MeshBuilder, WebXRHitTest} from 'babylonjs'
let enabled = false
let lastHit = undefined

export function getLastHit() {
    return lastHit
}

export function enableHitTest(fm, scene){
    try {
        const hitTest = fm.enableFeature(WebXRHitTest, 'latest');
        const dot = MeshBuilder.CreateSphere('dot', {diameter: .05}, scene);
        dot.material = new BABYLON.StandardMaterial('dotMat', scene);
        dot.material.diffuseColor.set(1, 0, 0);
        hitTest.onHitTestResultObservable.add((results) => {
            if(results.length) {
                lastHit = results[0]
                results[0].transformationMatrix.decompose(dot.scaling, dot.rotationQuaternion, dot.position);
            }else lastHit = undefined
        })
        enabled = true
        return hitTest
    } catch(error) {
        console.log(error);
        enabled = false
        return error
    }
}