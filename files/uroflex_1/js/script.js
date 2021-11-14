$(document).ready(function() {

$("a").addClass('to_form');
$(".remove-to_form").removeClass('to_form');

  $(".to_form").on("touchend, click", function (e) {
  e.preventDefault();
  $('body,html').animate({
    scrollTop: $('.zakaz').offset().top
  }, 400);
});
setTimeout(function () {
  var flag = true;
  $(window).mouseout(function (e) {
    if (e.pageY - $(window).scrollTop() < 1 && flag == true) {
      $('.demon_popup').fadeIn(300);
      flag = false;
    }
  })
}, 1000);
$('.demon_popup, .demon_close, .popup_btn').click(function () {
  $('.demon_popup').fadeOut(100);
});
$('.demon_popup_body').click(function (e) {
  e.stopPropagation();
});
$(".popup_btn").on("touchend, click",
  function (e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $('.zakaz').offset().top
    }, 400);
  });
});

/* */

$(document).ready(function() {
  $('[name="country"]').on('change', function() {
    var geoKey = $(this).find('option:selected').val();
    var data = $jsonData.prices[geoKey];
    var price = data.price;
    var oldPrice = data.old_price;
    var currency = data.currency;
    $("[value = "+geoKey+"]").attr("selected", true).siblings().attr('selected', false);
    $('.price_land_s1').text(price);
    $('.price_land_s2').text(oldPrice);
    $('.price_land_curr').text(currency);
  });
  $('a[href^="#"]').click(function (){
    var elementClick = $(this).attr("href");
    var destination = $(elementClick).offset().top - 60;
    jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
    return false;
  });

  lastpack(5, 60, 'lastpack');

});

/* */

var monthA = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
var d = new Date();
$('.enddate').text(d.getDate() + ' ' + monthA[d.getMonth()] + ' ' + d.getFullYear());

/* validation */

var domain = window.location.hostname;
var already = {
  startFilling: false,
  mistakeFilling: false,
  successFilling: false
};

var feed = {
  submit: function(e, elem, field) {
    var form = $(elem);
    var phone = form.find('[name=phone]').val();
    var name = form.find('[name=name]').val();
    var rephone = /^[0-9\-\+\(\) ]*$/i;
    var cookie_life = new Date(new Date().getTime() + 300 * 1000); // 5 мин

    $('.errorMessage').remove();

    if(!name.length || name.length < 3){
      e.preventDefault();
      return feed.errorMessage(form.find('[name=name]'), 'Вы не представились', field);
    }

    if(!phone.length || phone.length < 5){
      e.preventDefault();
      return feed.errorMessage(form.find('[name=phone]'), 'Вы не заполнили поле "Телефон"', field);
    }

    if(!rephone.test(phone)){
      e.preventDefault();
      return feed.errorMessage(form.find('[name=phone]'), 'Неверно заполнено поле "Телефон"', field);
    }

    formIsSubmitted = true;
    document.cookie = "formIsSubmitted=true; path=/; expires=" + cookie_life.toUTCString();

    feed.reachGoal("successFilling");
  },

  errorMessage: function(elem, msg, field) {

    if (field.length) {
      field.text(msg).slideDown(300);
    } else {
      $('<div class="errorMessage">' + msg + '</div>').appendTo('body').css({
        'left': $(elem).offset().left,
        'top': $(elem).offset().top + 30
      });
    }

    feed.reachGoal("mistakeFilling");

    return false;
  },

  reachGoal: function(goal) {
    try {
      var params = {};
      params[domain] = goal;

      if(already[goal] != true) {
        yaCounter22765945.reachGoal("formFilling", params);
        already[goal] = true;
      }
    } catch(e) {}
  }
};

$(document).ready(function(){
  $(document).on('submit', '.orderformcdn', function(e) {
    var $errField = $(this).find('.errField');
    feed.submit(e, this, $errField);
  });


  $('input[type="text"]').on('focus', function(){
    $('.errorMessage').remove();
    $('.errField').slideUp();
    feed.reachGoal("startFilling");
  });
});

/* */




