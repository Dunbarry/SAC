console.log('Drone Online');

$(document).ready(function(){
  var row=8
  while(row>0){
  $('#'+row).append(
    '<div class="row">\
      <div class="col-md-1" id="'+row+'0x-40">'+row+'0x-4</div>\
      <div class="col-md-1" id="'+row+'0x-30">'+row+'0x-3</div>\
      <div class="col-md-1" id="'+row+'0x-20">'+row+'0x-2</div>\
      <div class="col-md-1" id="'+row+'0x-10">'+row+'0x-1</div>\
      <div class="col-md-1" id="'+row+'0x-00">'+row+'0x0</div>\
      <div class="col-md-1" id="'+row+'0x10">'+row+'0x1</div>\
      <div class="col-md-1" id="'+row+'0x20">'+row+'0x2</div>\
      <div class="col-md-1" id="'+row+'0x30">'+row+'0x3</div>\
      <div class="col-md-1" id="'+row+'0x40">'+row+'0x4</div>\
    </div>')
    row--;
  }
})
