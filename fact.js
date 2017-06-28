

function getImageInfo(searchTerm, callback, errorCallback) {

    //var Url = 'https://www.dnr.state.mn.us/fish/bigmouthbuffalo.html';
    var Url = 'http://www.dnr.state.mn.us/fish/' + searchTerm + '.html';

    var x = new XMLHttpRequest();
    x.open('GET', Url);
    x.onreadystatechange=function()
    {
        if (x.readyState==4 && x.status==200)
        {
            var response = x.responseText;
            console.log(response);
            console.log($(response));
            var right_content = $($(response).filter('div#page.container').html()).filter('div#right_content').html();
            console.log($(right_content));
            var fishSources = [];
            //$(right_content).each(function(){
                // if ($($(this).find('img')).length !== 0)
                //     var fish = {}
                //     var fishName = $(this).find('img').filter('img').prop('alt');
                //     var imgUrl = $(this).find('img').filter('img').prop('src');
            //});
            //console.log($(right_content).find('p'));
            $(right_content).find('p').each(function(){
                console.log($(this).html());
            });
            // var arrayOfIds = $(right_content).find('*').map(function(){
            //     console.log($(this).find('img'));
            // }).get();

            // console.log($(right_content).find('p'));
            // var fishName = $($(right_content).has('img').html()).filter('img').prop('alt');
            // //console.log(fishName);
            // var fishInfo = $(right_content).filter('p').html();
            // console.log(fishInfo);
            //console.log($(right_content).has('img').html());
            // var arraysOfIds = $($(response).filter('div#page.container img').html()).map(function(){
            //     return this.id;
            // }).get();
            // console.log(arraysOfIds);
            //var imageSrc = $($(right_content).has('img').html()).filter('img').prop('src');
            //callback(imageSrc, fishName, fishInfo);
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
        // 'bigmouthbuffalo',
        //'yellowperch',
        // 'whitesucker',
        // 'walleye/index',
        'trout/index'
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