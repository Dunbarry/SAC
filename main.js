console.log('Drone Online');
var targetCell="";
var turn="Player"
var safety="OFF"
var turnCount=0;
var start=0;
var OPTracker=0;
var Level=1;
var decode=0;
// var direction="";

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
  turnCount++;            //Turn Controls
  if(turn==="Player"){
    turn="OP";
    setTimeout(turnSwap,4000)
    if(turnCount===1){
      spawn();
    }
  }
  else if(turn==="OP"){
    turn="Player"
  }
  safetySwap();
  console.log(safety);
  console.log(turn);
}

// function turnState(){
//   return turn;
// }

// function safetyState(){
//   return safety;
// }

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
  if($('#rotation').val()<0){
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
  }
})


//UI Shiznit~~~~~~~~~~~~~~~~~~~~
function indicators(){
  if(safety==="OFF"){
    $('#bigRed').addClass('impact');
  }
  else if(safety==="ON"){
    $('#bigRed').removeClass('impact');
  }
}


//OP rendering~~~~~~~~~~~~~~~~~~
function startSelect(){
  start=(Math.floor(Math.random()*9))
}

function OPbeacon(){
  here=($('.standIn').parent()).attr('id');
  for(var seek in here){
    console.log(here[seek])
  }
}

function spawn(){                 //Creates an enemy
  console.log("I am spawning!")
  startSelect()
  OPTracker++;
  $('#80x'+start+'0').append('<div class="standIn" id="'+OPTracker+'"></div>')
  OPbeacon();
}

// function moveSelect(){
//   direction=(Math.floor(Math.random()*4))
//   OPbeacon();
//   for(var choosing=0;choosing<here.length; choosing++){
//     next=choosing+1;
//     if(direction>1){             //Advancing one grid! x2 Likely
//       if(choosing===0){
//         here[choosing]=here[choosing]-1;
//       }
//     }
//     else if(direction===1){
//       if(choosing===3){
//         if(here[choosing]==="-"){
//           here[next]=here[next]+1;
//           if(here[next]=)
//         }
//         else{
//           here[choosing]=here[choosing]+1;
//         }
//       }
//     }
//     else if(direction){
//
//     }
//   }
// }
//
// function OPmovement(){
//
// }

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
