describe("jQuery Tabs", function() {
  var $container, $tabs, $tab, $panel;

  beforeEach(function() {
    loadFixtures("tabs.html");
    $container = $(".tabs").tabs();
    $tabs = $container.find("li");
  });

  it("just contains some tabs", function() {
    expect($tabs.length).toBeGreaterThan(0);
  });

  it("has 1st tab opened on load", function() {
    expect($("#panel-1")).not.toBeHidden();
  });

  it("has 2nd, 3rd and last panel closed on load", function() {
    expect($("#panel-2, #panel-3, #panel-4")).toBeHidden();
  });

  shared_examples_for("any clicked tab", function() {
    it("triggers tab:activate event", function() {
      spyOnEvent($container, "tab:activate");

      $tab.find("a").click();

      expect("tab:activate").toHaveBeenTriggeredOn($container);
    });

    // event.result == undefined for me, should be false
    xit("don't reload the page", function() {
      $tab.bind("click", function(event) {
        expect(event.result).toEqual(false);
      });

      $tab.find("a").click();
    });

    it("introduce itself", function() {
      $container.bind("tab:activate", function(event, activator) {
        expect($(activator)).toBe($tab);
      });

      $tab.find("a").click();
    });

    it("opens relative panel", function() {
      $tab.find("a").click();

      expect($panel).not.toBeHidden();
    });

    it("keep only one panel open", function() {
      $tab.find("a").click();

      $("#panel-1, #panel-2, #panel-3, #panel-4").not($panel).each(function(index, panel) {
        expect($(panel)).toBeHidden();
      });
    });

    it("marks tab as an active", function() {
      $tab.find("a").click();

      expect($tab).toHaveClass("active");
    });

    it("keeps only one tab as active", function() {
      $tab.find("a").click();

      expect($tabs.filter(".active").length).toEqual(1);
    });
  });

  describe("1st tab", function() {
    beforeEach(function() {
      $tab = $tabs.eq(0);
      $panel = $('#' + $tab.attr('data-panel'));
    });

    it_behaves_like("any clicked tab");
  });

  describe("2nd tab", function() {
    beforeEach(function() {
      $tab = $tabs.eq(1);
      $panel = $('#' + $tab.attr('data-panel'));
    });

    it_behaves_like("any clicked tab");
  });

  describe("Last tab", function() {
    beforeEach(function() {
      $tab = $tabs.eq(3);
      $panel = $('#' + $tab.attr('data-panel'));
    });

    it_behaves_like("any clicked tab");
  });
});
