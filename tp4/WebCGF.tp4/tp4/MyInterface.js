/**
 * MyInterface
 * @constructor
 */
 
var degToRad = Math.PI / 180.0;
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene, 'doSomething');

	//CLOCK Button

	this.gui.add(this.scene, 'Clock');

	// add a group of controls (and open/expand by defult)
	
	var lights=this.gui.addFolder("Lights");
	//lights.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	lights.add(this.scene, 'Light1');
	lights.add(this.scene, 'Light2');
	lights.add(this.scene, 'Light3');
	lights.add(this.scene, 'Light4');
	lights.add(this.scene, 'Light5');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	

	//DRONE PROPERTIES

	var drone=this.gui.addFolder("Drone Properties");

	//drone.open();

	this.gui.remember(drone);
	
	drone.add(this.scene.drone, 'centerScale', 0.5, 1);

	drone.add(this.scene.drone, 'armWidth', 0.1, 0.2);
	
	drone.add(this.scene.drone, 'armHeight', 3, 6);

	drone.add(this.scene.drone, 'heliWidth', 0.01, 0.1);
	
	drone.add(this.scene.drone, 'heliHeight', 0.5, 2);

	drone.add(this.scene.drone, 'legWidth', 0.1, 0.5);

	drone.add(this.scene.drone, 'legBaseWidth', 0.05, 0.5);

	drone.add(this.scene.drone, 'legBaseHeight', 0.01, 0.1);

	drone.add(this.scene.drone, 'legBaseLength', 2, 6);

	drone.add(this.scene, 'speed', -5, 5);

	drone.add(this.scene, 'propellerSpeedRotation', 0.1, 2);

	drone.add(this.scene.drone, 'deltaRotationAngle', 1, 20);

	drone.add(this.scene.drone, 'deltaInclinationAngle', 1, 10);

	drone.add(this.scene.drone, 'inclinationAngleLimit', 5, 20);

	drone.add(this.scene, 'currDroneAppearance', this.scene.droneAppearanceList);

	//DESTINY PROPERTIES

	var destiny=this.gui.addFolder("Destiny Properties");

	destiny.add(this.scene.destinyBox, 'width', 2, 5);

	destiny.add(this.scene.destinyBox, 'length', 2, 6);
	
	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyDown = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	
	switch (event.keyCode)
	{
		case (65):	// 'A', left rotation
			
			console.log("Yaw mode activated");
			console.log("Going left");

			this.scene.drone.movementState='YAW_LEFT';
			this.scene.drone.setAngle(this.scene.drone.deltaRotationAngle * degToRad);
			
			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}
			
			break;

		case (97):	// 'a', left rotation
			
			console.log("Yaw mode activated");
			console.log("Going left");

			this.scene.drone.movementState='YAW_LEFT';
			this.scene.drone.setAngle(this.scene.drone.deltaRotationAngle * degToRad);
			
			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;

		case (68):	// 'D', right rotation

			console.log("Yaw mode activated");
			console.log("Going Right");
			
			this.scene.drone.movementState='YAW_RIGHT';
			this.scene.drone.setAngle(-this.scene.drone.deltaRotationAngle * degToRad);
			
			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;

		case (100):	// 'd', right rotation

			console.log("Yaw mode activated");
			console.log("Going Right");
			
			this.scene.drone.movementState='YAW_RIGHT';
			this.scene.drone.setAngle(-this.scene.drone.deltaRotationAngle * degToRad);

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (87):	// 'W', go forward
			
			console.log("Pitch mode activated");
			console.log("Going forward");

			this.scene.drone.movementState='PITCH_FRONT';

			this.scene.drone.goForward(this.scene.speed);

			if(this.scene.drone.inclinationAngle<=this.scene.drone.inclinationAngleLimit*degToRad)
				this.scene.drone.setInclinationAngle(this.scene.drone.deltaInclinationAngle*degToRad);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (119):	// 'w', go forward
			
			console.log("Pitch mode activated");
			console.log("Going forward");

			this.scene.drone.movementState='PITCH_FRONT';

			this.scene.drone.goForward(this.scene.speed);

			if(this.scene.drone.inclinationAngle<=this.scene.drone.inclinationAngleLimit*degToRad)
				this.scene.drone.setInclinationAngle(this.scene.drone.deltaInclinationAngle * degToRad);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;

		case (83):	// 'S', go backward
			
			console.log("Pitch mode activated");
			console.log("Going backward");

			this.scene.drone.movementState='PITCH_BACK';

			this.scene.drone.goBackward(this.scene.speed);

			if(this.scene.drone.inclinationAngle>=-this.scene.drone.inclinationAngleLimit*degToRad)
				this.scene.drone.setInclinationAngle(-this.scene.drone.deltaInclinationAngle * degToRad);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (115):	// 's', go backward
			
			console.log("Pitch mode activated");
			console.log("Going backward");

			this.scene.drone.movementState='PITCH_BACK';

			this.scene.drone.goBackward(this.scene.speed);

			if(this.scene.drone.inclinationAngle>=-this.scene.drone.inclinationAngleLimit*degToRad)
				this.scene.drone.setInclinationAngle(-this.scene.drone.deltaInclinationAngle * degToRad);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (73):	// 'I', go up

			console.log("Going up");

			this.scene.drone.movementState='GOING_UP';

			this.scene.drone.goUp(this.scene.speed);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (105):	// 'i', go up

			console.log("Going up");

			this.scene.drone.movementState='GOING_UP';

			this.scene.drone.goUp(this.scene.speed);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (74):	// 'J', go down

			console.log("Going down");

			this.scene.drone.movementState='GOING_DOWN';

			this.scene.drone.goDown(this.scene.speed);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (106):	// 'j', go down

			console.log("Going down");

			this.scene.drone.movementState='GOING_DOWN';

			this.scene.drone.goDown(this.scene.speed);
			
			this.scene.updateCableTopPosition();

			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (80):	// 'P', Cable going down

			console.log("Cable going down");

			this.scene.drone.cable.bodyLength+=this.scene.drone.cable.deltaBodyLength;

			this.scene.updateCableTopPosition();
			
			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;
		
		case (112):	// 'p', Cable going down

			console.log("Cable going down");

			this.scene.drone.cable.bodyLength+=this.scene.drone.cable.deltaBodyLength;

			this.scene.updateCableTopPosition();
			
			this.scene.updateBoxCaughtUp();

			if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
			}

			break;

		case (76):	// 'L', Cable going up

			if(this.scene.drone.cable.bodyLength>0){

				console.log("Cable going up");

				this.scene.drone.cable.bodyLength-=this.scene.drone.cable.deltaBodyLength;

				this.scene.updateCableTopPosition();

				this.scene.updateBoxCaughtUp();

				if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
				}

			};

			break;

		case (108):	// 'l', Cable going up

			if(this.scene.drone.cable.bodyLength>0){

				console.log("Cable going up");

				this.scene.drone.cable.bodyLength-=this.scene.drone.cable.deltaBodyLength;

				this.scene.updateCableTopPosition();

				this.scene.updateBoxCaughtUp();

				if(this.scene.boxCaughtUp){
				
				this.scene.updateBoxPosition();
				this.scene.updateBoxInDestiny();
				}

			};

			break;
	};

};

MyInterface.prototype.processKeyUp = function(event) {
	
	CGFinterface.prototype.processKeyUp.call(this,event);
		
	switch (event.keyCode)
	{
		
		case (87):	// 'W', KEY UP

			console.log("Static mode activated");

			this.scene.drone.movementState='STATIC';

			//this.scene.drone.inclinationAngle = 0;

			break;

		case (83):	// 'S', KEY UP
			
			console.log("Static mode activated");

			this.scene.drone.movementState='STATIC';

			//this.scene.drone.inclinationAngle = 0;
			
			break;

		default:	// KEY UP

			console.log("Static mode activated");
			
			this.scene.drone.movementState='STATIC';
			
			break;	
	};

};