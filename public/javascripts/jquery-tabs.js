(function() {
  "use strict";  var $, Panel, Tab, Tabs;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  $ = jQuery;
  Panel = (function() {
    function Panel(element, open) {
      this.element = element;
      if (open == null) {
        open = false;
      }
      if (!open) {
        this.close();
      }
    }
    Panel.prototype.open = function() {
      return this.element.show();
    };
    Panel.prototype.close = function() {
      return this.element.hide();
    };
    return Panel;
  })();
  Tab = (function() {
    function Tab(element) {
      var $panel;
      this.element = element;
      $panel = $("#" + (this.element.attr('data-panel')));
      this.panel = new Panel($panel, this.isActive());
    }
    Tab.prototype.listen = function($tabs) {
      return $tabs.bind("tab:activate", __bind(function(event, activator) {
        if (this.element.is(activator)) {
          if (!this.isActive()) {
            return this.activate();
          }
        } else {
          return this.deactivate();
        }
      }, this));
    };
    Tab.prototype.isActive = function() {
      return this.element.hasClass("active");
    };
    Tab.prototype.activate = function() {
      this.element.addClass("active");
      return this.panel.open();
    };
    Tab.prototype.deactivate = function() {
      return this.element.removeClass("active");
    };
    return Tab;
  })();
  Tabs = (function() {
    function Tabs(element) {
      this.element = element;
      this.register(this.element.find("li"));
      this.bindTabs();
    }
    Tabs.prototype.register = function($tabs) {
      return $tabs.each(__bind(function(index, element) {
        var tab;
        tab = new Tab($(element));
        return tab.listen(this.element);
      }, this));
    };
    Tabs.prototype.bindTabs = function() {
      return this.element.delegate("a", "click", __bind(function(event) {
        var $this;
        $this = $(event.currentTarget);
        $this.trigger("tab:activate", $this.parent());
        return false;
      }, this));
    };
    return Tabs;
  })();
  $.fn.tabs = function() {
    return this.each(function() {
      var $this, tabs;
      $this = $(this);
      tabs = new Tabs($this);
      return $this;
    });
  };
}).call(this);
