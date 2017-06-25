

function getImageInfo(searchTerm, callback, errorCallback) {

    //var Url = 'https://www.dnr.state.mn.us/fish/bigmouthbuffalo.html';
    var Url = 'http://www.dnr.state.mn.us/fish/yellowperch.html';

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
            var fishName = $(right_content).filter('h1').html();
            console.log(fishName);
            var fishInfo = $(right_content).filter('p').html();
            console.log(fishInfo);
            var imageSrc = $($(right_content).filter('p:last-child').html()).filter('img').prop('src');
            callback(imageSrc, fishName, fishInfo);
        } 
        
    };
    x.onerror = function() {
         errorCallback('Network error.');
    };
    x.send();
  
}

function loadJQuery(){

}


function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {

    var t=document;
    var o=t.createElement('script');
    o=t.createElement('script');
    o.setAttribute('type','text/javascript');
    o.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js');
    t.lastChild.firstChild.appendChild(o);


    getImageInfo("mahi", function(imageSrc, fishName, fishInfo) {

      var imageResult = document.getElementById('image-result');
     
      //imageResult.width = width;
      //imageResult.height = height;
      imageResult.src = imageSrc;
      imageResult.hidden = false;

      $("#description").prepend($('<p>' + fishInfo + '</p>').fadeIn('slow'));
      $("#fishName").prepend($('<h4>' + fishName + '</h4>').fadeIn('slow'));

    }, function(errorMessage) {
      renderStatus('Cannot display image. ' + errorMessage);
    });
});







// document.addEventListener('DOMContentLoaded', function() {
// 	var imageResult = document.getElementById('image-result');
// 	imageResult.src = "https://duckduckgo.com/i/f8835726.png";
// 	imageResult.align = "right";

//     var searchUrl = 'https://www.googleapis.com/customsearch/v1?' + 
//    'key=AIzaSyC8HaTHl09Bxkc5rl_saIhxVLtBXVwCbOw' + 
//    '&cx=016674471602576918208:vdsj6wr1edq' +
//    '&q=searchTerm' +
//    '&searchType=image' +
//    '&num=10';

//     var x = new XMLHttpRequest();
//     x.open('GET', searchUrl);
//     x.responseType = 'json';
//     x.onload = function() {
//     // Parse and process the response from Google Image Search.
//     var response = x.response;
//     if (!response || !response.responseData || !response.responseData.results ||
//         response.responseData.results.length === 0) {
//       errorCallback('No response from Google Image search!');
//       return;
//     }
//     var firstResult = response.responseData.results[0];
//     // Take the thumbnail instead of the full image to get an approximately
//     // consistent image size.
//     var imageUrl = firstResult.tbUrl;
//     var width = parseInt(firstResult.tbWidth);
//     var height = parseInt(firstResult.tbHeight);
//     console.assert(
//         typeof imageUrl == 'string' && !isNaN(width) && !isNaN(height),
//         'Unexpected respose from the Google Image Search API!');
//     callback(imageUrl, width, height);
//   };
//   x.onerror = function() {
//     errorCallback('Network error.');
// //   };
// //   x.send();




// <p>The bigmouth buffalo, the largest member of the  sucker family, lives in lakes and rivers in most of Minnesota except for the Lake Superior watershed. Unlike many fish, it can survive in cloudy, warm water. Unlike other members of the sucker family, the bigmouth buffalo has a mouth at the front of its  face. It looks like a carp without barbels. They can grow 3 feet long or  longer and weigh more than 50 pounds. Bigmouth buffalo range in color from green to gold to almost black. They have a coppery sheen.</p>
// <p style="text-align: center;"><img width="550" height="265" src="http://images.dnr.state.mn.us/natural_resources/animals/fish/profiles/bm-buffalo.png" alt="bigmouth buffalo" /></p>

