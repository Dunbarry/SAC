// console.log('Drone Online');
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
    setTimeout(turnSwap,3000)
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

function winPage(){
  $('body').append('<div class="splashCurtain"></div>')
  $('.splashCurtain').append('<div class="text"><h1>You have defended Server City!</h1><h1>You Win!</h1></div>')
}

function losePage(){
  $('body').append('<div class="splashCurtain"></div>')
  $('.splashCurtain').append('<div class="text"><h1>Server city has been infected...</h1><h1>You Lose</h1></div>')
}

function victory(){
  token++;
  if(token===OPTracker){
    setTimeout(winPage,5000);
  }
}

function defeat(){
  OPbeacon()
  for(var loss in here){
    if(loss==="0"){
      if(here[loss]==="1"){
        setTimeout(losePage,3000);
      }
    }
  }
}


//Fire Control~~~~~~~~~~~~~~~~~~~~~~
function fireClear(){
  $('#'+targetCell).removeClass('impactGif');
  $('.turret').css('background-image','url(turret.gif)');
  turnSwap();
}

function fire(){
  $('#'+targetCell).addClass('impactGif');
  $('.turret').css('background-image','url(firing.gif)');
  setTimeout(fireClear,1300)
  setTimeout(dmgCheck,1400)
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

$(document).on('click','#bigRed', function(){
  if(safety==="OFF"){
  rotationDecoder()
  targetCell=($('#degree').val()+"x"+decode)
  turretRotate();
  setTimeout(fire,1500);
  setTimeout(positionCheck,4000)
  setTimeout(rotateClear,5000);
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
function rotateClear(){
  if($('.turret').hasClass('centerRight')){
    $('.turret').removeClass('centerRight');
  }
  else if($('.turret').hasClass('centerLeft')){
    $('.turret').removeClass('centerLeft');
  }
}

function positionCheck(){
  if($('.turret').hasClass('rotateLeft')){
    $('.turret').removeClass('rotateLeft');
    $('.turret').addClass('centerLeft')
  }
  else if($('.turret').hasClass('rotateRight')){
    $('.turret').removeClass('rotateRight');
    $('.turret').addClass('centerRight')
  }
  setTimeout(centerClear,900);
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
        rotateLeft()
      }
      else if(targetCell[angle]>2&&targetCell[angle]<5){
        rotateRight()
      }
    }
    else{
    }
  }
}


//DMG~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function dmgCheck(){
  OPbeacon()
  if(here===targetCell){
    $('#'+targetCell).addClass('impactGif');
    $('.standIn').remove();
    $('#'+targetCell).addClass('impactGif');
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
