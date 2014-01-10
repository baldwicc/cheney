
$.fn.cheney = function(options) {
  if (!this.length || typeof options.tests === 'undefined') {
    return this;
  }
  cheney.options = options;
  cheney.addPopover($);
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
    testFailed : this.addItem,
    reset : true
  });
};

cheney.language = {
  severity : {
    severe : 'Severe',
    moderate : 'Moderate',
    suggestion: 'Suggestion'
  }
};

cheney.addItem = function(event) {
  if(event.element.data('cheney-error')) {
    cheney.addAdditionalItem(event.test, event.element);
    return;
  }
  event.element.data('cheney-error', true);
  if(event.element.css('display') == 'inline') {
    var $thisWrap = $('<span>').addClass('cheney-error');
  }
  else {
    var $thisWrap = $('<div>').addClass('cheney-error');
  }
  var $icon = $('<a>').attr('href', '#' + event.testName)
                      .addClass('cheney-icon')
                      .addClass('cheney')
                      .html(cheney.language.severity[event.severity]);
  $thisWrap.addClass('cheney-' + event.severity);
  event.element.wrap($thisWrap);
  $icon = event.element.parent('.cheney-error')
         .append($icon.clone())
         .find('.cheney-icon');
  $icon.data('cheney-title', [event.test.title.en]);
  $icon.data('cheney-content', [event.test.description.en]);
  $icon.popover({ trigger   : 'manual',
                  offset    : cheney.popoverOffset
                })
       .on({click : cheney.tooltip, focus : cheney.tooltip });
  
  if(event.element.get(0).tagName.toLowerCase() == 'img') {
    event.element.parent('.cheney-error')
           .css('height', event.element.height() + 'px')
           .css('display', 'inline-block');
  }
  cheney.total++;
};

cheney.addAdditionalItem = function(test, element) {
  var $icon = element.parent('.cheney-error').find('.cheney-icon');
  var title = $icon.data('cheney-title');
  if(!title) {
    return;
  }
  title.push(test.title);
  var content = $icon.data('cheney-content');
  content.push(test.body);
  $icon.data('cheney-title', title);
  $icon.data('cheney-content', content);
};

cheney.tooltip = function(event) {
  var $link = $(this);
  $('.cheney-icon').each(function() {
    if(!$(this).is($link)) {
      $(this).popover('hide');
    }
  });
  $link.popover('toggle');
  return false;
};