export default class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.xBuffer;
        this.yBuffer;
        this.SPEED = 2;
    }
    update(mousePosition, actionObject, resize, renderer) {
        this.updateRotation(mousePosition);
        this.updatePosition(actionObject);
        if (resize) this.resize(renderer);
    }
    updateRotation(mousePosition) { //updates first person perspective
        let camBuffer;

/*         camBuffer = this.camera.rotation.y;
        this.camera.rotation.y -= (mousePosition.changeX / window.innerWidth) * 2*Math.PI;
        if (isNaN(this.camera.rotation.y)) this.camera.rotation.y = camBuffer;
        if (mousePosition.changeX === this.xBuffer) mousePosition.changeX = 0;
        this.xBuffer = mousePosition.changeX; */

        if (!isNaN(mousePosition.changeX)) {
            this.camera.rotation.y -= (mousePosition.changeX / window.innerWidth) * 2*Math.PI;
        }
        if (mousePosition.changeX === this.xBuffer) mousePosition.changeX = 0;
        this.xBuffer = mousePosition.changeX;
    
/*         camBuffer = this.camera.rotation.x;
        this.camera.rotation.x -= (mousePosition.changeY / window.innerHeight) * 2*Math.PI;
        if (isNaN(this.camera.rotation.x)) this.camera.rotation.x = camBuffer;
        if (mousePosition.changeY === this.yBuffer) mousePosition.changeY = 0;
        this.yBuffer = mousePosition.changeY;
        if (this.camera.rotation.x >= Math.PI / 2) this.camera.rotation.x = Math.PI / 2;
        if (this.camera.rotation.x <= -Math.PI / 2) this.camera.rotation.x = -Math.PI / 2; */

        if (!isNaN(mousePosition.changeY)) {
            this.camera.rotation.x -= (mousePosition.changeY / window.innerHeight) * 2*Math.PI;
        }
        if (mousePosition.changeY === this.yBuffer) mousePosition.changeY = 0;
        this.yBuffer = mousePosition.changeY;
        if (this.camera.rotation.x >= Math.PI / 2) this.camera.rotation.x = Math.PI / 2;
        if (this.camera.rotation.x <= -Math.PI / 2) this.camera.rotation.x = -Math.PI / 2;

    }
    updatePosition(actionObject) {
        let bufferCos = Math.cos(this.camera.rotation.y) * this.SPEED;
        let bufferSin = Math.sin(this.camera.rotation.y) * this.SPEED;
        if (actionObject.forward) {
            this.camera.position.z -= bufferCos;
            this.camera.position.x -= bufferSin;
        }
        if (actionObject.back) {
            this.camera.position.x += bufferSin;
            this.camera.position.z += bufferCos;
        }
        if (actionObject.left) {
            this.camera.position.x -= bufferCos;
            this.camera.position.z += bufferSin;
        }
        if (actionObject.right) {
            this.camera.position.x += bufferCos;
            this.camera.position.z -= bufferSin;
        }
    }
    resize(renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)

    }
}