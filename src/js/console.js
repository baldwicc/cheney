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
};