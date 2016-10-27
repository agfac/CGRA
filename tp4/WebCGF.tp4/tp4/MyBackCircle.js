/**
 * MyBackCircle
 * @constructor
 */
 function MyBackCircle(scene, slices) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;

 	this.initBuffers();
 };

 MyBackCircle.prototype = Object.create(CGFobject.prototype);
 MyBackCircle.prototype.constructor = MyBackCircle;

 MyBackCircle.prototype.initBuffers = function() {
 	
 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];
	
	var ang = 0;

	var deltaAng = (2*Math.PI)/this.slices;

	this.vertices.push(0, 0, 0);
	this.normals.push(0, 0, -1);
	this.texCoords.push(0.5, 0.5);


	for(var i=0; i<this.slices; i++){

		this.vertices.push(Math.cos(ang), Math.sin(ang), 0);
		this.texCoords.push((Math.cos(ang)/2) + 0.5, (- Math.sin(ang)/2) + 0.5);
		ang+=deltaAng;

		this.vertices.push(Math.cos(ang), Math.sin(ang), 0);
		this.texCoords.push((Math.cos(ang)/2) + 0.5, (- Math.sin(ang)/2) + 0.5);
		ang+=deltaAng;

		this.indices.push(0, (i+2), (i+1));

		this.normals.push(0, 0, -1);
		this.normals.push(0, 0, -1);

	}
	

	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
