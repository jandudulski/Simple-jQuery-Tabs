describe("jQuery Tabs with ajax support", function() {
  var $container, $first_tab, $first_panel, $remote_tab, $remote_panel;

  beforeEach(function() {
    loadFixtures("tabs_ajax.html");
    $container = $(".tabs").tabs();
    $first_tab = $("#tab-1").find("a");
    $first_panel = $("#panel-1");
    $remote_tab = $("#tab-2").find("a");
    $remote_panel = $("#panel-2");
  });

  describe("start", function() {
    it("loads content when starting tab is remote", function() {
      waitsFor(function() {
        return $first_panel.html().match(/Panel loaded by ajax/);
      }, "Ajax not loaded", 100);
    });
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

