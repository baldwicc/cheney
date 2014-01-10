
$.fn.cheney = function(options) {
  if (!this.length || typeof options.tests === 'undefined') {
    return this;
  }
  cheney.options = options;

  cheney.html = this;
  cheney.run();
  
  return this;
};

var cheney = {};

cheney.options = {};

cheney.run = function() {
  var that = this;
  if(typeof this.options.tests === 'string') {
    $.ajax({ url : this.options.tests,
       async : false,
       dataType : 'json',
       success : function(data) {
          if(typeof data === 'object') {
            that.options.tests = data;
          }
      }});
  }
  that.html.quail({ guideline : this.options.guideline,
    accessibilityTests : this.options.tests,
    testFailed : this.highlightElement,
    reset : true
  });
};

cheney.highlightElement = function(event) {
  var that = cheney;
  if (!event.element.hasClass('cheney-result')) {
    event.element.addClass('cheney-result')
         .addClass(event.severity);
    var $link = $('<a>')
                 .html(event.severity)
                 .attr('href', '#cheney-console')
                 .attr('role', 'command')
                 .addClass('cheney-indicator')
                 .addClass(event.severity);
    event.element.before($link);
    if(typeof that.options.clickEvent === 'undefined') {
      cheney.attachHint(event);
    }
    else {
      that.options.clickEvent(event);
    }
  }
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