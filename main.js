console.log('Drone Online');
var targetCell="";
var turn="Player"
var safety="OFF"
var turnCount=0;
var start=0;

function random(){
  start=(Math.floor(Math.random()*9))
  switch(start){
    case start===5:
      start=(-1);
      break;
    case start===6:
      start=(-2);
      break;
    case start===7:
      start=(-3);
      break;
    case start===8:
      start=(-4);
      break;
  }
  console.log(start);
  return start;
}

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
    console.log("Wait for it...")
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

$('#bigRed').click(function(){
  targetCell=($('#degree').val()+"x"+$('#rotation').val())
  fire();
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
function spawn(){                 //Creates an enemy
  console.log("I am spawning!")
  random()
  $('#80x'+start+'0').append(
    '<div class="standIn"></div>')
}

//ON load~~~~~~~~~~~~~~~~~~~~~~~
$(document).ready(function(){
  var row=8
  while(row>0){
  $('#'+row).append(
    '<div class="row">\
    <div class="col-md-1" id="'+row+'0x-40"></div>\
    <div class="col-md-1" id="'+row+'0x-30"></div>\
    <div class="col-md-1" id="'+row+'0x-20"></div>\
    <div class="col-md-1" id="'+row+'0x-10"></div>\
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
