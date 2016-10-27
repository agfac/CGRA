/**
 * MyDroneArm
 * @constructor
 */
 function MyDroneArm(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

	this.topo = new MyCircle(scene, slices);
	this.corpo = new MyCylinder(scene, slices, stacks);
	this.base = new MyBackCircle(scene, slices);

 };

 MyDroneArm.prototype = Object.create(CGFobject.prototype);
 MyDroneArm.prototype.constructor = MyDroneArm;

 MyDroneArm.prototype.display = function() {

	//BODY

 	this.scene.pushMatrix();
		this.corpo.display();
 	this.scene.popMatrix();

	//TOP

 	this.scene.pushMatrix();
		this.scene.translate(0,0,1);
		this.topo.display();
 	this.scene.popMatrix();

	//BOTTOM
	
 	this.scene.pushMatrix();
 		this.base.display();
 	this.scene.popMatrix();
	
 };
