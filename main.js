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


//UI Shiznit~~~~~~~~~~~~~~~~~~~~~~~~~
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
    if(loss==="0"){
      if(here[loss]==="1"){
        alert("Server City has been infected!")
      }
    }
  }
}


//Fire Control~~~~~~~~~~~~~~~~~~~~~~
function fireClear(){
  $('#'+targetCell).removeClass('impactGif');
  turnSwap();
}

function fire(){
  $('#'+targetCell).addClass('impactGif');
  setTimeout(fireClear,1300)
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
  if(decode.length<2){
    decode=decode+"0";
  }
}

// $('#bigRed').click(function(){
//   console.log(firing);
//   if(turn==="Player"){
//   rotationDecoder()
//   targetCell=($('#degree').val()+"x"+decode)
//   turretRotate();
//   console.log(targetCell)
//   setTimeout(fire,2500);
//   setTimeout(dmgCheck,2000);
//   }
// })

$(document).on('click','#bigRed', function(){
  if(turn==="Player"){
  rotationDecoder()
  targetCell=($('#degree').val()+"x"+decode)
  turretRotate();
  setTimeout(fire,2500);
  setTimeout(dmgCheck,2000);
  }
})


//OP rendering~~~~~~~~~~~~~~~~~~~~~
function startSelect(){
  start=(Math.floor(Math.random()*9))
}

function OPbeacon(){
  here=$('.standIn').attr('id');
  OPlocation=$('.standIn').attr('id')
}

function spawn(){                         //Creates an enemy
  startSelect()
  OPTracker++;
  $('#80x'+start+'0').addClass('standIn');
  OPbeacon();
}

function moveSelect(){
  there="";
  console.log("Turning!")
  direction=(Math.floor(Math.random()*7))
  OPbeacon();
  for(var choosing=0;choosing<here.length; choosing++){
    next=choosing+1;
    if(direction>2||direction===1){        //Advancing one grid! x5 Likely
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
}

function OPmovement(){
  moveSelect()
  $('#'+here).removeClass('standIn')
  $('#'+there).addClass('standIn')
}

//Hero Rendering~~~~~~~~~~~~~~~~~~~~~~~
function positionCheck(){
  if($('.turret').hasClass('rotateLeft')){
    $('.turret').removeClass('rotateLeft');
    $('.turret').addClass('centerLeft')
  }
  else if($('.turret').hasClass('rotateRight')){
    $('.turret').removeClass('rotateRight');
    $('.turret').addClass('centerRight')
  }
}

function rotateRight(){
  $('.turret').addClass('rotateRight');
}

function rotateLeft(){
  $('.turret').addClass('rotateLeft');
}

function turretRotate(){
  for(var angle in targetCell){
    if(angle==="3"){
      if(targetCell[angle]>6){
        positionCheck();
        setTimeout(rotateLeft,900)
      }
      else if(targetCell[angle]>2&&targetCell[angle]<5){
        positionCheck();
        setTimeout(rotateRight,900)
      }
    }
    else{
      positionCheck();
    }
  }
}


//DMG~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function dmgCheck(){
  OPbeacon()
  if(here===targetCell){
    $('#OP1').remove();
    victory();
  }
}


//ON load~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
