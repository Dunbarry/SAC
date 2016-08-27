console.log('Drone Online');

$(document).ready(function(){
  var row=8
  while(row>0){
  $('#'+row).append(
    '<div class="row">\
      <div class="col-md-1">'+row+'0x-4</div>\
      <div class="col-md-1">'+row+'0x-3</div>\
      <div class="col-md-1">'+row+'0x-2</div>\
      <div class="col-md-1">'+row+'0x-1</div>\
      <div class="col-md-1">'+row+'0x0</div>\
      <div class="col-md-1">'+row+'0x1</div>\
      <div class="col-md-1">'+row+'0x2</div>\
      <div class="col-md-1">'+row+'0x3</div>\
      <div class="col-md-1">'+row+'0x4</div>\
    </div>')
    row--;
  }
})
