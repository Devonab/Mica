$(document).ready(function(){
    
    $('.right').click(function() {
        
        $('#overlay').addClass('appear');
        window.setTimeout(function (){
            window.location.href = "profil.html";
        }, 3000);
        
    });
    
    $('.choice_click').click(function(){
        $('#ovprofil').addClass('appear');
        $('#choix').fadeIn('slow');
    });
    
    $('.histo_click').click(function(){
        $('#ovprofil').addClass('appear');
        $('#histo').fadeIn('slow');
    });
    
    $('#ovprofil').click(function(){
        $('#ovprofil').removeClass('appear');
        $('#choix').fadeOut('slow');
        $('#histo').fadeOut('slow');
    });
           
});
