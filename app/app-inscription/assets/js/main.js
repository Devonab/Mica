$(document).ready(function(){
    
    $('#telephone_slide').hide();
    
    $('#profillink').click(function() {
        
        $('#overlay_launch').addClass('appear');
        window.setTimeout(function (){
            window.location.href = "../appli-coiffeur/index.html";
        }, 3000);
        
    });
    
    $('#button button').click(function(){
       $('#button button').addClass('sizeChange');
       $('#profillink').hide();    
        
    });
    
    $('#button button').mouseup(function() {
        
        setTimeout(function () {
            
            $('#button button').animate({
               opacity: '0',
               width: "320px"
           }, 300);
            
           $('#button').animate({
               width: "320px"
           }, 300, function() {
               $('#button button').hide();
               $('#name_button input').focus();
           });
            
            $('#name_slide').click(function(){
                
                if ( !$('#name_button input:text').val() )                       {
                    $('#button').toggleClass('error');
                    $('#name_slide span').toggleClass('errorLittle');
                    
                    $('#name_button').toggleClass('errorLabel');
                    
                }else{
                    $('#button').removeClass('error');
                    $('#name_slide').animate({
                        left: "100%"
                    }, 600);
                    $('#back_name').animate({
                        left: "100%",
                    }, 600);
                    $('#name_button').animate({
                       left: "-387px",
                        opacity: 0
                    },80);
                    $('#telephone_button').animate({
                        left: "-387px"
                    }, function(){
                        $('#telephone_slide').show();
                        $('#telephone_button input').focus();
                    });
                    
                    
                }
                 
            });
            
            
            

        }, 400);
        
        
        $('#telephone_slide').click(function(){
                        
            
                        if( !$('#telephone_button input').val()) {          
                            $('#button').toggleClass('error');
                            $('#telephone_slide span').toggleClass('error');
                        }else{
                            $('#telephone_slide').animate({
                                left: "387px",
                                opacity: "0"
                            });
                            $('#back_tel').animate({
                                left: "100%"
                            }, 600);
                            $('#telephone_button').animate({
                                left: "-100%",
                                opacity: 0
                            }, function() {
                                $('#button').css('border-color','rgba(38,38,38,.3');
                                $('#button').css('border-radius','999px');
                                $('#button').css('background','none');
                                $('#button').animate({
                                    width: "90px",
                                    height: "90px",
                                    borderWidth: 6,
                                    borderColor: "cccccc"
                                },600);
                                $('#photo').show();
                                $('#photo').addClass('moveTitle');
                                $('#compteur').hide(0).delay(800).show(0);
                                
                                
                                function endCountdown() {          
                                    $('#overlay').fadeIn(100).delay(100).fadeOut(100);
                                    $('#compteur').hide();
                                    $('#button').hide();
                                    $('h2').hide();
                                    $('#photo').hide();
                                    $('#loader').fadeIn(800).delay(4000).fadeOut(800);
                                    
                                };
                                
                                $('#end')
                                        .delay(9200)
                                        .queue( function(next){ 
                                            $(this).fadeIn(800); 
                                            next(); 
                                        });
                                
                                $('#end button').animate({
                                    width: "320px",
                                    height: "90px"
                                }, 600);
                                
                                $('#end button').click(function(){
                                    window.location.href = "../appli-coiffeur/index.html";
                                });
                                
                                function Timer() {
                                  if(count === 0) {
                                    clearInterval(timer);
                                    endCountdown();
                                  } else {
                                    $('#compteur').html(count);
                                    count--;
                                  };
                                };

                                var count = 3;
                                var timer = setInterval(function() { Timer(count); }, 1000);
                                
                            });
                        }
                
            });
        
    });
           
});
