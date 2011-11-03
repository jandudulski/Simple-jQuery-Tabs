describe("jQuery Tabs with ajax support", function() {
  var $container, $first_tab, $remote_tab, $remote_panel;

  beforeEach(function() {
    loadFixtures("tabs_ajax.html");
    $container = $(".tabs").tabs();
    $first_tab = $container.find(".active").find("a");
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

    it("cashes loaded content", function() {
      spyOn($, "ajax").andCallThrough();

      $remote_tab.click();
      $first_tab.click();
      $remote_tab.click();

      expect($.ajax.callCount).toBe(1);
    });
  });
});

