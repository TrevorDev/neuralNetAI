function Coin(scene, stage, x, y, width, height, spritePath){
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
		var self = this;
		$.each(this.stage.players, function(i, val){
			if(Collision.rect(self, val, 0, 0)){
				self.setPos(Math.random()*self.stage.width,Math.random()*self.stage.height)
			}
		})
	}

	this.stage = stage;
	this.scene = scene;

	//add sprite
	this.sprite = new FLIXI.createSprite(spritePath, width, height);
	this.setPos(Math.random()*this.stage.width,Math.random()*this.stage.height)
	scene.container.addChild(this.sprite)
	
	this.hitboxes = []
	
	//directions
	this.xScale = 1;
	this.yScale = 1;
	this.hitDir = "x";

	//Stats
	this.setDim(width,height);
	//this.setPos(x, y)
	
	this.xSpd = 0;
	this.ySpd = 0;
	Coin.array.push(this)
}
Coin.array = []