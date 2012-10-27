// Generated by CoffeeScript 1.3.3
(function() {
  var hide_already_selected_sections;

  hide_already_selected_sections = function() {
    var selected_section_ids;
    selected_section_ids = [];
    $(".selected-sections .section").each(function() {
      return selected_section_ids.push($(this).data('section-id'));
    });
    return $(".available-sections-table .section").each(function() {
      var el, section_id;
      el = $(this);
      section_id = el.data('section-id');
      if (selected_section_ids.indexOf(section_id) !== -1) {
        return el.hide();
      } else {
        return el.show();
      }
    });
  };

  $(document).on("ready pjax:success", function() {
    return hide_already_selected_sections();
  });

  $(document).on("click", ".section .remove-button", function(e) {
    var el;
    e.preventDefault();
    el = $(this);
    el.button('loading');
    return $.ajax({
      url: el.data('href'),
      type: "DELETE",
      success: function(data) {
        var new_selected_sections;
        new_selected_sections = $(data.selected_sections_html);
        $(".selected-sections").replaceWith(new_selected_sections);
        return hide_already_selected_sections();
      }
    });
  });

  $(document).on("click", ".section .add-button", function(e) {
    var el;
    e.preventDefault();
    el = $(this);
    el.button('loading');
    return $.ajax({
      url: el.data('href'),
      type: "POST",
      success: function(data) {
        var new_selected_sections;
        new_selected_sections = $(data.selected_sections_html);
        $(".selected-sections").replaceWith(new_selected_sections);
        el.button('reset');
        return hide_already_selected_sections();
      }
    });
  });

}).call(this);