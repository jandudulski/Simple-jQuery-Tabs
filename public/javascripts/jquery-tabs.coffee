"use strict"
$ = jQuery

class Panel
  constructor: (@element, @remote = false) ->

  open: ->
    @element.show()

  close: ->
    @element.hide()

  load: (source) ->
    @element.load source

class Tab
  constructor: (@element) ->
    $panel = $("##{@element.attr('data-panel')}")
    @panel = new Panel($panel, @element.data("remote"))
    @panel.close() unless @isActive()

  listen: ($tabs) ->
    $tabs.bind "tab:activate", (event, activator, source) =>
      if @element.is(activator)
        @activate(source) unless @isActive()
      else
        @deactivate()

  isActive: ->
    @element.hasClass "active"

  activate: (source) ->
    @panel.load source if @panel.remote
    @element.addClass "active"
    @panel.open()

  deactivate: ->
    @element.removeClass "active"
    @panel.close()

class Tabs
  constructor: (@element) ->
    @register(@element.find("li"))
    @bindEvents ["click", "focus"]

  register: ($tabs) ->
    $container = @element
    $tabs.each (index, element) ->
      tab = new Tab($(element))
      tab.listen($container)

  bindEvents: (events) ->
    @bind event for event in events

  bind: (event_name) ->
    @element.delegate "a", event_name, (event_object) ->
      event_object.preventDefault()
      $this = $(event_object.currentTarget)
      $this.trigger "tab:activate", [$this.parent(), $this.attr("href")]

$.fn.tabs = ->
  @each ->
    $this = $(@)
    tabs = new Tabs($this)

    return $this
