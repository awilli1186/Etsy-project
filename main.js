
var itemURL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=bill_murray&includes=Images,Shop';

$.ajax(itemURL, {
  dataType: 'jsonp',
  method: 'GET',

  error: function(error){
    alert('oops we have a problem!');
  },
  success: function(data, textStatus, xhr){
    buildAllItems(data.results);
  }
});

var buildAllItems = function(listings){

  var html = listings.map(buildContent).reduce(function(html, item){
    return html + item;
  });

  $('.content').html(html);
};


var buildContent = function(listings){
  var image = _.first(listings.Images);
      image = image.url_170x135;
  var imageUrl = listings.url;
  var title = listings.title;
  var titleUrl = listings.url;
  var shop = listings.Shop.shop_name;
  var shopUrl = listings.Shop.url;
  var price = listings.price;
  var currency = listings.currency_code;
  var templateHtml = $('#contentItems').html();
  var template = _.template(templateHtml);
  var output = template({
      image: image,
      imageUrl: imageUrl,
      title: title,
      titleUrl: titleUrl,
      shop: shop,
      shopUrl: shopUrl,
      price: price,
      currency: currency,
    });

    return output;
  };
