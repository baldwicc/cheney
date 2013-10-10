/*! Cheney for Quail quailjs.org/cheney | quailjs.org/license */
(function($) {
$.fn.cheney = function(options) {
  if (!this.length) {
    return this;
  }
  cheney.options = options;

  cheney.html = this;
  cheney.run();
  
  return this;
};

var cheney = {};

cheney.options = {};

cheney.highlightElement = function(event) {
  var that = cheney;
  if (!event.element.hasClass('cheney-result')) {
    event.element.addClass('cheney-result')
         .addClass(event.severity);
    var $image = $('<img>')
                 .attr('alt', (typeof that.options.strings.severity[event.severity] !== 'undefined') ? that.options.strings.severity[event.severity] : event.severity)
                 .attr('src', that.options.iconPath + event.severity + '.png');
    var $link = $('<a>')
                .attr('href', '#cheney-console')
                .attr('role', 'command')
                .addClass('cheney-icon')
                .addClass(event.severity)
                .append($image);
    event.element.before($link);
    if(typeof that.options.clickEvent === 'undefined') {
      cheney.attachHint(event);
    }
    else {
      that.options.clickEvent(event);
    }
  }
  var test = that.settings.tests[event.testName].testId;
  /*if (typeof that.messages[test] == 'undefined') {
    $.getJSON(Drupal.settings.basePath + 'cheney-test/' + test + '/json', function(data) {
      that.messages[test] = data;
    });
  }*/
  var elementTests = event.element.data('cheney-tests') || { };
  elementTests[event.testName] = event.testName;
  event.element.add(event.element.prev($('cheney-icon'))).data('cheney-tests', elementTests);
    
};

cheney.attachHint = function(event, $context) {
  $context = $context || $('body');
  var that = this;
  event.element.add(event.element.prev($('.cheney-icon')))
               .click(function(event) {
                 var tests = $(this).data('cheney-tests');
                 that.errorConsole.showTests(tests);
                 $('html, body').animate({
                   scrollTop: $(this).offset().top
                 }, 10);
                 that.errorConsole.setCurrentElement($(this), $context);
                 event.preventDefault();
               });
};

cheney.cleanUpHighlight = function($context) {
  $context = $context || $('html');
  $context.find('.cheney-result').each(function() {
    $(this).removeClass('cheney-result')
           .removeClass('severe')
           .removeClass('moderate')
           .removeClass('suggestion');
  });
  $context.find('.cheney-icon, .cheney-icon-current').remove();
};
cheney.errorConsole = {

  $console : false,

  init : function() {
    if($('#cheney-console').length) {
      return;
    }
    var that = this;
    $('body').append('<div id="cheney-console" class="element-invisible">');
    this.$console = $('#cheney-console');
    this.$console.append('<a name="cheney-console">');
    this.$console.append('<div class="cheney-console-content" role="marquee">');
    var $close = this.$console.append('<a role="button" class="close-console" href="#close" title="' +
                  Drupal.t('close accessibility console') +
                  '">&times;</a>');
    $close.click(function() {
      that.hide()
      return false;
    });
  },

  show : function() {
    this.init();
    this.$console.removeClass('element-invisible');
    $('body').trigger('cheney-console-show');
  },

  hide : function() {
    this.init();
    this.$console.addClass('element-invisible');
    $('body').trigger('cheney-console-hide');
  },

  addTest : function(test) {
    this.$console.append('<h3>' + cheney.messages[test].title + '</h3>');
  },

  showTests : function(tests) {
    var that = this;
    that.init();
    var $content = that.$console.find('.cheney-console-content');
    $content.html('');
    $.each(tests, function(index, test) {
      $content.append('<h3>' + cheney.messages[test].title + '</h3>');
      $content.append(cheney.messages[test].content);
    });
    that.show();
  },

  setCurrentElement : function(element, $context) {
    $context = $context || $('body');
    $context.find('.cheney-icon-current').remove();
    var $image = $('<img>')
         .attr('alt', Drupal.t('Current element'))
         .attr('role', 'note')
         .addClass('cheney-icon-current')
         .attr('src', cheney.options.iconPath + 'highlighted.png');
    element.prev('.cheney-icon').before($image);
  }
};})(jQuery)