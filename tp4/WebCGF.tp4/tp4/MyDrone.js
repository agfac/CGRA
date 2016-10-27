/**
 * MyDrone
 * @constructor
 */
 function MyDrone(scene, x, y, z, angle) {
 	CGFobject.call(this,scene);
 
 	//DRONE INITIAL POSITION
 	
    this.x = x;
	this.y = y;
	this.z = z;
	this.angle = angle;
	this.deltaRotationAngle = 5;

	//HELIS ANGLE

	this.heliFrontAngle=angle;
	this.heliLeftAngle=angle;
	this.heliRearAngle=angle;
	this.heliRightAngle=angle;

	//INCLINATION ANGLE

	this.inclinationAngle = 0;
	this.deltaInclinationAngle = 2;
	this.deltaInclinationAngleReverse = 1;
	this.inclinationAngleLimit = 8;
	
	//STATE MACHINE

	this.movementState='STATIC';

	// DRONE ELEMENTS

	this.center = new MyLamp(scene, 50, 8);
	this.arm = new MyDroneArm(scene, 20, 10);
	this.support = new MyDroneArm(scene, 20, 10);
	this.heli = new MyDroneArm(scene, 10, 10);
	this.leg = new MyCurve(scene, 20);
	this.legBase = new MyUnitCubeQuad(scene, 0, 1, 0, 1);
	this.cable = new MyCable(scene, 3, 20, 200, 0);
	
	//CENTER PROPERTIES

	this.centerScale = 0.7;
	
	//ARM PROPERTIES

	this.armWidth = 0.1;
	this.armHeight = 4;
	
	//HELI PROPERTIES

	this.heliWidth = 0.04;
	this.heliHeight = 1;

	//LEG PROPERTIES

	this.legWidth = 0.2;

	//LEG BASE PROPERTIES
	
	this.legBaseWidth = 0.1;
	this.legBaseHeight = 0.05;
	this.legBaseLength = 4;

 	this.initBuffers();
 };

 MyDrone.prototype = Object.create(CGFobject.prototype);
 MyDrone.prototype.constructor = MyDrone;

 MyDrone.prototype.display = function() {
    
    //CENTER

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.scale(this.centerScale,this.centerScale,this.centerScale);
		this.scene.applyTextures();
		this.center.display();
	this.scene.popMatrix();

	//ARM 1

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+0.1,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,0,-this.armHeight/2)
		this.scene.scale(this.armWidth,this.armWidth,this.armHeight);
		this.arm.display();
	this.scene.popMatrix();

	//ARM 2

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y+0.1,this.z);
		this.scene.rotate(-Math.PI/2,0,1,0);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,0,0,1);
		this.scene.translate(0,0,-this.armHeight/2);
		this.scene.scale(this.armWidth,this.armWidth,this.armHeight);
		this.arm.display();
	this.scene.popMatrix();

	//SUPPORT 1

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(this.armHeight/2,this.armWidth*2,0);		
		this.scene.rotate(Math.PI/2,1,0,0);	
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth*2);	
		this.support.display();
	this.scene.popMatrix();

	//SUPPORT 2

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(-this.armHeight/2,this.armWidth*2,0);		
		this.scene.rotate(Math.PI/2,1,0,0);	
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth*2);	
		this.support.display();
	this.scene.popMatrix();

	//SUPPORT 3

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,this.armWidth*2,this.armHeight/2);		
		this.scene.rotate(Math.PI/2,1,0,0);	
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth*2);
		this.scene.applyFrontTextures();	
		this.support.display();

	this.scene.popMatrix();

	//SUPPORT 4

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,this.armWidth*2,-this.armHeight/2);		
		this.scene.rotate(Math.PI/2,1,0,0);	
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth*2);
		this.scene.applyTextures();
		this.support.display();
	this.scene.popMatrix();

	// HELI 1 CENTER

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(this.armHeight/2,this.armWidth*2,0);
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth);
		this.center.display();
	this.scene.popMatrix();

	// HELI 2 CENTER

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(-this.armHeight/2,this.armWidth*2,0);
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth);
		this.center.display();
	this.scene.popMatrix();

	// HELI 3 CENTER

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,this.armWidth*2,this.armHeight/2);
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth);
		this.scene.applyFrontTextures();
		this.center.display();
	this.scene.popMatrix();

	// HELI 4 CENTER

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,this.armWidth*2,-this.armHeight/2);
		this.scene.scale(this.armWidth,this.armWidth,this.armWidth);
		this.scene.applyTextures();
		this.center.display();
	this.scene.popMatrix();

	// HELI 1 - FRONT

    this.scene.pushMatrix();
    	this.scene.translate(this.x,this.y,this.z);
    	this.scene.rotate(this.angle,0,1,0);
    	this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,this.armWidth+this.armWidth*2,this.armHeight/2);
		this.scene.rotate(this.heliFrontAngle,0,1,0);
		this.scene.scale(this.heliWidth,0.001,this.heliHeight);
		this.scene.translate(0,0,-0.5);
		this.scene.applyFrontTextures();
		this.heli.display();
	this.scene.popMatrix();

	// HELI 2 - LEFT

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
    	this.scene.rotate(this.angle,0,1,0);
    	this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(this.armHeight/2,this.armWidth+this.armWidth*2,0);
		this.scene.rotate(-this.heliLeftAngle,0,1,0);
		this.scene.scale(this.heliWidth,0.001,this.heliHeight);
		this.scene.translate(0,0,-0.5);
		this.scene.applyTextures();
		this.heli.display();
	this.scene.popMatrix();

	// HELI 3 - REAR

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
    	this.scene.rotate(this.angle,0,1,0);
    	this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(0,this.armWidth+this.armWidth*2,-this.armHeight/2);
		this.scene.rotate(this.heliRearAngle,0,1,0);
		this.scene.scale(this.heliWidth,0.001,this.heliHeight);
		this.scene.translate(0,0,-0.5);
		this.heli.display();
	this.scene.popMatrix();

	// HELI 4 - RIGHT

    this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
    	this.scene.rotate(this.angle,0,1,0);
    	this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(-this.armHeight/2,this.armWidth+this.armWidth*2,0);
		this.scene.rotate(-this.heliRightAngle,0,1,0);
		this.scene.scale(this.heliWidth,0.001,this.heliHeight);
		this.scene.translate(0,0,-0.5);
		this.heli.display();
	this.scene.popMatrix();

	// LEG 1

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(1,-1,this.centerScale/2+0.05);
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(1,1,this.legWidth);
		this.leg.display();
	this.scene.popMatrix();

	// LEG 2

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(1,-1,-(this.centerScale/2+0.05));
		this.scene.rotate(Math.PI/2,0,0,1);
		this.scene.scale(1,1,this.legWidth);
		this.leg.display();
	this.scene.popMatrix();

	// LEG 3

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(-1,-1,this.centerScale/2+0.05);
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(1,1,this.legWidth);
		this.leg.display();
	this.scene.popMatrix();

	// LEG 4

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(-1,-1,-(this.centerScale/2+0.05));
		this.scene.rotate(-Math.PI/2,0,0,1);
		this.scene.rotate(Math.PI,0,1,0);
		this.scene.scale(1,1,this.legWidth);
		this.leg.display();
	this.scene.popMatrix();

	// LEG BASE 1

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(-1,-1,0);
		this.scene.scale(this.legBaseWidth,this.legBaseHeight,this.legBaseLength);
		this.legBase.display();
	this.scene.popMatrix();

	// LEG BASE 2

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.scene.rotate(this.inclinationAngle,1,0,0);
		this.scene.translate(1,-1,0);
		this.scene.scale(this.legBaseWidth,this.legBaseHeight,this.legBaseLength);
		this.legBase.display();
	this.scene.popMatrix();
	
	//CABLE

	this.scene.pushMatrix();
		this.scene.translate(this.x,this.y,this.z);
		this.scene.rotate(this.angle,0,1,0);
		this.cable.display();
	this.scene.popMatrix();


 };

 MyDrone.prototype.setAngle = function(angle) {
    this.angle += angle;
 };

 MyDrone.prototype.setHeliFrontAngle = function(angle) {
    this.heliFrontAngle += angle;
 };

 MyDrone.prototype.setHeliLeftAngle = function(angle) {
    this.heliLeftAngle += angle;
 };

 MyDrone.prototype.setHeliRearAngle = function(angle) {
    this.heliRearAngle += angle;
 };

 MyDrone.prototype.setHeliRightAngle = function(angle) {
    this.heliRightAngle += angle;
 };

 MyDrone.prototype.setInclinationAngle = function(angle) {
    this.inclinationAngle += angle;
 };

 MyDrone.prototype.goForward = function(speed) {
 	this.x += speed * Math.sin(this.angle);
 	this.z += speed * Math.cos(this.angle);
 };

 MyDrone.prototype.goBackward = function(speed) {
 	this.x -= speed * Math.sin(this.angle);
 	this.z -= speed * Math.cos(this.angle);
 };

 MyDrone.prototype.goUp = function(speed) {
 	this.y += 0.5*speed;
 };

 MyDrone.prototype.goDown = function(speed) {
 	this.y -= 0.5*speed;
 };

 MyDrone.prototype.update = function(currTime) {
	
	this.lastime = this.lastime || currTime;
 	this.deltatime = currTime - this.lastime;
	this.lastime = currTime;

	// HELIS VELOCITY

	this.lowAngle = (this.scene.propellerSpeedRotation) * (2 * Math.PI * 0.2 * this.deltatime/1000);
	this.normalAngle = (this.scene.propellerSpeedRotation) * (2 * Math.PI * this.deltatime/1000);
	this.highAngle = (this.scene.propellerSpeedRotation) * (2 * Math.PI * 10 * this.deltatime/1000);

    if(this.movementState == 'STATIC'){  
		
		//SET HELIS ANGLE

       	this.setHeliFrontAngle(this.normalAngle);
       	this.setHeliLeftAngle(this.normalAngle);
       	this.setHeliRearAngle(this.normalAngle);
       	this.setHeliRightAngle(this.normalAngle);
		
		//INCLINATION REVERSE

       	if(this.inclinationAngle > 1* degToRad)
       		this.setInclinationAngle((-this.deltaInclinationAngleReverse * degToRad));
    
       	else if(this.inclinationAngle < -1* degToRad)
       		this.setInclinationAngle((this.deltaInclinationAngleReverse * degToRad));
       	
       	else
			this.inclinationAngle = 0;
    }
    
    if(this.movementState == 'YAW_LEFT'){  
		
		//SET HELIS ANGLE

    	this.setHeliFrontAngle(this.lowAngle);
       	this.setHeliLeftAngle(this.highAngle);
       	this.setHeliRearAngle(this.lowAngle);
       	this.setHeliRightAngle(this.highAngle);

    }

    if(this.movementState == 'YAW_RIGHT'){  
		
		//SET HELIS ANGLE

    	this.setHeliFrontAngle(-this.lowAngle);
       	this.setHeliLeftAngle(-this.highAngle);
       	this.setHeliRearAngle(-this.lowAngle);
       	this.setHeliRightAngle(-this.highAngle);

    }

    if(this.movementState == 'PITCH_FRONT'){ 

		//SET HELIS ANGLE

		this.setHeliFrontAngle(this.lowAngle);
    	this.setHeliRearAngle(this.highAngle);
       	this.setHeliLeftAngle(this.normalAngle);
       	this.setHeliRightAngle(this.normalAngle);
    }

    if(this.movementState == 'PITCH_BACK'){ 
		
		//SET HELIS ANGLE

		this.setHeliFrontAngle(this.highAngle);
    	this.setHeliRearAngle(this.lowAngle);
       	this.setHeliLeftAngle(this.normalAngle);
       	this.setHeliRightAngle(this.normalAngle);
    }

    if(this.movementState == 'GOING_UP'){ 

		//SET HELIS ANGLE

		this.setHeliFrontAngle(this.highAngle);
    	this.setHeliRearAngle(this.highAngle);
       	this.setHeliLeftAngle(this.highAngle);
       	this.setHeliRightAngle(this.highAngle);
    }

    if(this.movementState == 'GOING_DOWN'){ 
		
		//SET HELIS ANGLE

		this.setHeliFrontAngle(this.lowAngle);
    	this.setHeliRearAngle(this.lowAngle);
       	this.setHeliLeftAngle(this.lowAngle);
       	this.setHeliRightAngle(this.lowAngle);
    }
    
 };
