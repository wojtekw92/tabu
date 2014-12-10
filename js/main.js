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
  var getCofigData = function() {
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
    getCofigData: getCofigData

  }

})();
screenHolder.changeGameWindow(1);
