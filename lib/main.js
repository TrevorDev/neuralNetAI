var gameScreen = new FLIXI.Screen($("#myCanvas"));
    stage = STAGES.standard(gameScreen)
    stage.width = $("#myCanvas").width()
    stage.height = $("#myCanvas").height()
    gameScreen.resize(1920/4,1080/4)
    
  

    var playerA = new Player(gameScreen, stage, 300, 0, 30, 30, "img/blue.png", CONTROLLER.P1)
    var playerB = new Player(gameScreen, stage, 960-300-30, 0, 30, 30, "img/blue.png", CONTROLLER.P2)
    var coin = new Coin(gameScreen, stage, 0, 0, 30, 30, "img/red.png")
    stage.players.push(playerA)
    stage.players.push(playerB)
    stage.coins.push(coin)
  //gameScreen.resize(1920,1080)

  gameScreen.runAnimateLoop(function(){
        playerA.frameAction();
        playerB.frameAction();

        playerA.move();
        playerB.move();

        coin.frameAction();

        //gameScreen.camera.zoom(1.01);
    //img.x++;
  });
    


  var brain = require("brain");

	var net = new brain.NeuralNetwork();

	net.train([{input: [0.5, 0.2], output: [0.7]},
	           {input: [1.0, 0.0], output: [1]},
	           {input: [0.1, 0.3], output: [0.4]},
	           {input: [0.1, 0.1], output: [0.2]}]);

	var output = net.run([0.5, 0.2]);  // [0.987]
	alert(output);