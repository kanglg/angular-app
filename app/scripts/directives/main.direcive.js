/**
 * Created by kanglg on 16/5/16.
 */
'use strict';
(function () {
  var options = {
    //Add slimscroll to navbar menus
    //This requires you to load the slimscroll plugin
    //in every page before app.js
    navbarMenuSlimscroll: true,
    navbarMenuSlimscrollWidth: "3px", //The width of the scroll bar
    navbarMenuHeight: "200px", //The height of the inner menu
    //General animation speed for JS animated elements such as box collapse/expand and
    //sidebar treeview slide up/down. This options accepts an integer as milliseconds,
    //'fast', 'normal', or 'slow'
    animationSpeed: 500,
    //Sidebar push menu toggle button selector
    sidebarToggleSelector: "[data-toggle='offcanvas']",
    //Activate sidebar push menu
    sidebarPushMenu: true,
    //Activate sidebar slimscroll if the fixed layout is set (requires SlimScroll Plugin)
    sidebarSlimScroll: true,
    //Enable sidebar expand on hover effect for sidebar mini
    //This option is forced to true if both the fixed layout and sidebar mini
    //are used together
    sidebarExpandOnHover: false,
    //BoxRefresh Plugin
    enableBoxRefresh: true,
    //Bootstrap.js tooltip
    enableBSToppltip: true,
    BSTooltipSelector: "[data-toggle='tooltip']",
    //Enable Fast Click. Fastclick.js creates a more
    //native touch experience with touch devices. If you
    //choose to enable the plugin, make sure you load the script
    //before AdminLTE's app.js
    enableFastclick: true,
    //Control Sidebar Options
    enableControlSidebar: true,
    controlSidebarOptions: {
      //Which button should trigger the open/close event
      toggleBtnSelector: "[data-toggle='control-sidebar']",
      //The sidebar selector
      selector: ".control-sidebar",
      //Enable slide over content
      slide: true
    },
    //Box Widget Plugin. Enable this plugin
    //to allow boxes to be collapsed and/or removed
    enableBoxWidget: true,
    //Box Widget plugin options
    boxWidgetOptions: {
      boxWidgetIcons: {
        //Collapse icon
        collapse: 'fa-minus',
        //Open icon
        open: 'fa-plus',
        //Remove icon
        remove: 'fa-times'
      },
      boxWidgetSelectors: {
        //Remove button selector
        remove: '[data-widget="remove"]',
        //Collapse button selector
        collapse: '[data-widget="collapse"]'
      }
    },
    //Direct Chat plugin options
    directChat: {
      //Enable direct chat by default
      enable: true,
      //The button to open and close the chat contacts pane
      contactToggleSelector: '[data-widget="chat-pane-toggle"]'
    },
    //Define the set of colors to use globally around the website
    colors: {
      lightBlue: "#3c8dbc",
      red: "#f56954",
      green: "#00a65a",
      aqua: "#00c0ef",
      yellow: "#f39c12",
      blue: "#0073b7",
      navy: "#001F3F",
      teal: "#39CCCC",
      olive: "#3D9970",
      lime: "#01FF70",
      orange: "#FF851B",
      fuchsia: "#F012BE",
      purple: "#8E24AA",
      maroon: "#D81B60",
      black: "#222222",
      gray: "#d2d6de"
    },
    //The standard screen sizes that bootstrap uses.
    //If you change these in the variables.less file, change
    //them here too.
    screenSizes: {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200
    }
  };
  var lteLayoutDirective = [function () {
    var $ = angular.element;
    return {
      restrict: 'A',
      require: ['?^lte', 'lteLayout'],
      controller: [function () {
        this.$layout = {
          activate: function (options) {
            var _this = this;
            _this.fix(options);
            _this.fixSidebar(options);
            $(window, ".wrapper").resize(function () {
              _this.fix(options);
              _this.fixSidebar(options);
            });
          },
          fix: function (options) {
            //Get window height and the wrapper height
            var neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
            var window_height = $(window).height();
            var sidebar_height = $(".sidebar").height();
            //Set the min-height of the content and sidebar based on the
            //the height of the document.
            if ($("body").hasClass("fixed")) {
              $(".content-wrapper, .right-side").css('min-height', window_height - $('.main-footer').outerHeight());
            } else {
              var postSetWidth;
              if (window_height >= sidebar_height) {
                $(".content-wrapper, .right-side").css('min-height', window_height - neg);
                postSetWidth = window_height - neg;
              } else {
                $(".content-wrapper, .right-side").css('min-height', sidebar_height);
                postSetWidth = sidebar_height;
              }

              //Fix for the control sidebar height
              var controlSidebar = $(options.controlSidebarOptions.selector);
              if (typeof controlSidebar !== "undefined") {
                if (controlSidebar.height() > postSetWidth) {
                  $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
                }
              }
            }
          },
          fixSidebar: function (options) {
            //Make sure the body tag has the .fixed clclassass
            if (!$("body").hasClass("fixed")) {
              if (typeof $.fn.slimScroll !== 'undefined') {
                $(".sidebar").slimScroll({destroy: true}).height("auto");
              }
              return;
            } else if (typeof $.fn.slimScroll === 'undefined' && window.console) {
              window.console.error("Error: the fixed layout requires the slimscroll plugin!");
            }
            //Enable slimscroll for fixed layout
            if (options.sidebarSlimScroll) {
              if (typeof $.fn.slimScroll != 'undefined') {
                //Destroy if it exists
                $(".sidebar").slimScroll({destroy: true}).height("auto");
                //Add slimscroll
                $(".sidebar").slimscroll({
                  height: ($(window).height() - $(".main-header").height()) + "px",
                  color: "rgba(0,0,0,0.2)",
                  size: "3px"
                });
              }
            }
          }
        };
      }],
      link: function (scope, element, attr, ctrls) {
        var options = ctrls[0].$options;
        var layout = ctrls[1].$layout;
        //Fix for IE page transitions
        $("body").removeClass("hold-transition");
        layout.activate(options);
        scope.$watch(options.sidebarSlimScroll, function () {
          layout.fix(options);
          layout.fixSidebar(options);
        });
      }
    };
  }];
  var lteController = ['$scope', '$attrs', '_', function ($scope, $attrs, _) {
    var $options = $scope.$eval($attrs.lte) || {};
    this.$options = _.extend({}, options, $options);
  }];
  var lteDirective = [function () {
    return {
      restrict: 'A',
      controller: lteController
    }
  }];
  var lteSidebarDirective = [function () {
    return {
      restrict: 'A',
      require: ['?^lte', '?^lteLayout'],
      link: function (scope, element, attrs, ctrls) {
        var $options = ctrls[0].$options;
        var $layout = ctrls[1].$layout;
        var animationSpeed = $options.animationSpeed;
        element.on('click', 'li a', function (e) {
          var $this = $(this);
          var checkElement = $this.next();
          //Check if the next element is a menu and is visible
          if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
            //Close the menu
            checkElement.slideUp(animationSpeed, function () {
              checkElement.removeClass('menu-open');
              //Fix the layout in case the sidebar stretches over the height of the window
              //_this.layout.fix();
            });
            checkElement.parent("li").removeClass("active");
          }//If the menu is not visible
          else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
            //Get the parent menu
            var parent = $this.parents('ul').first();
            //Close all open menus within the parent
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            //Remove the menu-open class from the parent
            ul.removeClass('menu-open');
            //Get the parent li
            var parent_li = $this.parent("li");

            //Open the target menu and add the menu-open class
            checkElement.slideDown(animationSpeed, function () {
              //Add the class active to the parent li
              checkElement.addClass('menu-open');
              parent.find('li.active').removeClass('active');
              parent_li.addClass('active');
              //Fix the layout in case the sidebar stretches over the height of the window
              $layout.fix($options);
            });
          }
          //if this isn't a link, prevent the page from being redirected
          if (checkElement.is('.treeview-menu')) {
            e.preventDefault();
          }
        });
      }
    }
  }];

  var ltePushmenuDirective = ['$window', function ($window) {
    var $ = angular.element;
    return {
      restrict: 'A',
      require: '?^lte',
      link: function (scope, element, attrs, ctrl) {
        var $options = ctrl.$options;
        //Get the screen sizes
        var screenSizes = $options.screenSizes;
        //Enable sidebar toggle
        element.on('click', function (e) {
          e.preventDefault();
          //Enable sidebar push menu
          if ($($window).width() > (screenSizes.sm - 1)) {
            if ($("body").hasClass('sidebar-collapse')) {
              $("body").removeClass('sidebar-collapse').trigger('expanded.pushMenu');
            } else {
              $("body").addClass('sidebar-collapse').trigger('collapsed.pushMenu');
            }
          }
          //Handle sidebar push menu for small screens
          else {
            if ($("body").hasClass('sidebar-open')) {
              $("body").removeClass('sidebar-open').removeClass('sidebar-collapse').trigger('collapsed.pushMenu');
            } else {
              $("body").addClass('sidebar-open').trigger('expanded.pushMenu');
            }
          }
        });
        $(".content-wrapper").click(function () {
          //Enable hide menu when clicking on the content-wrapper on small screens
          if ($($window).width() <= (screenSizes.sm - 1) && $("body").hasClass("sidebar-open")) {
            $("body").removeClass('sidebar-open');
          }
        });

        var expand = function () {
          $("body").removeClass('sidebar-collapse').addClass('sidebar-expanded-on-hover');
        };

        var collapse = function () {
          if ($('body').hasClass('sidebar-expanded-on-hover')) {
            $('body').removeClass('sidebar-expanded-on-hover').addClass('sidebar-collapse');
          }
        };

        var expandOnHover = function() {
          var screenWidth = $options.screenSizes.sm - 1;
          //Expand sidebar on hover
          $('.main-sidebar').hover(function () {
            if ($('body').hasClass('sidebar-mini')
              && $("body").hasClass('sidebar-collapse')
              && $window.width() > screenWidth) {
              expand();
            }
          }, function () {
            if ($('body').hasClass('sidebar-mini')
              && $('body').hasClass('sidebar-expanded-on-hover')
              && $window.width() > screenWidth) {
              collapse();
            }
          });
        };

        //Enable expand on hover for sidebar mini
        if ($options.sidebarExpandOnHover
          || ($('body').hasClass('fixed')
          && $('body').hasClass('sidebar-mini'))) {
          expandOnHover();
        }
      }
    }
  }];

  angular.module('angularApp')
    .directive('lteLayout', lteLayoutDirective)
    .directive('lteSidebar', lteSidebarDirective)
    .directive('ltePushmenu', ltePushmenuDirective)
    .directive('lte', lteDirective);
})();
