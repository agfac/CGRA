/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	this.ang = 360 * degToRad / (this.slices);
    this.height = 1.0 / (this.stacks);

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	
 	this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    for (var stack = 0; stack <= this.stacks; stack++) {

        for (var slice = 0; slice < this.slices; slice++) {
            
            // VERTICES

            this.vertices.push(Math.cos(slice * this.ang),Math.sin(slice * this.ang),stack * this.height);

            // NORMALS

            this.normals.push(Math.cos(slice * this.ang), Math.sin(slice * this.ang),0);

            // TEXTURES

            if (slice <= this.slices / 2)
                this.texCoords.push(slice / (this.slices), stack / this.stacks);
            else
                this.texCoords.push((this.slices - slice) / (this.slices), stack / this.stacks);
        }
    }

    for (var stack = 1; stack <= this.stacks; stack++) {

        var cur_stack_offset = stack * this.slices;
        var prev_stack_offset = cur_stack_offset - this.slices;

        // SPECIAL CASE
        this.indices.push(cur_stack_offset + this.slices - 1, prev_stack_offset + this.slices - 1, prev_stack_offset + 0);

        this.indices.push(cur_stack_offset + this.slices - 1, prev_stack_offset + 0, cur_stack_offset + 0);

        this.indices.push(cur_stack_offset + this.slices - 1, prev_stack_offset + 0, prev_stack_offset + this.slices - 1);

        this.indices.push(cur_stack_offset + this.slices - 1, cur_stack_offset + 0, prev_stack_offset + 0);

        // INDICES
        
        for (var slice = 1; slice < this.slices; slice++) {

            this.indices.push(cur_stack_offset + slice - 1, prev_stack_offset + slice - 1, prev_stack_offset + slice - 0);

            this.indices.push(cur_stack_offset + slice - 1, prev_stack_offset + slice - 0, cur_stack_offset + slice - 0);

            this.indices.push(cur_stack_offset + slice - 1, prev_stack_offset + slice - 0, prev_stack_offset + slice - 1);

            this.indices.push(cur_stack_offset + slice - 1, cur_stack_offset + slice - 0, prev_stack_offset + slice - 0);
        }
    }
 
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
