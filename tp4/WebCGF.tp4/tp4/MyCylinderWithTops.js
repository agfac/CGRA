/**
 * MyCylinderWithTops
 * @constructor
 */
 function MyCylinderWithTops(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.topo = new MyCircle(scene, slices);
	this.corpo = new MyCylinder(scene, slices, stacks);

	this.clockAppearance = new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0.9, 0.9, 0.9, 1);
	this.clockAppearance.setDiffuse(0.9, 0.9, 0.9, 1);
	this.clockAppearance.setSpecular(0.1, 0.1, 0.1, 1);	
	this.clockAppearance.setShininess(100);
	this.clockAppearance.loadTexture('../resources/images/clock.png');

 };

 MyCylinderWithTops.prototype = Object.create(CGFobject.prototype);
 MyCylinderWithTops.prototype.constructor = MyCylinderWithTops;

 MyCylinderWithTops.prototype.display = function() {

	//BODY

 	this.scene.pushMatrix();
		this.corpo.display();
 	this.scene.popMatrix();
 	
 	//TOP
 	
 	this.scene.pushMatrix();
		this.scene.translate(0,0,this.stacks);
		this.clockAppearance.apply();
		this.topo.display();
 	this.scene.popMatrix();
	
 };
