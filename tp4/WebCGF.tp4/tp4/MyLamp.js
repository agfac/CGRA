/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;
	
 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;

 MyLamp.prototype.initBuffers = function() {

	var degToRad = Math.PI / 180.0;

	var ang_0 = 360 * degToRad / this.slices;
	var ang_1 = 90 * degToRad / this.stacks;

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];
 	this.texCoords = [
 	];

	var ang_1_now = 0;
	var ang_1_then = ang_1;
	var ind_j = 0;
	var aux_j = 4 * this.slices;
	
	for (j = 0; j < this.stacks; j++) {
		
		var ang_0_now = 0;
		var ind_i = 0;

		for (i = 0; i < this.slices; i++) {

			var x0 = Math.sin(ang_1_now) * Math.cos(ang_0_now);
			var y0 = Math.cos(ang_1_now);
			var z0 = Math.sin(ang_1_now) * Math.sin(ang_0_now);

			var x2 = Math.sin(ang_1_then) * Math.cos(ang_0_now);
			var y2 = Math.cos(ang_1_then);
			var z2 = Math.sin(ang_1_then) * Math.sin(ang_0_now);

			ang_0_now += ang_0;

			var x1 = Math.sin(ang_1_now) * Math.cos(ang_0_now);
			var y1 = Math.cos(ang_1_now);
			var z1 = Math.sin(ang_1_now) * Math.sin(ang_0_now);

			var x3 = Math.sin(ang_1_then) * Math.cos(ang_0_now);
			var y3 = Math.cos(ang_1_then);
			var z3 = Math.sin(ang_1_then) * Math.sin(ang_0_now);

			this.vertices.push(x0, y0, z0); // vertice 0

			this.vertices.push(x1, y1, z1); // vertice 1

			this.vertices.push(x2, y2, z2); // vertice 2

			this.vertices.push(x3, y3, z3); // vertice 3

 			var ind_i_j = ind_i + ind_j;

			this.indices.push(ind_i_j, ind_i_j + 1, ind_i_j + 2);

			this.indices.push(ind_i_j + 3, ind_i_j + 2, ind_i_j + 1);

			ind_i += 4;

			// normal a vertice 0
			this.normals.push(x0, y0, z0);
			
			// normal a vertice 1
            this.normals.push(x1, y1, z1);

			// normal a vertice 2
			this.normals.push(x2, y2, z2);
			
			// normal a vertice 3
            this.normals.push(x3, y3, z3);

			// coordenadas textura
			this.texCoords.push(1 - i / this.slices, j / this.stacks);
			this.texCoords.push(1 - (i + 1) / this.slices, j / this.stacks);
			this.texCoords.push(1 - i / this.slices, (j + 1) / this.stacks);
			this.texCoords.push(1 - (i + 1) / this.slices, (j + 1) / this.stacks);

		}			

		ang_1_now += ang_1;
		ang_1_then += ang_1;
		ind_j += aux_j;

	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };