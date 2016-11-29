var YT_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YT_BASE_URL,
    data: {
      key: 'AIzaSyDcoqfp7EMDlP5DJwnTZaVqLNC4nLdA2ls',
      part: 'snippet',
      q: searchTerm,
      r: 'json',
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


//What if I want to choose which element needs to display this? For example
//function displayYTSearchData(data, element);
//how would line 54 call this?
function displayYTSearchData(data) {
  var resultElement = '';
  
  console.log(data.items);
  
  if (data.items) {
    data.items.forEach(function(item) {
      var clickthrough_url = "https://www.youtube.com/watch?v=" + item.id.videoId;
      var item = item.snippet;
      var thumbnail = item.thumbnails.high;


      resultElement += 
      '<article class="result-item">' +
      '<p class="result-title">' + item.title + '</p>' + 
      '<a href="'+clickthrough_url+'"">' + '<img src="' + thumbnail.url + 
      '" ></img></a></article>';
    });
  }
  
  else {
    resultElement += '<p>No results</p>';
  }
  
  console.log(resultElement);
  $('.search-results').html(resultElement);
}

$('.search-form').submit(function(e){
  e.preventDefault();
  var query = $(this).find('.search-form-query').val()
  getDataFromApi(query, displayYTSearchData)
});