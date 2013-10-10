
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