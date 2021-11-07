export default class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.xBuffer;
        this.yBuffer;
        this.SPEED = 2;
    }
    updateRotation(mousePosition) { //updates first person perspective
        let camBuffer;

        camBuffer = this.camera.rotation.y;
        this.camera.rotation.y -= (mousePosition.changeX / window.innerWidth) * 2*Math.PI;
        if (isNaN(this.camera.rotation.y)) this.camera.rotation.y = camBuffer;
        if (mousePosition.changeX === this.xBuffer) mousePosition.changeX = 0;
        this.xBuffer = mousePosition.changeX;
    
        camBuffer = this.camera.rotation.x;
        this.camera.rotation.x -= (mousePosition.changeY / window.innerHeight) * 2*Math.PI;
        if (isNaN(this.camera.rotation.x)) this.camera.rotation.x = camBuffer;
        if (mousePosition.changeY === this.yBuffer) mousePosition.changeY = 0;
        this.yBuffer = mousePosition.changeY;
        if (this.camera.rotation.x >= Math.PI / 2) this.camera.rotation.x = Math.PI / 2;
        if (this.camera.rotation.x <= -Math.PI / 2) this.camera.rotation.x = -Math.PI / 2;
    }
    updatePosition(actionObject) {
        if (actionObject.forward) {
            this.camera.position.z -= Math.cos(this.camera.rotation.y) * this.SPEED;
            this.camera.position.x -= Math.sin(this.camera.rotation.y) * this.SPEED;
        }
        if (actionObject.back) {
            this.camera.position.x += Math.sin(this.camera.rotation.y) * this.SPEED;
            this.camera.position.z += Math.cos(this.camera.rotation.y) * this.SPEED;
        }
        if (actionObject.left) {
            this.camera.position.x -= Math.cos(this.camera.rotation.y) * this.SPEED;
            this.camera.position.z += Math.sin(this.camera.rotation.y) * this.SPEED;
        }
        if (actionObject.right) {
            this.camera.position.x += Math.cos(this.camera.rotation.y) * this.SPEED;
            this.camera.position.z -= Math.sin(this.camera.rotation.y) * this.SPEED;
        }
    }
}