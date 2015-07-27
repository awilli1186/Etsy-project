
var itemURL = 'https://openapi.etsy.com/v2/listings/active.js?api_key=h9oq2yf3twf4ziejn10b717i&keywords=bill_murray&includes=Images,Shop';

$.ajax(itemURL, {
  dataType: 'jsonp',
  method: 'GET',

  error: function(error) {
    alert('oops we have a problem!');
  },

  success: function(data, textStatus, xhr) {
    buildAllItems(data.results);
  }
});

var buildAllItems = function(listings) {

  var html = listings.map(buildContent).reduce(function(html, item) {
    return html + item;
  });

  $('.content').html(html);
};

var buildContent = function(listings) {
  var image = _.first(listings.Images);

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

  image = image.url_170x135;

  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var imageUrl = listings.url;
  var title = listings.title;
  var subTitle = function() {
    if (title.length > 28) {
      return title.substring(0, 28) + '...';
    } else {
      return title;
    }
  };

  var titleUrl = listings.url;

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

  var shop = listings.Shop.shop_name;

  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var shopUrl = listings.Shop.url;
  var price = listings.price;

  // jscs:disable requireCamelCaseOrUpperCaseIdentifiers

  var currency = listings.currency_code;

  // jscs:enable requireCamelCaseOrUpperCaseIdentifiers

  var templateHtml = $('#contentItems').html();
  var template = _.template(templateHtml);
  var output = template({
      image: image,
      imageUrl: imageUrl,
      subTitle: subTitle,
      titleUrl: titleUrl,
      shop: shop,
      shopUrl: shopUrl,
      price: price,
      currency: currency
    });

  return output;
};
