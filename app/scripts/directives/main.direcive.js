/**
 * Created by kanglg on 16/5/16.
 */
'use strict';
(function() {
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
  var lteLayoutDirective = ['$window', function($window) {
    return {
      restrict: 'A',
      require: '?^lte',
      link: function(scope, element, attr, ctrl) {
        var options = ctrl.$options;
        var layout = {
          activate: function () {
            var _this = this;
            _this.fix();
            _this.fixSidebar();
            $(window, ".wrapper").resize(function () {
              _this.fix();
              _this.fixSidebar();
            });
          },
          fix: function () {
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
                if (controlSidebar.height() > postSetWidth)
                  $(".content-wrapper, .right-side").css('min-height', controlSidebar.height());
              }
            }
          },
          fixSidebar: function () {
            //Make sure the body tag has the .fixed clclassass
            if (!$("body").hasClass("fixed")) {
              if (typeof $.fn.slimScroll != 'undefined') {
                $(".sidebar").slimScroll({destroy: true}).height("auto");
              }
              return;
            } else if (typeof $.fn.slimScroll == 'undefined' && window.console) {
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
        layout.activate(options);
      }
    }
  }];
  var lteController = ['$scope', '$attrs', '_', function($scope, $attrs, _) {
    var $options = $scope.$eval($attrs.lte) || {};
    this.$options = _.extend({}, options, $options);
  }];
  var lteDirective = [function() {
    return {
      restrict: 'A',
      controller: lteController
    }
  }];

  angular.module('angularApp')
    .directive('lteLayout', lteLayoutDirective)
    .directive('lte', lteDirective);
})();
