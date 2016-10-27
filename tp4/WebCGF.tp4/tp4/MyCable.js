/**
 * MyCable
 * @constructor
 */
 function MyCable(scene, slices, stacks, nrDivs, length) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;
	
	this.body = new MyDroneArm(scene, slices, stacks);
	this.hook = new MyCurve(scene, nrDivs);

	//BODY PROPERTIES

	this.bodyLength = length;
	this.deltaBodyLength = 0.1;

	//HOOK PROPERTIES
	
	this.hookHeight = 0.2;

 	this.initBuffers();
 };

 MyCable.prototype = Object.create(CGFobject.prototype);
 MyCable.prototype.constructor = MyCable;

 MyCable.prototype.display = function() {

	//CABLE BODY

 	this.scene.pushMatrix();
 		this.scene.rotate(Math.PI,0,1,0);
 		this.scene.rotate(Math.PI/2,1,0,0);
 		this.scene.rotate(Math.PI/2,0,0,1);
 		this.scene.scale(0.1,0.1,this.bodyLength);
		this.body.display();
 	this.scene.popMatrix();
 	
 	//CABLE HOOK

 	this.scene.pushMatrix();
		this.scene.translate(0,-(this.bodyLength+this.hookHeight),-this.hookHeight);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.scale(this.hookHeight,this.hookHeight,0.07);

		if(this.scene.boxCaughtUp)
 	    	this.scene.frontTexture.apply();
 	    
		this.hook.display();
 	this.scene.popMatrix();
	
 };
