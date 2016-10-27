/**
 * MyTable
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyTable(scene) {
	CGFobject.call(this,scene);

	this.tampo = new MyUnitCubeQuad(this.scene);
	this.perna = new MyUnitCubeQuad(this.scene);
};

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;

MyTable.prototype.display = function () {
	this.scene.pushMatrix();
	this.scene.translate(0, 3.5, 0);
	this.scene.scale(5, 0.3, 3);
	this.tampo.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.25, 1.75, -1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.perna.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.25, 1.75, -1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.perna.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(-2.25, 1.75, 1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.perna.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(2.25, 1.75, 1.25);
	this.scene.scale(0.3, 3.5, 0.3);
	this.perna.display();
	this.scene.popMatrix();
};
