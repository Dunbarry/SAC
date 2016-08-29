var progressor=0;
// var splashText='<p>Once, they were legion. The Threatfire Corp, feared by any who dared set their sights on the radiant\
// citits of the Amiga Plateau. With a specialized suite of syntactic weapons, they were the only line of defense against the invasion of the Virals: An ever evolving race of plague bearing mutants and hack-born devourers. But the people of Amiga grew complacent, and the rise of the corporations saw new, privatized protectors for every man, woman and child. If they\
// could afford it.</p>\
//
// <p>Unsupported, the Threatfire Corp continued to serve the people. And, one by one, they grew outdated. Or, unwilling to\
// leave their posts, now stand watch over un-updated and abandoned cities. Ever vigilant, even in exile.</p>\
//
// <p>Now, the threat of the ever-changing Virals has returned...</p>\
//
// <p>Will you protect Server City from infection and degradation? Or will one more of Amiga plateau\'s jewels be swallowed by this foul scourge?</p>'

var tutorial1='<p>"Captian? Captain CyberHawke? Are you there? Oh! Thank the Mother Board! I thought we\'d lost you too!"</p>'

var tutorial2='<p>"That\'s something at least. But I won\'t psuedo-code it: Things aren\'t looking good. Your the only response I\'m getting. And I\'m reading more Virals on the way. And fast. I\'ll fill you in the rest later. Right now you better get your turret back online."</p>'

var tutorial3='<p>"I can\'t reach Command, which means no global positioning. You\'ll have to eyeball your coordinates and enter them manually. Angle for range adjustments. Orbit for lateral adjustments. Just like being back on the training grid, huh Captian?"</p>'

var tutorial4='<p>My drone\'s weapons are null, but I can at least spot for you from up here. Maybe I can set her down and--Nevermind that! They got here faster than I expected! Good luck, Captain! And remember: we\'re all counting on you.</p>'

var tutorial5='<p>Remember! Angle for range adjustments. Orbit for lateral adjustments. Then fire!</p>'

function hereWeGo(){
  $('.splashCurtain').remove();
  $('.speechBox').remove();
  turnSwap();
}

function curtainDraw(){
  $('.splashCurtain').css('opacity','0')
}

function tutorial(text){
  $('.speechBox').html(text)
}

function talking(){
  $('.speechBox').css('opacity','1');
}

$(document).on('click', '.splashCurtain', function(){
  console.log("Drone Online.")
  talking();
  tutorial(tutorial1);
  $('.speechBox').append('<div class="arrow" id="next"></div>');
})

$(document).on('click', '#next', function(){
  progressor++;
  switch(progressor){
    case 1:
      tutorial(tutorial2);
      $('.speechBox').append('<div class="arrow" id="next"></div>');
      break;
    case 2:
      tutorial(tutorial3);
      $('.speechBox').append('<div class="arrow" id="next"></div>');
      break;
    case 3:
      tutorial(tutorial4);
      $('.speechBox').append('<div class="arrow" id="next"></div>');
      break;
    case 4:
      tutorial(tutorial5);
      curtainDraw();
      $('.speechBox').append('<div class="arrow" id="next"></div>');
      break;
    case 5:
      hereWeGo();
      break;
  }
})