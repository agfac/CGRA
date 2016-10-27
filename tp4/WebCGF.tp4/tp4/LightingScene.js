var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;
var WALL_DIVISIONS = 200;


function LightingScene() {
	CGFscene.call(this);

}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.enableTextures(true);
	
	this.clockUpdate = true;

	this.Light1 = true;
	this.Light2 = true;
	this.Light3 = true;
	this.Light4 = true;
	this.Light5 = true;
	
	//DRONE PROPERTIES
	
	this.speed = 0.4;
	this.propellerSpeedRotation = 1;

	this.droneAppearances = [];

	this.droneAppearances.push("../resources/images/dhl.jpg");
	this.droneAppearances.push("../resources/images/fedex.gif");
	this.droneAppearances.push("../resources/images/psp.png");
	this.droneAppearances.push("../resources/images/exercito.jpg");
	this.droneAppearances.push("../resources/images/rtp.jpg");
	this.droneAppearances.push("../resources/images/tvi.jpg");

	this.droneAppearanceList = ['DHL','DHL_F','FEDEX','FEDEX_F','PSP','PSP_F','EXERCITO','EXERCITO_F','RTP','RTP_F','TVI','TVI_F'];

	this.currDroneAppearance = 0;

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new MyTable(this, 0, 1, 0, 1);
	this.leftWall = new MyQuad(this, -0.5, 1.5, -0.5, 1.5);
	this.wall = new Plane (this, WALL_DIVISIONS, 0, 1, 0, 1);
	this.floor = new MyQuad(this, 0, 10, 0, 12)
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25, 0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
	this.cylinder = new MyCylinder(this, 20, 20);
	this.lamp = new MyLamp(this, 50, 20);
	this.toplamp = new MyCylinder(this, 20, 20);
	this.clock = new MyClock(this, 12, 1);
	this.plane = new MyPaperPlane(this, 14.5, 4, 8);
	this.drone = new MyDrone(this, 8, 1.1, 3, -Math.PI/2);
	this.dronePort = new MyDroneArm(this, 100, 1);
	this.box = new MyBox(this);
	this.destinyBox = new MyDestinyBox(this);

	//CABLE TOP POSITION

	this.cableTopPosition = [this.drone.x, this.drone.y-this.drone.centerScale-this.drone.cable.bodyLength-this.drone.cable.hookHeight, this.drone.z];

	//BOX POSITION

	this.boxPosition = [4, 0.5, 3];

	//BOX TOP

	this.boxTopPosition = [this.boxPosition[0], this.boxPosition[1], this.boxPosition[2]];
	this.boxCaughtUp = false;
	this.deltaBoxCaughtUp = 2.5 * this.box.cylinderRadius;

	//DESTINY BOX

	this.destinyBoxPosition = [6, 0.5, 12];
	this.boxInDestiny = false;

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialWall = new CGFappearance(this);
	this.materialWall.setAmbient(0.3,0.3,0.3,1.0);
	this.materialWall.setDiffuse(0.1,0.2,0.4,1.0);
	this.materialWall.setSpecular(0.8,0.2,0.8,1.0);
	this.materialWall.setShininess(120);

	this.materialFloor = new CGFappearance(this);
	this.materialFloor.setAmbient(0.3,0.3,0.3,1.0);
	this.materialFloor.setDiffuse(0.9,0.85,0.4,1.0);
	this.materialFloor.setSpecular(0.1,0.1,0.1,1.0);
	this.materialFloor.setShininess(120);
	
	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.floorAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.floorAppearance.setShininess(20);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.windowAppearance.setSpecular(0.2,0.2,0.2,1);	
	this.windowAppearance.setShininess(20);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.2,0.2,0.2,1);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.3,0.3,0.3,1);
	this.boardAppearance.setSpecular(0.5,0.5,0.5,1);
	this.boardAppearance.setShininess(120);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.wallAppearance = new CGFappearance(this);
	this.wallAppearance.setAmbient(0.3,0.3,0.3,1);
	this.wallAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.wallAppearance.setSpecular(0.3,0.3,0.3,1);
	this.wallAppearance.setShininess(120);
	this.wallAppearance.loadTexture("../resources/images/wall.png");
	this.wallAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.cylinderAppearance = new CGFappearance(this);
	this.cylinderAppearance.setAmbient(0.3,0.3,0.3,1);
	this.cylinderAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.cylinderAppearance.setSpecular(0.3,0.3,0.3,1);
	this.cylinderAppearance.setShininess(120);
	this.cylinderAppearance.loadTexture("../resources/images/cylinder.png");
	//this.cylinderAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.lampAppearance = new CGFappearance(this);
	this.lampAppearance.setAmbient(0.9,0.9,0.9,1);
	this.lampAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.lampAppearance.setSpecular(0.9,0.9,0.9,1);
	this.lampAppearance.setShininess(120);
	this.lampAppearance.loadTexture("../resources/images/lamp.png");

	//DRONE TEXTURES

	// DHL TEXTURE

 	this.dhlTexture = new CGFappearance(this);
	this.dhlTexture.loadTexture(this.droneAppearances[0]);
	this.dhlTexture.setDiffuse(1,1,1,1);
	this.dhlTexture.setSpecular(1,1,1,1);
	this.dhlTexture.setShininess(500);

	// FEDEX TEXTURE

 	this.fedexTexture = new CGFappearance(this);
	this.fedexTexture.loadTexture(this.droneAppearances[1]);
	this.fedexTexture.setDiffuse(1,1,1,1);
	this.fedexTexture.setSpecular(1,1,1,1);
	this.fedexTexture.setShininess(500);

	// PSP TEXTURE

 	this.pspTexture = new CGFappearance(this);
	this.pspTexture.loadTexture(this.droneAppearances[2]);
	this.pspTexture.setDiffuse(1,1,1,1);
	this.pspTexture.setSpecular(1,1,1,1);
	this.pspTexture.setShininess(500);

	// EXERCITO TEXTURE

 	this.exercitoTexture = new CGFappearance(this);
	this.exercitoTexture.loadTexture(this.droneAppearances[3]);
	this.exercitoTexture.setDiffuse(1,1,1,1);
	this.exercitoTexture.setSpecular(1,1,1,1);
	this.exercitoTexture.setShininess(500);

	// RTP TEXTURE

 	this.rtpTexture = new CGFappearance(this);
	this.rtpTexture.loadTexture(this.droneAppearances[4]);
	this.rtpTexture.setDiffuse(1,1,1,1);
	this.rtpTexture.setSpecular(1,1,1,1);
	this.rtpTexture.setShininess(500);

	// TVI TEXTURE

 	this.tviTexture = new CGFappearance(this);
	this.tviTexture.loadTexture(this.droneAppearances[5]);
	this.tviTexture.setDiffuse(1,1,1,1);
	this.tviTexture.setSpecular(1,1,1,1);
	this.tviTexture.setShininess(500);
	
	// FRONT TEXTURE

 	this.frontTexture = new CGFappearance(this);
	this.frontTexture.setDiffuse(1,0,0,1);
	this.frontTexture.setSpecular(1,0,0,1);
	this.frontTexture.setShininess(500);
	

	// DRONEPORT TEXTURE

 	this.dronePortTexture = new CGFappearance(this);
	this.dronePortTexture.setDiffuse(1,1,1,1);
	this.dronePortTexture.setSpecular(1,1,1,1);
	this.dronePortTexture.setShininess(500);
	this.dronePortTexture.loadTexture("../resources/images/heliport.jpg");

	// PERIOD UPDATE
	
	this.setUpdatePeriod(30);
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0, 1.0);

	//this.shader.bind();
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[4].setPosition(2.0, 6.0, 7.0, 1.0);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0,1.0,0,1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();
	
	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();
	
	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0,1.0,0,1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1.0);
	this.lights[3].enable();

	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0,1.0,0,1.0);
	this.lights[4].enable();



	//this.shader.unbind();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.display = function() {
	//this.shader.bind();

	//LIGHTS CheckBoxs

	if (this.Light1 == false)
	{
		this.lights[0].disable();
	}
	else this.lights[0].enable();

	if (this.Light2 == false)
	{
		this.lights[1].disable();
	}
	else this.lights[1].enable();

	if (this.Light3 == false)
	{
		this.lights[2].disable();
	}
	else this.lights[2].enable();

	if (this.Light4 == false)
	{
		this.lights[3].disable();
	}
	else this.lights[3].enable();

	if (this.Light5 == false)
	{
		this.lights[4].disable();
	}
	else this.lights[4].enable();

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section
	
	// Plane
	this.pushMatrix();
		this.plane.display();
	this.popMatrix();

	// Clock
	this.pushMatrix();
		this.translate(7.25, 7.25, 0);
		this.scale(0.7, 0.7, 0.2)
		this.clock.display();
	this.popMatrix();

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.windowAppearance.apply();
		this.leftWall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.wallAppearance.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		this.boardAppearance.apply();
		this.boardB.display();
	this.popMatrix();

	// Cylinder A
	this.pushMatrix();
		this.translate(1.1, 0, 1.2);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.scale(1,1,8);
		this.cylinderAppearance.apply();
		this.cylinder.display();
	this.popMatrix();

	// Cylinder B
	this.pushMatrix();
		this.translate(1.1, 0, 14);
		this.rotate(-Math.PI / 2, 1, 0, 0);
		this.scale(1,1,8);
		this.cylinder.display();
	this.popMatrix();

	// Lamp
	this.pushMatrix();
		this.translate(7, 6, 8);
		this.rotate(Math.PI, 0, 1, 0);
		this.lampAppearance.apply();
		this.lamp.display();
	this.popMatrix();

	// Top Lamp
	this.pushMatrix();
		this.translate(7, 8, 8);
		this.rotate(90 * degToRad, 1, 0, 0);
		this.scale(0.15,0.15,1);
		this.toplamp.display();
	this.popMatrix();

	// Drone
	this.pushMatrix();	
		this.drone.display();
	this.popMatrix();

	//Drone Port
	this.pushMatrix();
		this.translate(8,0.1,3)
		this.rotate(Math.PI/2,1,0,0);
		this.scale(2.5,2.5,0.1);
		this.dronePortTexture.apply();	
		this.dronePort.display();
	this.popMatrix();

	//Box
	this.pushMatrix();
		this.translate(this.boxPosition[0],this.boxPosition[1],this.boxPosition[2]);
		this.applyTextures();	
		this.box.display();
	this.popMatrix();

	//Destiny Box
	this.pushMatrix();
		this.translate(this.destinyBoxPosition[0],this.destinyBoxPosition[1],this.destinyBoxPosition[2]);
		this.applyTextures();
		this.destinyBox.display();
	this.popMatrix();

	// ---- END Primitive drawing section

	//this.shader.unbind();
};

