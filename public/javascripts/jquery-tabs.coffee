"use strict"
$ = jQuery

class Panel
  constructor: (@element, open = false) ->
    @close() unless open

  open: ->
    @element.show()

  close: ->
    @element.hide()

class Tab
  constructor: (@element) ->
    $panel = $("##{@element.attr('data-panel')}")
    @panel = new Panel($panel, @isActive())

  listen: ($tabs) ->
    $tabs.bind "tab:activate", (event, activator) =>
      if @element.is(activator)
        @activate() unless @isActive()
      else
        @deactivate()

  isActive: ->
    @element.hasClass "active"

  activate: ->
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
      $this.trigger "tab:activate", $this.parent()

$.fn.tabs = ->
  @each ->
    $this = $(@)
    tabs = new Tabs($this)

    return $this
