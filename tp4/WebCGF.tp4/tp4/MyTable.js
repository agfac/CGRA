/**
 * MyTable
 * @constructor
 */
 function MyTable(scene, minS, maxS, minT, maxT) {
 	CGFobject.call(this, scene);
    
	this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
    
 	this.myUnitCubeQuad = new MyUnitCubeQuad(this.scene, this.minS, this.maxS, this.minT, this.maxT);
 	this.myUnitCubeQuad.initBuffers();

	// Materials
	this.materialDefault = new CGFappearance(this.scene);
	this.materialTampo = new CGFappearance(this.scene);
	this.materialPerna = new CGFappearance(this.scene);

	this.tableAppearance = new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.tableAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.tableAppearance.setShininess(20);
	this.tableAppearance.loadTexture("../resources/images/table.png");

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
 	//this.materialTampo.apply();
 	this.tableAppearance.apply();
 	this.myUnitCubeQuad.display();
 	this.scene.popMatrix();


 }
