/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);

	this.clock = new MyCylinderWithTops(scene, slices, stacks);
	
	this.hours = new MyClockHand(scene);
	this.minutes = new MyClockHand(scene);
	this.seconds = new MyClockHand(scene);

	this.hours.setAngle(90);
	this.minutes.setAngle(180);
	this.seconds.setAngle(270);

	this.materialHand = new CGFappearance(this.scene);
	this.materialHand.setAmbient(0, 0, 0, 1);
	this.materialHand.setDiffuse(0, 0, 0, 1);
	this.materialHand.setSpecular(0, 0, 0, 1);	
	this.materialHand.setShininess(10);
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {

	var degToRad = Math.PI / 180.0;

 	this.scene.pushMatrix();
		this.clock.display();
 	this.scene.popMatrix();

	// HOURS

	this.scene.pushMatrix();
	    this.scene.rotate(-this.hours.angle*degToRad,0,0,1);
		this.scene.translate(0,0,1.05);
		this.scene.scale(3,0.4,1);
		this.materialHand.apply();
		this.hours.display();
	this.scene.popMatrix();

	//MINUTES

	this.scene.pushMatrix();
		this.scene.rotate(-this.minutes.angle*degToRad,0,0,1);
		this.scene.translate(0,0,1.05);
		this.scene.scale(1.5,0.8,1);
		this.minutes.display();
	this.scene.popMatrix();

	//SECONDS

	this.scene.pushMatrix();
	    this.scene.rotate(-this.seconds.angle*degToRad,0,0,1);
		this.scene.translate(0,0,1.05);
		this.scene.scale(0.75,1.0,1);
		this.seconds.display();
	this.scene.popMatrix();
 };

 MyClock.prototype.update = function(currTime) {

 	this.lastime = this.lastime || currTime;
 	this.deltatime = currTime - this.lastime;
	this.lastime = currTime;

	this.seconds.setAngle(this.seconds.angle + 360/60 * this.deltatime/1000);
	this.minutes.setAngle(this.minutes.angle + 360/(60*60) * this.deltatime/1000);
	this.hours.setAngle(this.hours.angle + 360/(60*60*60) * this.deltatime/1000);

 };