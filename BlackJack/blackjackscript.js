var DeckTemp = [
    {id:"A", value:0, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_Ace_of_clubs.png"},
                  {id:"2", value: 2, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_2_of_clubs.png"},
                  {id:"3", value: 3, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_3_of_clubs.png"},
                  {id:"4", value: 4, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_4_of_clubs.png"},
                  {id:"5", value: 5, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_5_of_clubs.png"},
                  {id:"6", value: 6, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_6_of_clubs.png"},
                  {id:"7", value: 7, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_7_of_clubs.png"},
                  {id:"8", value: 8, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_8_of_clubs.png"},
                  {id:"9", value: 9, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_9_of_clubs.png"},
                  {id:"10", value: 10, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_10_of_clubs.png"},
                  {id:"B", value: 10, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_Jack_of_clubs.png"},
                  {id:"D", value: 10, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_Queen_of_clubs.png"},
                  {id:"K", value: 10, img:"https://publicdomainvectors.org/photos/nicubunu_White_deck_King_of_clubs.png"}
                 ];
  var TheRealDeck = [];
  var Playerfield = [];
  var PlayerPoints = 0;
  var Bankfield = [];
  var BankPoints = 0;
  var money = 0;
  var BankIsDrawing = true;
  var hasMoney = false;
  var setMoney = 0;
  
  function setup(){
  
  TheRealDeck = [];
  Playerfield = [];
  PlayerPoints = 0;
  Bankfield = [];
  BankPoints = 0;
  BankIsDrawing = true;
  hasMoney = false;
  setMoney = 0;
  
  for(var i = 0; i < 4; i++){
    DeckTemp.forEach(function (item){
    TheRealDeck.push(item);
  
    })
  }
    $('#draw').prop("disabled", false);
    $('#stop').prop("disabled", true);
    $("#Einsatz").prop("disabled", false);
    document.getElementById("Player").innerHTML = "Gezogene Karten: ";
    document.getElementById("PlayerPoints").innerHTML = "Aktuelle Punktzahl: ";
    document.getElementById("KartenbildPlayer").innerHTML = "";
    
    document.getElementById("Bank").innerHTML = "Gezogene Karten: ";
    document.getElementById("BankPoints").innerHTML = "Punktzahl Bank: ";
    document.getElementById("KartenbildBank").innerHTML = "";
    document.getElementById("Status").innerHTML = "";
  }
  
  function addMoney(){
    money += 50;
    $("#Money").text(money);
  }
  
  function stop(){
    blockInput()
    bankDraw();
  }
  
  function bankDraw(){
    while(BankIsDrawing){  
    draw("Bank")
    }
  }
  
  function blockInput(){
    $('#draw').prop("disabled", true);
    $('#stop').prop("disabled", true);
  }
  
  function checkMoney(minMoney){
    if(money >= minMoney){
      hasMoney = true;
      $("#Einsatz").prop("disabled", true);
       }else{
         hasMoney = false;
         alert("Nicht genug Geld!")
       }
  }
  
  function PlayerWins(setMoney){
    document.getElementById("Status").innerHTML = "You Win!"
    blockInput();
    money += parseInt(setMoney);
    BankIsDrawing = false;
    $("#Money").text(money)
    $('#restart').prop("disabled", false);
  }
  
  function PlayerLose(setMoney){
    document.getElementById("Status").innerHTML = "You Lose!"
    blockInput();
    money -= setMoney;
    BankIsDrawing = false;
    $("#Money").text(money)
    $('#restart').prop("disabled", false);
  }
  
  function PlayerDraw(){
    document.getElementById("Status").innerHTML = "Draw!"
    blockInput();
    BankIsDrawing = false;
    $('#restart').prop("disabled", false);
  }
  
  function fillField(field, user){
    document.getElementById("Kartenbild" + user).innerHTML = ""
    field.forEach(function(card){
    document.getElementById("Kartenbild" + user).innerHTML += "<img src='" + card.img + "' class='card' height='156' width='126' style='float:left; margin-right: -70px;'>"
    })
  }
  
  function PlayerfieldId(){
    var PlayerfieldIds = [];
    for(var x in Playerfield){
      PlayerfieldIds.push(Playerfield[x].id)
    }
    return PlayerfieldIds;
  }
  
  function BankfieldId(){
    var BankfieldIds = [];
    for(var x in Bankfield){
      BankfieldIds.push(Bankfield[x].id)
    }
    return BankfieldIds;
  }
  
  function draw(User){
    
    if(hasMoney == false){
    setMoney = document.getElementById("Einsatz").value;
    checkMoney(setMoney);
    if(hasMoney == true){
    draw(User);
    }
    }else{
    $('#restart').prop("disabled", true);
    $('#stop').prop("disabled", false);
    var random = Math.floor(Math.random() * TheRealDeck.length);
    var currentCard = TheRealDeck[random];
    TheRealDeck.splice(random, 1);
    
    if(User == "Player"){
      Playerfield.push(currentCard);
      PlayerPoints = getPoints(PlayerPoints, Playerfield);
      
        document.getElementById(User).innerHTML = "Gezogene Karten: " + PlayerfieldId();
    document.getElementById(User + "Points").innerHTML = "Aktuelle Punktzahl: " + PlayerPoints;
      fillField(Playerfield, "Player");
    }else{
      Bankfield.push(currentCard);
      BankPoints = getPoints(BankPoints, Bankfield);
      
        document.getElementById(User).innerHTML = "Gezogene Karten: " + BankfieldId();
    document.getElementById(User + "Points").innerHTML = "Aktuelle Punktzahl: " + BankPoints;
      fillField(Bankfield, "Bank");
    }
  
    
    if(PlayerPoints > 21){
      PlayerLose(setMoney)
    }else if(PlayerPoints == 21){
      PlayerWins(setMoney)
    }
      if(BankPoints == PlayerPoints){
        PlayerDraw();
      }else if(BankPoints > PlayerPoints && BankPoints <= 21){
      PlayerLose(setMoney)
    }else if(BankPoints > 21){
      PlayerWins(setMoney)
    }
      
  }
  }
  
  function getPoints(Currentpoints, field){
    var points = 0;
    for(var x in field)field[x].id == "A" ? field.push( field.splice(x,1)[0] ) : 0;
    field.forEach(function(card){
      if(card.id != "A"){
        points += card.value;
      }else{
        if(points <= 10){
          points += 11;
        }else{
          points += 1;
        }
      }
      
    })
    
    return points;
    
  }
  
  $( document ).ready(function(){
   setup();
    $("#Money").text(money);
   });