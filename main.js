console.log('Drone Online');
var targetCell="";
var turn="Player"
var safety="OFF"
var turnCount=0;
var start=0;
var OPTracker=0;
var OPLocation="";
var Level=1;
var decode=0;
var there="";
var token=0;
var here=0;
var loser=0;

//Turn Mgt~~~~~~~~~~~~~~~~~~~~~
function safetySwap(){            //Safety Controls
  if(turn==="Player"){
    safety="OFF"
  }
  else if(turn==="OP"){
    safety="ON";
  }
  indicators();
}

function turnSwap(){
  turnCount++;                    //Turn Controls
  if(turn==="Player"){
    turn="OP";
    setTimeout(turnSwap,4000)
    if(turnCount===1){
      spawn();
    }
    else if(turnCount>=2){
      defeat();
      setTimeout(OPmovement,2000);
    }
  }
  else if(turn==="OP"){
    turn="Player"
  }
  safetySwap();
}

// function turnState(){
//   return turn;
// }

// function safetyState(){
//   return safety;
// }

//UI Shiznit~~~~~~~~~~~~~~~~~~~~
function indicators(){
  if(safety==="OFF"){
    $('#bigRed').addClass('impact');
  }
  else if(safety==="ON"){
    $('#bigRed').removeClass('impact');
  }
}

function victory(){
  token++;
  if(token===OPTracker){
    alert("Server City is safe once again!")
  }
}

function defeat(){
  OPbeacon()
  for(var loss in here){
    console.log(loss,here[loss]);
    if(loss==="0"){
      if(here[loss]==="1"){
        alert("Server City has been infected!")
      }
    }
  }
}

//Fire Control~~~~~~~~~~~~~~~~
function fireClear(){
  $('#'+targetCell).removeClass('impact');
  turnSwap();
}

function fire(){
  $('#'+targetCell).addClass('impact');
  setTimeout(fireClear,5000)
}

function rotationDecoder(){
  code=$('#rotation').val()
  if(code<0){
    switch(code){
    case "-10":
      decode=50;
      break;
    case "-20":
      decode=60;
      break;
    case "-30":
      decode=70;
      break;
    case "-40":
      decode=80;
      break;
    }
    return decode;
  }
  else{
    decode=code;
  }
}

$('#bigRed').click(function(){
  if(turn==="Player"){
  rotationDecoder()
  targetCell=($('#degree').val()+"x"+decode)
  console.log(targetCell)
  fire();
  dmgCheck();
  }
})


//OP rendering~~~~~~~~~~~~~~~~~~
function startSelect(){
  start=(Math.floor(Math.random()*9))
}

function OPbeacon(){
  here=($('.standIn').parent()).attr('id');
  OPlocation=$('.standIn').attr('id')
  console.log(here,OPlocation)
}

function spawn(){                         //Creates an enemy
  startSelect()
  OPTracker++;
  $('#80x'+start+'0').append('<div class="standIn" id="OP'+OPTracker+'"></div>')
  OPbeacon();
}

function moveSelect(){
  there="";
  direction=(Math.floor(Math.random()*7))
  OPbeacon();
  for(var choosing=0;choosing<here.length; choosing++){
    next=choosing+1;
    if(direction>2||direction===1){         //Advancing one grid! x5 Likely
      if(choosing===0){
        newHeading=here[choosing]-1;
        there+=newHeading;
      }
      else{
        there+=here[choosing]
      }
    }
    else if(direction===2){                 //Moving Right!
      if(choosing===3){
        if(here[choosing]===5){
          newHeading=0;
        }
        else if(here[choosing]>=4||here[choosing]>6){
          newHeading=(here[choosing]-0)-1;
          there+=newHeading
        }
        else if(here[choosing]===0){
          newHeading=(here[choosing]-0)+1;
          there+=newHeading;
        }
        else{
          newHeading=(here[choosing]-0)+1;
          there+=newHeading;
        }
      }
      else{
        there+=here[choosing]
      }
    }
    else if(direction===0){                 //Moving Left!
      if(choosing===3){
        if(here[choosing]===0){
          newHeading=(here[choosing]-0)+1;
          there+=newHeading;
        }
        else if(here[choosing]===8||here[choosing]<4){
          newHeading=(here[choosing]-0)-1;
          there+=newHeading;
        }
        else{
          newHeading=(here[choosing]-0)+1;
          there+=newHeading;
        }
      }
      else{
        there+=here[choosing]
      }
    }
  }
  console.log(there)
}

function OPmovement(){
  moveSelect()
  $('#OP1').remove()
  $('#'+there).append('<div class="standIn" id="OP1"></div>')
}

//DMG~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function dmgCheck(){
  OPbeacon()
  if(here===targetCell){
    $('#OP1').remove();
    victory();
  }
}

//ON load~~~~~~~~~~~~~~~~~~~~~~~
$(document).ready(function(){
  var row=8
  while(row>0){
  $('#'+row).append(
    '<div class="row">\
    <div class="col-md-1" id="'+row+'0x80"></div>\
    <div class="col-md-1" id="'+row+'0x70"></div>\
    <div class="col-md-1" id="'+row+'0x60"></div>\
    <div class="col-md-1" id="'+row+'0x50"></div>\
    <div class="col-md-1" id="'+row+'0x00"></div>\
    <div class="col-md-1" id="'+row+'0x10"></div>\
    <div class="col-md-1" id="'+row+'0x20"></div>\
    <div class="col-md-1" id="'+row+'0x30"></div>\
    <div class="col-md-1" id="'+row+'0x40"></div>\
    </div>')
    row--;
  }
})

// <div class="col-md-1" id="'+row+'0x-40">'+row+'0x-4<div></div></div>\
// <div class="col-md-1" id="'+row+'0x-30">'+row+'0x-3<div></div></div>\
// <div class="col-md-1" id="'+row+'0x-20">'+row+'0x-2<div></div></div>\
// <div class="col-md-1" id="'+row+'0x-10">'+row+'0x-1<div></div></div>\
// <div class="col-md-1" id="'+row+'0x-00">'+row+'0x0<div></div></div>\
// <div class="col-md-1" id="'+row+'0x10">'+row+'0x1<div></div></div>\
// <div class="col-md-1" id="'+row+'0x20">'+row+'0x2<div></div></div>\
// <div class="col-md-1" id="'+row+'0x30">'+row+'0x3<div></div></div>\
// <div class="col-md-1" id="'+row+'0x40">'+row+'0x4<div></div></div>\

// <div class="col-md-1" id="'+row+'0x-40">'+row+'0x-4</div>\
// <div class="col-md-1" id="'+row+'0x-30">'+row+'0x-3</div>\
// <div class="col-md-1" id="'+row+'0x-20">'+row+'0x-2</div>\
// <div class="col-md-1" id="'+row+'0x-10">'+row+'0x-1</div>\
// <div class="col-md-1" id="'+row+'0x-00">'+row+'0x0</div>\
// <div class="col-md-1" id="'+row+'0x10">'+row+'0x1</div>\
// <div class="col-md-1" id="'+row+'0x20">'+row+'0x2</div>\
// <div class="col-md-1" id="'+row+'0x30">'+row+'0x3</div>\
// <div class="col-md-1" id="'+row+'0x40">'+row+'0x4</div>\
