var tutorCount=0;
var progressor=0;
var splashText='<p>Once, they were legion. The Threatfire Corps, feared by any who dared set their sights on the radiant city\'s of the Amiga Plateau. With a specialized suite of syntactic weapons, they were the only line of defense against the invasion of the Virals: An ever evolving race of plague bearing mutants and hack-born devourers. But the people of Amiga grew complacent, and the rise of the corporations saw new, privatized protectors for every man, woman and child. If they could afford it.</p><p>Unsupported, the Threatfire Corp continued to serve the people. And, one by one, they grew outdated. Or, unwilling to leave their posts, now stand watch over un-updated and abandoned cities. Ever vigilant, even in exile.</p><p>Now, the threat of the ever-changing Virals has returned...</p><p>Will you protect Server City from infection and degradation? Or will one more of Amiga plateau\'s jewels be swallowed by this foul scourge?</p><h1>Siege @ Server City.</p>'

var tutorial1='<p>"Captian? Captain CyberHawke? Are you there? Ah! Finally some good news. I thought we\'d lost you too!"</p>'

var tutorial2='<p>"That\'s something at least. But I won\'t psuedo-code it: Things aren\'t looking good. Your the only response so far. I\'m also reading more Virals on the way. And fast. I\'ll fill you in on the rest later. Right now you better get your turret back online."</p>'

var tutorial3='<p>"I can\'t reach Command, which means no global positioning. You\'ll have to enter your firing manually. Angle for range adjustments. Orbit for lateral adjustments. Just like being back on the training grid, huh Captian?"</p>'

var tutorial4='<p>"My drone\'s weapon\'s are null, but I can at least spot for you from up here. Maybe I can set her down and--spoke too soon! They got here faster than I expected! Good luck, Captain! And remember: we\'re all counting on you. Don\'t let a single one through!"</p>'

var tutorial5='<p>~Angle for range adjustments. Orbit for lateral adjustments. Then fire!~</p>'

function hereWeGo(){
  $('.splashCurtain').remove();
  $('.speechBox').remove();
  turnSwap();
}

function curtainDraw(){
  $('.splashCurtain').css('opacity','0')
  $('.speechBox').css('color','white')
  $('.speechBox').css('background-color','lightblue')
}

function tutorial(text){
  $('.speechBox').html(text)
}

function talking(){
  $('.speechBox').css('opacity','1');
}

$(document).on('click', '.splashCurtain', function(){
  if(tutorCount===0){
  $('.text').remove();
  talking();
  tutorial(tutorial1);
  $('.speechBox').append('<div class="arrow" id="next"></div>');
  }
  tutorCount++;
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