LightingScene.prototype.update = function(currTime) {
	if(this.clockUpdate)
	this.clock.update(currTime);
	this.plane.update(currTime);
	this.drone.update(currTime);
};

LightingScene.prototype.doSomething = function() {

	console.log("Doing something...");

};

 // CLOCK BUTTON

 LightingScene.prototype.Clock = function() {

	if (this.clockUpdate)
		this.clockUpdate=false;
	else
		this.clockUpdate=true;

};

 // APPLY TEXTURES

 LightingScene.prototype.applyTextures = function() {
 
 	if(this.currDroneAppearance == 'DHL'||this.currDroneAppearance == 'DHL_F'|| this.currDroneAppearance == 0)
		this.dhlTexture.apply();
	else if(this.currDroneAppearance == 'FEDEX'||this.currDroneAppearance == 'FEDEX_F')
		this.fedexTexture.apply();
	else if(this.currDroneAppearance == 'PSP'||this.currDroneAppearance == 'PSP_F')
		this.pspTexture.apply();
	else if(this.currDroneAppearance == 'EXERCITO'||this.currDroneAppearance == 'EXERCITO_F')
		this.exercitoTexture.apply();
	else if(this.currDroneAppearance == 'RTP'||this.currDroneAppearance == 'RTP_F')
		this.rtpTexture.apply();
	else if(this.currDroneAppearance == 'TVI'||this.currDroneAppearance == 'TVI_F')
		this.tviTexture.apply();

 };

 // APPLY FRONT TEXTURES

 LightingScene.prototype.applyFrontTextures = function() {

	if(this.currDroneAppearance == 'DHL_F'||this.currDroneAppearance == 'FEDEX_F'||this.currDroneAppearance == 'PSP_F'||this.currDroneAppearance == 'EXERCITO_F'||this.currDroneAppearance == 'RTP_F'||this.currDroneAppearance == 'TVI_F')
		this.frontTexture.apply();

 };

 // UPDATE CABLE TOP POSITION

 LightingScene.prototype.updateCableTopPosition = function() {

	this.cableTopPosition[0] = this.drone.x;
	this.cableTopPosition[1] = this.drone.y-this.drone.centerScale-this.drone.cable.bodyLength-this.drone.cable.hookHeight;
	this.cableTopPosition[2] = this.drone.z;
	
 };
 
 //CHECK CABLE IS NEXT TO BOX

 LightingScene.prototype.updateBoxCaughtUp = function() {

	if((Math.abs(this.cableTopPosition[0] - this.boxTopPosition[0]) <= this.deltaBoxCaughtUp) && (Math.abs(this.cableTopPosition[1] - this.boxTopPosition[1]) <= this.deltaBoxCaughtUp) && (Math.abs(this.cableTopPosition[2] - this.boxTopPosition[2]) <= this.deltaBoxCaughtUp))
			
		this.boxCaughtUp = true;

 };

 // UPDATE BOX POSITION

 LightingScene.prototype.updateBoxPosition = function() {
	
	if(!this.boxInDestiny){
		this.boxPosition[0] = this.cableTopPosition[0];
		this.boxPosition[1] = this.cableTopPosition[1] + this.drone.cable.hookHeight/2;
		this.boxPosition[2] = this.cableTopPosition[2];

		this.box.angle = this.drone.angle;
	}

	else{

		this.boxPosition[0] = this.destinyBoxPosition[0];
		this.boxPosition[1] = this.destinyBoxPosition[1];
		this.boxPosition[2] = this.destinyBoxPosition[2];
	}
		

 };

 // CHECK BOX IS IN DESTINY

 LightingScene.prototype.updateBoxInDestiny = function() {

	if(((this.boxPosition[0] - 0.5) > (this.destinyBoxPosition[0]+this.destinyBox.wallWidth)) && ((this.boxPosition[0] + 0.5) < (this.destinyBoxPosition[0]+this.destinyBox.wallWidth+this.destinyBox.length+this.destinyBox.wallWidth)) && (this.boxPosition[1] > 0) && ((this.boxPosition[1]) < (this.destinyBox.height/2+this.destinyBox.floorWidth*2)) && ((this.boxPosition[2] - 0.5) > (this.destinyBoxPosition[2]-this.destinyBox.width/2+this.destinyBox.wallWidth)) && ((this.boxPosition[2] + 0.5) < (this.destinyBoxPosition[2]+this.destinyBox.width/2-this.destinyBox.wallWidth))){

		this.boxInDestiny = true;

		this.boxCaughtUp = false;
	}
 };