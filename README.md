# Simple jQuery Tabs

This is very simple jQuery tabs plugin made mostly when learning [coffee-script](http://jashkenas.github.com/coffee-script/)
and [jasmine](http://pivotal.github.com/jasmine/).

## Installation

Download jquery-tabs.min.js or jquery-tabs.js and put into your's scripts.

To enable plugin your tabs list elements needs `data-target` attribute with
id of target panel, eg.:

```html
<ul class="tabs">
  <li data-panel="panel-1"><a href="#">tab 1</a></li>
  <li data-panel="panel-2"><a href="#">tab 2</a></li>
</ul>
<div id="panel-1">content</div>
<div id="panel-2">content</div>
```

Then add on document load `$(".tabs").tabs()` and... that's all!

## Requirements

[jQuery 1.6](http://jquery.com/) or newer
