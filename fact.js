

function getImageInfo(searchTerm, callback, errorCallback) {

    var Url = 'http://www.dnr.state.mn.us/fish/' + searchTerm + '.html';

    var x = new XMLHttpRequest();
    x.open('GET', Url);
    x.onreadystatechange=function()
    {
        if (x.readyState==4 && x.status==200)
        {
            var response = x.responseText;
            var right_content = $($(response).filter('div#page.container').html()).filter('div#right_content').html();
            var fishSources = [];
            $(right_content).each(function(){
                if ($($(this).find('img')).length !== 0){
                    var fish_name = $(this).find('img').filter('img').prop('alt');
                    var img_Url = $(this).find('img').filter('img').prop('src');
                    var fish = {"fishName" : fish_name, "imageUrl" : img_Url};
                    fishSources.push(fish);
                }
            });

            var fishInfo = $(right_content).filter('p').html();
            callback(fishSources[0]["imageUrl"], fishSources[0]["fishName"], fishInfo);
        } 
        
    };
    x.onerror = function() {
         errorCallback('Network error.');
    };
    x.send();
  
}

function loadJQuery(){
    var t=document;
    var o=t.createElement('script');
    o=t.createElement('script');
    o.setAttribute('type','text/javascript');
    o.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js');
    t.lastChild.firstChild.appendChild(o);
}


function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {

    loadJQuery();

    var fishArray = [
        'bigmouthbuffalo',
        'yellowperch',
        'whitesucker',
        'walleye/index',
        'trout/index',
        'sunfish/index',
        'sauger',
        'salmon/index',
        //'muskellunge/index',
        'longnosegar',
        'freshwaterdrum',
        // 'crappie/index',
        // 'cisco/index',
        'catfish/index',
        'burbot',
        'bowfin',
        'bass/index'
    ];
    var randomNumber = Math.floor(Math.random()*fishArray.length);

    getImageInfo(fishArray[randomNumber], function(imageSrc, fishName, fishInfo) {

      var imageResult = document.getElementById('image-result');
     
      imageResult.src = imageSrc;
      imageResult.hidden = false;

      $("#description").prepend($('<p>' + fishInfo + '</p>').fadeIn('slow'));
      $("#fishName").prepend($('<h4>' + fishName + '</h4>').fadeIn('slow'));

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
});