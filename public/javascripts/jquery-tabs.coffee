"use strict"
$ = jQuery

class Panel
  constructor: (@element, open = false) ->
    @close() unless open

  open: ->
    @element.show()

  close: ->
    console.log("close called")
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
    @bindTabs()

  register: ($tabs) ->
    $container = @element
    $tabs.each (index, element) ->
      tab = new Tab($(element))
      tab.listen($container)

  bindTabs: ->
    @element.delegate "a", "click", (event) ->
      $this = $(event.currentTarget)
      $this.trigger "tab:activate", $this.parent()
      # prevent page reloading
      return false

$.fn.tabs = ->
  @each ->
    $this = $(@)
    tabs = new Tabs($this)

    return $this
