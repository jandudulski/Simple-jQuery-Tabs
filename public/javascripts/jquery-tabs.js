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
      this.element.removeClass("active");
      return this.panel.close();
    };
    return Tab;
  })();
  Tabs = (function() {
    function Tabs(element) {
      this.element = element;
      this.register(this.element.find("li"));
      this.bindEvents(["click", "focus"]);
    }
    Tabs.prototype.register = function($tabs) {
      var $container;
      $container = this.element;
      return $tabs.each(function(index, element) {
        var tab;
        tab = new Tab($(element));
        return tab.listen($container);
      });
    };
    Tabs.prototype.bindEvents = function(events) {
      var event, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        _results.push(this.bind(event));
      }
      return _results;
    };
    Tabs.prototype.bind = function(event_name) {
      return this.element.delegate("a", event_name, function(event_object) {
        var $this;
        event_object.preventDefault();
        $this = $(event_object.currentTarget);
        return $this.trigger("tab:activate", $this.parent());
      });
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
