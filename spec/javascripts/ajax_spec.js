describe("jQuery Tabs with ajax support", function() {
  var $container, $tabs, $remote_tab, $remote_panel;

  beforeEach(function() {
    loadFixtures("tabs_ajax.html");
    $container = $(".tabs").tabs();
    $remote_tab = $container.find("li[data-remote]").find("a");
    $remote_panel = $("#panel-2");
  });

  describe("click on remote tab", function() {
    it("loads proper content", function() {
      $remote_tab.click();

      waitsFor(function() {
        return $remote_panel.html().match(/Panel loaded by ajax/);
      }, "Ajax not loaded", 100);
    });
  });
});

