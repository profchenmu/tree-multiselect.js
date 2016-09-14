QUnit.module("General", {
  beforeEach: function(assert) {
    var select = document.createElement("select");
    select.setAttribute("multiple", "multiple");
    $("div#qunit-fixture").append(select);
    assert.equal($("select").length, 1);
  }
});

QUnit.test("Return value returns tree instead of select element", function(assert) {
  $("select").append("<option value='one' data-section='test'>One</option>");
  $("select").append("<option value='two' data-section='test'>Two</option>");
  $("select").append("<option value='three' data-section='test'>Three</option>");
  var elements = $("select").treeMultiselect();

  
  elements.each(function(_, el) {
    assert.notOk($(el).is('select'));
    assert.ok($(el).hasClass('tree-multiselect'));
  });
});

