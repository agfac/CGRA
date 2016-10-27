/**
 * MyPaperPlane
 * @constructor
 */
 function MyPaperPlane(scene, x, y, z) {
 	CGFobject.call(this,scene);

	this.x = x;
	this.y = y;
	this.z = z;

	this.velX = 2;
	this.velY = 0.5;
	this.angulo = - Math.PI/15;

	this.movementState = 0;
	
 	this.initBuffers();

 };

 MyPaperPlane.prototype = Object.create(CGFobject.prototype);
 MyPaperPlane.prototype.constructor = MyPaperPlane;

 MyPaperPlane.prototype.initBuffers = function() {
 	
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

	//LEFT Triangule

	this.vertices.push(0, 0, 0);
	this.vertices.push(0, 0, 1);
	this.vertices.push(-1, 0, 0);

	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);
	this.normals.push(0, -1, 0);

	this.indices.push(0, 2, 1);
	this.indices.push(1, 2, 0);

	//RIGHT Triangule
	
	this.vertices.push(0, 0, -1);

	this.normals.push(0, 1, 0);

	this.indices.push(0, 3, 2);
	this.indices.push(2, 3, 0);

	//BOTTOM Triangule
	
	this.vertices.push(0, -0.4, 0);
	this.vertices.push(0, -0.4, 0);

	this.normals.push(0, 0, 1);
	this.normals.push(0, 0, -1);

	this.indices.push(0, 2, 4);
	this.indices.push(4, 2, 0);


	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

 MyPaperPlane.prototype.display = function () {
    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angulo,0,0,1);
		this.drawElements(this.primitiveType);
	this.scene.popMatrix();
 };

 MyPaperPlane.prototype.update = function(currTime) {
	
	this.lastime = this.lastime || currTime;
 	this.deltatime = currTime - this.lastime;
	this.lastime = currTime;


	if(this.movementState >=0){
		this.x -= (this.deltatime/1000) * this.velX;
        this.y += (this.deltatime/1000) * this.velY; 
     }

    if(this.movementState == 0){  
       if(this.x <= 1){
        this.movementState = 1;
        this.velX = 0;
        this.velY = -2.0;
        this.angulo = Math.PI/2;
       }
    }

    if(this.movementState == 1){  
       if(this.y <= 0.5){
        this.movementState = -1;
        this.velX = 0;
        this.velY = 0;
        this.angulo = Math.PI;
       }
    }
};