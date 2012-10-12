// Generated by CoffeeScript 1.3.3
(function() {

  $(document).on("click", ".bid .unstar-button, .bid .star-button", function() {
    var action, bid;
    action = $(this).hasClass('unstar-button') ? "0" : "1";
    bid = $(this).closest(".bid");
    return $.ajax({
      url: "/projects/" + bid.data('project-id') + "/bids/" + bid.data('bid-id') + "/star",
      data: {
        starred: action
      },
      type: "GET",
      success: function(data) {
        if (data.starred === '0') {
          return bid.find(".star-td").removeClass("starred");
        } else {
          return bid.find(".star-td").addClass("starred");
        }
      }
    });
  });

  $(document).on('show', '.bid-details .collapse', function() {
    var bid_id, data_el;
    data_el = $(this).closest("[data-bid-id]");
    bid_id = data_el.data('bid-id');
    return Rfpez.view_notification_payload('bid', bid_id);
  });

  $(document).on("click", ".undismiss-button", function() {
    var bid, bid_id, data_el, el, project_id;
    el = $(this);
    bid = el.closest(".bid");
    data_el = el.closest("[data-bid-id]");
    project_id = data_el.data('project-id');
    bid_id = data_el.data('bid-id');
    return $.ajax({
      url: "/projects/" + project_id + "/bids/" + bid_id + "/dismiss",
      type: "GET",
      success: function(data) {
        var new_bid;
        if (data.status === "success") {
          if (el.data('move-to-table')) {
            new_bid = $(data.html);
            bid.remove();
            return $(".bids-table.open-bids > thead").after(new_bid);
          } else {
            return window.location.reload();
          }
        }
      }
    });
  });

  $(document).on("click", ".show-dismiss-modal", function() {
    var bid, bid_id, data_el, el, modal, project_id, vendor_company_name;
    el = $(this);
    bid = el.closest(".bid");
    data_el = el.closest("[data-bid-id]");
    project_id = data_el.data('project-id');
    bid_id = data_el.data('bid-id');
    vendor_company_name = data_el.data('vendor-company-name');
    modal = $("#dismiss-modal");
    modal.find(".company-name").text(vendor_company_name);
    modal.find("textarea").val("");
    modal.find(".dismiss-btn").button('reset');
    modal.modal('show');
    modal.off(".rfpez-dismiss");
    return modal.on("submit.rfpez-dismiss", "form", function(e) {
      e.preventDefault();
      $(this).find(".dismiss-btn").button('loading');
      return $.ajax({
        url: "/projects/" + project_id + "/bids/" + bid_id + "/dismiss",
        data: {
          reason: modal.find("select[name=reason]").val(),
          explanation: modal.find("textarea[name=explanation]").val()
        },
        type: "GET",
        success: function(data) {
          var new_bid;
          if (data.status === "already dismissed" || "success") {
            modal.modal('hide');
            if (el.data('move-to-table')) {
              bid.remove();
              new_bid = $(data.html);
              return $(".bids-table.dismissed-bids > thead").after(new_bid);
            } else {
              return window.location.reload();
            }
          }
        }
      });
    });
  });

}).call(this);
