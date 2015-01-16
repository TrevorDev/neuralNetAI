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
    var left = x.left > 0.5 ? playerB.controller.keyDown("left") : playerB.controller.keyUp("left");
    var right = x.right > 0.5 ? playerB.controller.keyDown("right") : playerB.controller.keyUp("right");
    var up = x.up > 0.5 ? playerB.controller.keyDown("up") : playerB.controller.keyUp("up");
    var down = x.down > 0.5 ? playerB.controller.keyDown("down") : playerB.controller.keyUp("down");
    return {left: left, right: right, up: up, down: down};
  }

var getNetTrainSet = function(coin, playerA, playerB){
	var ret = {
				input: {
	              cPosX: adjPosX(coin.x),
	              cPosY: adjPosY(coin.y),

	              myPosX: adjPosX(playerA.x),
	              myPosY: adjPosY(playerA.y)
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
      cPosX: adjPosX(coin.x),
      cPosY: adjPosY(coin.y),

      myPosX: adjPosX(playerB.x),
      myPosY: adjPosY(playerB.y)
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
       hiddenLayers: [4,6],
       learningRate: 0.1
    });
}