var gameScreen = new FLIXI.Screen($("#myCanvas"));
    stage = STAGES.standard(gameScreen)
    stage.width = $("#myCanvas").width()
    stage.height = $("#myCanvas").height()
    gameScreen.resize(1920/4,1080/4)
    
  

    var playerA = new Player(gameScreen, stage, 300, 50, 30, 30, "img/blue.png", CONTROLLER.P1)
    var playerB = new Player(gameScreen, stage, 960-300-30, 50, 30, 30, "img/blue.png", CONTROLLER.P2)
    var coin = new Coin(gameScreen, stage, 0, 0, 30, 30, "img/red.png")
    stage.players.push(playerA)
    stage.players.push(playerB)
    stage.coins.push(coin)
  //gameScreen.resize(1920,1080)

  
    


  var brain = require("brain");

  var net = null
  try{
    var netJson = readNetFromfile("trained.json");
    var net = createNet();
    net.fromJSON(netJson)
  }catch(e){
    console.log(e)
  }
  
	




  var trainData = [];

  var frame = 0;
  gameScreen.runAnimateLoop(function(){
        
        playerA.frameAction();
        var dSet = getNetTrainSet(coin, playerA, playerB)

        if(!net){
          net = createNet();
          trainData.push(dSet)
          net.train(trainData);
        }else{
          if(frame%5 == 0){
            trainData.push(dSet)
            if(trainData.length>300){
              net.train(trainData);
              writeNetTofile(net, "trained.json")
              trainData = [];
            }
          }
          frame++;
        }


        
        var output = getNetOutput(net, coin, playerA, playerB)

        var out = adjOut(output, playerB)
        if(frame % 120 == 0){
          console.log(dSet)
          console.log(output)
        }
        playerB.frameAction();

        playerA.move();
        playerB.move();

        coin.frameAction();
  });