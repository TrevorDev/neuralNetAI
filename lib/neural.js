  var adjPosX = function(x){
    return x/stage.width;
  }

  var adjPosY = function(x){
    return x/stage.height;
  }

  var adjSpd = function(x, maxSpd){
    return (x+maxSpd)/(maxSpd*2);
  }

  var adjOut = function(x, playerB){
    playerB.controller.keyUp("left");
    playerB.controller.keyUp("right");
    playerB.controller.keyUp("up");
    playerB.controller.keyUp("down");
    if(x.left > 0.4 || x.right > 0.4){
      if(x.left > x.right){
        playerB.controller.keyDown("left")
      }else{
        playerB.controller.keyDown("right")
      }
    }
    if(x.up > 0.4 || x.down > 0.4){
      if(x.up > x.down){
        playerB.controller.keyDown("up")
      }else{
        playerB.controller.keyDown("down")
      }
    }
    return x;
  }

var getNetTrainSet = function(coin, playerA, playerB){
	var ret = {
				input: {
	              cPosX: adjPosX(coin.getCenter().x),
	              cPosY: adjPosY(coin.getCenter().y),

	              myPosX: adjPosX(playerA.getCenter().x),
	              myPosY: adjPosY(playerA.getCenter().y)
	              // mySpdX: adjSpd(playerA.xSpd, playerA.maxSpd),
	              // mySpdY: adjSpd(playerA.ySpd, playerA.maxSpd)

	              // opPosX: adjPosX(playerB.x),
	              // opPosY: adjPosY(playerB.y),
	              // opSpdX: adjSpd(playerB.xSpd, playerB.maxSpd),
	              // opSpdY: adjSpd(playerB.ySpd, playerB.maxSpd)
	            },
	            output: {
	              left: playerA.controller.getKey("left") ? 1 : 0,
	              right: playerA.controller.getKey("right") ? 1 : 0,
	              up: playerA.controller.getKey("up") ? 1 : 0,
	              down: playerA.controller.getKey("down") ? 1 : 0
	            }
          }
    return ret;
}

var getNetOutput = function(net, coin, playerA, playerB){
	return net.run({
      cPosX: adjPosX(coin.getCenter().x),
      cPosY: adjPosY(coin.getCenter().y),

      myPosX: adjPosX(playerB.getCenter().x),
      myPosY: adjPosY(playerB.getCenter().y)
      // mySpdX: adjSpd(playerB.xSpd, playerB.maxSpd),
      // mySpdY: adjSpd(playerB.ySpd, playerB.maxSpd)

      // opPosX: adjPosX(playerA.x),
      // opPosY: adjPosY(playerA.y),
      // opSpdX: adjSpd(playerA.xSpd, playerA.maxSpd),
      // opSpdY: adjSpd(playerA.ySpd, playerA.maxSpd)
    });
}

var writeNetTofile = function(net, path){
	var json = net.toJSON();
    var fs = require('fs');
    fs.writeFile(path, JSON.stringify(json), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The file was saved!");
        }
    }); 
}

var readNetFromfile = function(path){
	var fs = require('fs');
	var file = fs.readFileSync(path, "utf8");
	var obj = JSON.parse(file)
	return obj;
}

var createNet = function(){
	return new brain.NeuralNetwork({
       // hiddenLayers: [6,6],
       //learningRate: 0.05
    });
}