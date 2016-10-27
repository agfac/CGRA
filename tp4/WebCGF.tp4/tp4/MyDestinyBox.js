/**
 * MyDestinyBox
 * @constructor
 */
 function MyDestinyBox(scene) {
 	CGFobject.call(this, scene);
    
    this.wall = new MyUnitCubeQuad(scene,0, 1, 0, 1);
    this.floor = new MyUnitCubeQuad(scene,0, 1, 0, 1);
  
    //FLOOR WIDTH

    this.floorWidth = 0.1;

    //WALL WIDTH
    
    this.wallWidth = 0.1;

    //DESTINY BOX PROPERTIES

    this.width = 2;
    this.length = 2;
    this.height = 1;

 };

 MyDestinyBox.prototype = Object.create(CGFobject.prototype);
 MyDestinyBox.prototype.constructor = MyDestinyBox;

 MyDestinyBox.prototype.display = function() {
 	
 	//FRONT WALL

 	this.scene.pushMatrix();
 	  this.scene.scale(this.wallWidth,this.height,this.width);
 	  this.wall.display();
 	this.scene.popMatrix();

    //BACK WALL

 	this.scene.pushMatrix();
 	  this.scene.translate(this.length,0,0);
 	  this.scene.scale(this.wallWidth,this.height,this.width);
 	  this.wall.display();
 	this.scene.popMatrix();

    //LEFT WALL

 	this.scene.pushMatrix();
 	  this.scene.translate(this.length/2,0,this.width/2);
 	  this.scene.rotate(Math.PI/2,0,1,0);
 	  this.scene.scale(this.wallWidth,this.height,this.length)
 	  this.wall.display();
 	this.scene.popMatrix();

    //RIGHT WALL

 	this.scene.pushMatrix();
 	  this.scene.translate(this.length/2,0,-this.width/2);
 	  this.scene.rotate(Math.PI/2,0,1,0);
 	  this.scene.scale(this.wallWidth,this.height,this.length)
 	  this.wall.display();
 	this.scene.popMatrix();

    //FLOOR

 	this.scene.pushMatrix();
 	  this.scene.translate(this.length/2,-0.5,0);
 	  this.scene.scale(this.length,this.floorWidth,this.width)
 	  this.floor.display();
 	this.scene.popMatrix();

 };
