/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

	
	var ang = (2*Math.PI)/this.slices;
	

	for(var i=0;i<this.stacks;i++){
		for(var j=0; j<this.slices; j++){
				this.vertices.push(Math.cos(j*ang), Math.sin(j*ang), i);
				this.vertices.push(Math.cos(j*ang), Math.sin(j*ang), i+1);
				this.vertices.push(Math.cos((j+1)*ang), Math.sin((j+1)*ang), i);
				this.vertices.push(Math.cos((j+1)*ang), Math.sin((j+1)*ang), i+1);

		}
	}
	
	for(i=0; i<4*this.slices*this.stacks; i+=4){
			this.indices.push((i+1), (i), (i+2));
			this.indices.push((i+1), (i+2), (i+3));
		}

	for(var j=0;j<this.stacks;j++){
		for(i=0; i<this.slices; i++){
			this.normals.push(Math.cos(Math.PI/this.slices + i*ang), Math.sin(Math.PI/this.slices + i*ang), 0);
			this.normals.push(Math.cos(Math.PI/this.slices + i*ang), Math.sin(Math.PI/this.slices + i*ang), 0);
			this.normals.push(Math.cos(Math.PI/this.slices + i*ang), Math.sin(Math.PI/this.slices + i*ang), 0);
			this.normals.push(Math.cos(Math.PI/this.slices + i*ang), Math.sin(Math.PI/this.slices + i*ang), 0);
		}
	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
