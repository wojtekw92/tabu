var screenHolder=(function(){
  /*
  * This function is cleaning container for wrong words and add words from array
  */
  var screenNumber;
  var screenIDs = ['startup','game','next','finish'];
  var players =[{color: "#f00",name:"czerwoni"},
                {color: "#0f0",name:"zieloni"},
                {color: "#00f",name:"niebiescy"},
                {color: "#ff0",name:"oni"},
                {color: "#f0f",name:"xrwoni"},
                {color: "#f0f",name:"xxx"}
  ];
  var updateScoreBoard = function(scoreTab) {
    var score1 = document.getElementById('scoreBoard1');
    var score2 = document.getElementById('scoreBoard2');
    score1.innerHTML = score2.innerHTML = "<thead><th>drużyna</th><th>punkty</th></thead>"
    scoreTab.forEach(function(element, index){
      var newtr = document.createElement('tr');
      var newName = document.createElement('td');
      var newPoints = document.createElement('td');
      newtr.style.color = players[index].color;
      newName.innerHTML = players[index].name;
      newPoints.innerHTML = element;
      newtr.appendChild(newName);
      newtr.appendChild(newPoints);
      score1.appendChild(newtr);
      //score2.appendChild(newtr);
    });
  }
  var updateNextPlayer = function(number) {
    var nextPlayer = document.getElementById('nextPlayer');
    nextPlayer.style.color = players[number].color;
    nextPlayer.innerHTML = players[number].name;
  }
  var updateWinner = function(number) {
    var nextPlayer = document.getElementById('winner');
    nextPlayer.style.color = players[number].color;
    nextPlayer.innerHTML = players[number].name;
  }

  var insertWrongWords = function(tab) {
    var container = document.getElementById('wrongWordsContainer');
    var remove = container.getElementsByTagName('p');
    while(remove.length > 0) {
      remove[0].remove();
    }
    tab.forEach(function(element){
      var newp = document.createElement('p');
      newp.className = "text-center badwords";
      newp.innerHTML = element;
      container.appendChild(newp);
    });
  }
  /*
  * This Function change the main word in the view
  */
  var insertMainWord = function(word) {
    var wordContainer = document.getElementsByClassName('mainword');
    if (wordContainer.length > 0) {
      wordContainer[0].innerHTML = word;
    }
  }
  /*
  * Change Game window to the window with number
  */
  var changeGameWindow = function(number) {
    screenIDs.forEach(function(elementID, index){
        document.getElementById(elementID).style.display = 'none';
    });
    document.getElementById(screenIDs[number-1]).style.display = 'block';
    screenNumber = number;


  }
  var getScreenID = function(){
    return scrennIDs[screenNumber-1];
  }
  var getConfigData = function() {
   return {
     roundTime: parseInt(document.getElementById('time').value),
     maxPoints: parseInt(document.getElementById('winningPoints').value),
     gamers: parseInt(document.getElementById('Gamers').value),
     plusPoints: parseInt(document.getElementById('yesPoints').value),
     minusPoints: parseInt(document.getElementById('noPoints').value)
   }
  }
  return {
    insertWrongWords: insertWrongWords,
    insertMainWord: insertMainWord,
    getScreenID: getScreenID,
    changeGameWindow: changeGameWindow,
    getConfigData: getConfigData,
    updateScoreBoard: updateScoreBoard,
    updateNextPlayer: updateNextPlayer,
    updateWinner: updateWinner

  }

})();
var player=0;
var gameData={};
var points=[];
var time;
var timeInterval;
screenHolder.changeGameWindow(1);
document.getElementById('startButton').onclick = function() {
  gameData = screenHolder.getConfigData();
  for(var i=0;i<gameData.gamers;i++) points.push(0);
  screenHolder.changeGameWindow(3);
  screenHolder.updateScoreBoard(points);
  screenHolder.updateNextPlayer(player);
}
document.getElementById('startNext').onclick = function() {
  screenHolder.changeGameWindow(2);
  //zmien hasla
  changePass();
  time = 0;
  timeInterval = setInterval(function(){
    time++;
    //console.log(time);
    if(time==gameData.roundTime) {
      player++;
      if(player==gameData.gamers) player = 0;
      screenHolder.updateScoreBoard(points);
      screenHolder.updateNextPlayer(player);
      screenHolder.changeGameWindow(3);
      clearInterval(timeInterval);
    }
  },1000);
}
document.getElementById('goodA').onclick = function() {
  //zmien hasla
  changePass();
  points[player]+=gameData.plusPoints;
  if(points[player]>=gameData.maxPoints) {
    screenHolder.updateWinner(player);
    screenHolder.updateScoreBoard(points);
    clearInterval(timeInterval);
    screenHolder.changeGameWindow(4);
  }
}
document.getElementById('badA').onclick = function() {
  //zmien hasla
  changePass();
  points[player]+=gameData.minusPoints;
}
var changePass= function() {
  var pass = Math.floor((Math.random() * words.length));
  screenHolder.insertMainWord(words[pass].word);
  screenHolder.insertWrongWords(words[pass].bad)
}
words=[
{word:"ala1",bad:["jeb","z","dzidy","a","b"]},
{word:"ala2",bad:["jeb","z","dzidy","a","b"]},
{word:"ala3",bad:["jeb","z","dzidy","a","b"]},
{word:"ala4",bad:["jeb","z","dzidy","a","b"]}

]
