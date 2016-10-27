/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
	this.vertices = [
            -0.5, -0.5, 0.5,
            0.5, -0.5, 0.5,
            -0.5, 0.5, 0.5,
            0.5, 0.5, 0.5,
            -0.5, -0.5, -0.5,
            0.5, -0.5, -0.5,
            -0.5, 0.5, -0.5,
            0.5, 0.5, -0.5
			];

	this.indices = [
            0, 1, 2,      //frente
			1, 3, 2,     //frente
			1, 5, 7,      //direita
			1, 7, 3,     //direita
			3, 7, 6,     //cima
			3, 6, 2,     //cima
			0, 4, 1,     //baixo
			1, 4, 5,     //baixo
			4, 7, 5,     //tras
			4, 6, 7,     //tras
			4, 2, 6,     //esquerda
			4, 0, 2      //esquerda
        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
