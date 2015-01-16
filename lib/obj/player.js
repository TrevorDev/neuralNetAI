function Player(scene, stage, x, y, width, height, spritePath, controller){
	Rect.call(this, x, y, width, height)

	this.setPos = function(x,y){
		this.x = x;
		this.y = y;
		this.sprite.x = x;
		this.sprite.y = y;
	}
	this.setDim = function(x,y){
		this.width = x;
		this.height = y;
		this.sprite.width = x;
		this.sprite.height = y;
	}
	this.frameAction = function(){
		if(this.controller.getKey("left")){
			this.xSpd -= this.moveAcc;
		}
		if(this.controller.getKey("right")){
			this.xSpd += this.moveAcc;
		}
		if(this.controller.getKey("up")){
			this.ySpd -= this.moveAcc;
		}

		if(this.controller.getKey("down")){
			this.ySpd += this.moveAcc;
		}
	}

	this.jump = function(){
		if(this.jumpCount < this.maxJumps){
			this.ySpd = -this.jumpPower;
			this.jumpCount++;
		}
	}

	this.move = function(){
		var oldPos = {x:this.x,y:this.y}
		this.x+=this.xSpd;
		this.y+=this.ySpd;
		//this.stage
		//console.log(this.x, this.y)
		this.setPos(this.x, this.y)
		if(this.x > this.stage.width || this.x < 0){
			this.xSpd*=-1
			this.x+=this.xSpd;
			this.setPos(this.x, this.y)
		}
		if(this.y > this.stage.height || this.y < 0){
			this.ySpd*=-1
			this.y+=this.ySpd;
			this.setPos(this.x, this.y)
		}
		this.xSpd*=0.80
		this.ySpd*=0.80
	}

	this.checkWallCollision = function(walls, xMove, yMove){
		for (var i in walls){
			if(delta = Collision.rect(this, walls[i], xMove, yMove)){
				return delta;
			}
		}
		return 0;
	}

	this.stage = stage;
	this.scene = scene;
	this.controller = controller;

	//add sprite
	this.sprite = new FLIXI.createSprite(spritePath, width, height);
	this.setPos(x,y)
	scene.container.addChild(this.sprite)
	
	this.hitboxes = []
	
	//directions
	this.xScale = 1;
	this.yScale = 1;
	this.hitDir = "x";



	//Stats
	this.maxJumps = 2;
	this.jumpPower = 10;
	this.setDim(width,height);
	this.setPos(x, y)
	this.moveAcc = 1;
	this.maxSpd = 200;
	this.xSpd = 0;
	this.ySpd = 0;
	this.jumpCount = 0;
	this.jumpKeyDown = false;
	this.attacking = false;
	this.grounded = false

	//stock information
	this.percentDmg = 0;
	this.baseDmg = 50;
	this.dmgDiv = 200;
	this.deaths = 0;

	Player.array.push(this)
}

Player.array = []