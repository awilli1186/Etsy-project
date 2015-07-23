
var itemURL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=bill_murray&includes=Images,Shop';

$.ajax(itemURL, {
  dataType: 'jsonp',
  method: 'GET',

  error: function(error){

  },
  success: function(data, textStatus, xhr){
    buildAllItems(data.results);
  }
});

var buildAllItems = function(listings){

  var html = listings.map(buildContent).reduce(function(html, item){
    return html + item;
  });

  $('.main').html(html);
};


var buildContent = function(listings){
  var title = listings.title;
  var templateHtml = $('#contentItems').html();
  var template = _.template(templateHtml);
  var output = template({
      // url: url,
      title: title,
      // description: description,

    });

    return output;
  };
