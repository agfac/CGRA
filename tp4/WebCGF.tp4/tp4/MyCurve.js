/**
 * MyCurve
 * @constructor
 */
 function MyCurve(scene, nrdivs) {
 	CGFobject.call(this,scene);
	
	this.nrdivs = nrdivs;
	this.delta = 1/this.nrdivs;

 	this.initBuffers();
 };

 MyCurve.prototype = Object.create(CGFobject.prototype);
 MyCurve.prototype.constructor = MyCurve;

 MyCurve.prototype.initBuffers = function() {
 	
 	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];
 	this.texCoords = [
 	];

	//HALFWIDTH
	
	var halfwidth = 0.5;

	this.vertices.push(0,0,-halfwidth);
	this.vertices.push(0,0,halfwidth);

	this.normals.push(1,0,0);
	this.normals.push(1,0,0);

	this.texCoords.push(0,0);
	this.texCoords.push(0,1);

	for(var i = 1; i < this.nrdivs+1; i++){

		var x = this.delta*i;
		var y = Math.pow(x,4);

		this.vertices.push(x,y,-halfwidth);
		
		halfwidth=-halfwidth;

		this.normals.push(x,y,0);

		this.texCoords.push(x,y);
	}

	for(var i = 0; i < this.nrdivs; i=i+2){

		this.indices.push(i,i+1,i+3);
		this.indices.push(i,i+3,i+2);

		this.indices.push(i,i+3,i+1);
		this.indices.push(i,i+2,i+3);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
