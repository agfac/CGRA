/**
 * MyBox
 * @constructor
 */
 function MyBox(scene) {
 	CGFobject.call(this, scene);
    
    this.box = new MyUnitCubeQuad(scene,0, 1, 0, 1);
    this.cylinder = new MyCylinder(scene,20,10);

    //TOP PROPERTIES
    
    this.cylinderRadius = 0.1;
    this.cylinderWidth = 0.1;

    this.angle = -Math.PI/2;

 };

 MyBox.prototype = Object.create(CGFobject.prototype);
 MyBox.prototype.constructor = MyBox;

 MyBox.prototype.display = function() {
 	
 	//BODY BOX

 	this.scene.pushMatrix();
 	  this.scene.rotate(this.angle,0,1,0);
 	  this.box.display();
 	this.scene.popMatrix();

    //BOX TOP (CYLINDER)

 	this.scene.pushMatrix();
 	  this.scene.translate(0,0.5+this.cylinderRadius,0);
 	  this.scene.rotate(this.angle,0,1,0);
 	  this.scene.scale(this.cylinderRadius,this.cylinderRadius,this.cylinderWidth);
 	  this.scene.translate(0,0,-0.5);
 	  
 	  if(this.scene.boxCaughtUp)
 	    this.scene.frontTexture.apply();
 	      
 	  this.cylinder.display();
 	this.scene.popMatrix();

 };
