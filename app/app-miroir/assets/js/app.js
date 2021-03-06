(function($){
  var video = document.querySelector('#videoMiror');
  var canvas = document.querySelector('#canvasMiror');
  var overlay = document.querySelector('#overlayMiror');
  overlay.width = $(window).width();
  overlay.height = $(window).height();
  var overlayCtx = overlay.getContext('2d');
  var canvasCtx = canvas.getContext('2d');
  
  var foundFlag = false;
  
  var hairCanvas = new Image();

  var htracker = new headtrackr.Tracker({debug: true, ui: false, retryDetection: false});
  $(document).ready(function(){
    htracker.init(video, canvas);
    htracker.start();
  });//close document ready
  
  
  function isset(a){
    if( typeof(a) != "undefined" ){
      return true;
    } else {
      return false;
    }
  }
  
  // Allow to navigate into navigation without change page
  $('.interface_main-nav').on('click', 'li a', function(ev){
    ev.preventDefault();
    var el = $(this).parent('li');
//    $('.interface_title').html('<a href="">'+el.data('title')+'</a>');
    if(el.find('ul').length != 0){
      el.parent('ul').removeClass('show').addClass('hide');
      setTimeout(function(){
        el.parent('ul').addClass('show');
        el.children('ul').addClass('show');
      },500);
    }
    return false;
  })
  
  
  // Generate color menu;
  $('.interface_main-nav').on('click', 'a.color_menu', function(ev){
    var datacolor = $(this).data('color');
    $('.interface_main-nav ul.lvltwo').hide().removeClass('show').addClass('hide');
    $('#threelvlinterface').append('<ul></ul>')
    if(colorbdd[datacolor].length < 8){
      $('#threelvlinterface ul').height(115);
    } else if(colorbdd[datacolor].length < 16){
      $('#threelvlinterface ul').height(230);
    }
    colorbdd[datacolor].forEach(function(color){
      $('#threelvlinterface ul').append('<li class="color_item"><a href="#" style="background-color:'+color+';"></a></li>')
    });
    $('#threelvlinterface').css({'z-index': 200});
    $('#threelvlinterface ul li').delay(200).each(function(){
      $(this).animate({opacity: 1})
    });
    $('#threelvlinterface').append('<a href="#" class="validate">Valider votre couleur</a>');
  })
  
  
  // Generate hair slider
  $('.interface_main-nav').on('click', 'a.hair_menu', function(ev){
    var datahair = $(this).data('hair');
    $('#threelvlinterface').append('<ul class="filter_list"></ul>');
    $('#threelvlinterface ul').append('<li class="hair_filter"><a href="#" class="filter_item lisses" data-filter="lisses"><svg class="filter_item_icon" viewbox="0 0 32 32"><use xlink:href="assets/img/sprites.svg#icon-lisses"></use></svg><span class="filter_item_title">Lisses<span></a></li>');
    $('#threelvlinterface ul').append('<li class="hair_filter"><a href="#" class="filter_item ondulés" data-filter="ondulés"><svg class="filter_item_icon" viewbox="0 0 32 32"><use xlink:href="assets/img/sprites.svg#icon-ondules"></use></svg><span class="filter_item_title">Ondulés<span></a></li>');
    $('#threelvlinterface ul').append('<li class="hair_filter"><a href="#" class="filter_item bouclés" data-filter="bouclés"><svg class="filter_item_icon" viewbox="0 0 32 32"><use xlink:href="assets/img/sprites.svg#icon-boucles"></use></svg><span class="filter_item_title">Bouclés<span></a></li>');
    $('#threelvlinterface').append('<div class="hair_slider"></div>');
    $('.interface_main-nav ul.lvltwo').hide().removeClass('show').addClass('hide'); 
    hairbdd[datahair].forEach(function(hair){
      $('#threelvlinterface .hair_slider').append('<div class="hair_item '+ hair.tag[1] +'"><a href="#" data-src="'+ hair.src +'"><img src="assets/img/'+ hair.thumb +'" alt="coiffure" height="200"/></a></div>');
    });
    $('#threelvlinterface .hair_slider').slick({
      centerMode: true,
      centerPadding: '0px',
      infinite: true,
      centerPadding: '90px',
      slidesToShow: 3
    });
    $('#threelvlinterface').css({'z-index': 200}).hide().delay(200).fadeIn();
    $('#threelvlinterface').append('<a href="#" class="validate">Valider votre coupe</a>');
  })
  
  
  // Apply color selected to the hair
  $('#threelvlinterface').on('click', '.color_item a', function(ev){
    ev.preventDefault();
    $('#threelvlinterface ul').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    $('.validate').animate({opacity: 1});
    return false;
  });  
  
  // Apply hair selected to the head
  $('#threelvlinterface').on('click', '.hair_item a', function(ev){
    ev.preventDefault();
    var source = 'assets/img/'+$(this).data('src');
    hairCanvas.src = source;
    $('#threelvlinterface .hair_slider').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    $('.validate').animate({opacity: 1});
    return false;
  });

  $('#threelvlinterface').on('click', '.hair_filter a', function(ev){
    ev.preventDefault();
    var filter = $(this).data('filter');
    if($(this).hasClass('active')){
      $('#threelvlinterface .hair_slider').slickUnfilter();
      $(this).removeClass('active');
    } else {
      $('#threelvlinterface .hair_slider').slickFilter('.'+filter);
      $('#threelvlinterface').find('.active').removeClass('active');
      $(this).addClass('active');
    }
    return false;
  });
  
  
  $('#threelvlinterface').on('click', '.validate', function(ev){
    $('#threelvlinterface').fadeOut();
    $('.interface_main-nav').find('.hide').delay(200).removeClass('hide');
    $('.interface_main-nav').find('.show').delay(200).removeClass('show');
    $('.interface_main-nav').find('ul').delay(200).show();
    $('.interface_main-nav').children('ul.lvlone').delay(200).addClass('show');
    ev.preventDefault();
    return false;
  });
  

  document.addEventListener('headtrackrStatus', function (event) {
      switch(event.status){
        case 'found':
          if(timer){
            clearTimeout(timer);
            console.log('clear timer');
          }
          if(!foundFlag){
            $('video').removeClass('blurred');
            $('section').show();
            $('.interface_title').animate({
              top: '0px',
              opacity: 1
            }, 200).delay(5000).animate({
              top: '-500px',
              opacity: 0
            }, 200);
            foundFlag = true;
          }
          break;
        case 'lost':
          var timer = setTimeout(function(){
            $('video').addClass('blurred');
            $('section').fadeOut(1000);
            foundFlag = false;
            htracker.start();
          }, 1000);

          break;
      }
    }
  );
  
//  hairCanvas.onload = function(){
//    
//  }
  document.addEventListener('facetrackingEvent', function(event){
//    console.log('x: '+ event.x +' | y: '+ event.y +' | width: '+ event.width +' | height: '+ event.height +' | angle: '+ event.angle);
    if(hairCanvas.src !== ''){
      console.log(event.x +' / '+event.y);
      overlayCtx.clearRect(0,0,1080,1920);
      overlayCtx.drawImage(hairCanvas, 
                           (event.x - (event.width / 2) ) * 10 - 500,
                           (event.y - (event.height / 2) ) * 10 - 50,
                           event.width * 40,
                           hairCanvas.height * (event.width / hairCanvas.width) * 40
                          );
    }
  });
  
})(jQuery);