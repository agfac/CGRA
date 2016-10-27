/**
 * MyTable
 * @constructor
 */
 function MyTable(scene) {
 	CGFobject.call(this, scene);
    
 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene);
 	this.myUnitCubeQuad.initBuffers();

	// Materials
	this.materialDefault = new CGFappearance(this.scene);
	this.materialTampo = new CGFappearance(this.scene);
	this.materialPerna = new CGFappearance(this.scene);

 };

 MyTable.prototype = Object.create(CGFobject.prototype);
 MyTable.prototype.constructor = MyTable;

 MyTable.prototype.display = function() {
 	
 	this.materialTampo.setAmbient(0.3,0.2,0.1,1.0);
	this.materialTampo.setDiffuse(0.3,0.2,0.1,1.0);
	this.materialTampo.setSpecular(0.1,0.1,0.1,1.0);
	
	this.materialPerna.setAmbient(0.67,0.67,0.67,1.0);
	this.materialPerna.setDiffuse(0.67,0.67,0.67,1.0);
	this.materialPerna.setSpecular(1.0,1.0,1.0,1.0);	

 	// legs
 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialPerna.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialPerna.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, 1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialPerna.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	this.scene.pushMatrix();
 	this.scene.translate(-2, 3.5 / 2, -1);
 	this.scene.scale(0.3, 3.5, 0.3);
 	this.materialPerna.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();

 	// table top
 	this.scene.pushMatrix();
 	this.scene.translate(0, 3.5, 0);
 	this.scene.scale(5, 0.3, 3);
 	this.materialTampo.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();


 }
