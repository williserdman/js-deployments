export default class CameraController {
    constructor(camera) {
        this.camera = camera;
        this.xBuffer;
        this.yBuffer;

        this.speed;
        this.WALK = 1.5;
        this.SPRINT = 3;

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
        //determining if we should be sprinting right now
        this.speed = (actionObject.shift) ? this.SPRINT : this.WALK;
    
        //math so it only has to be done once per frame
        let bufferCos = Math.cos(this.camera.rotation.y) * this.speed;
        let bufferSin = Math.sin(this.camera.rotation.y) * this.speed;

        //horizontal movement (x and z)
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

        //up and down (y).... going to repace with jumping, this just lets me fly
        if (actionObject.control) this.camera.position.y -= this.speed / 2;
        if (actionObject.spaceBar) this.camera.position.y += this.speed / 2;
    }
    resize(renderer) {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)

    }
}