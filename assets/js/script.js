$(document).ready(function () {
  // load first thumbnail images of first label
  setTimeout(function () {
    $("#grey-green").trigger("click");
  }, 500);

  // label accordion
  $(document).on("click", ".label-head", function () {
    if ($(this).hasClass("close")) {
      $(this).siblings(".label-content").slideDown();
      $(this)
        .closest(".label")
        .siblings(".label")
        .find(".label-content")
        .slideUp();
      $(this).removeClass("close");
      $(this)
        .closest(".label")
        .siblings(".label")
        .find(".label-head")
        .addClass("close");
    }
  });

  // thumbnail click to show the images in the preview section
  $(document).on("click", ".label-content a", function () {
    $(this).closest(".label-container").find("a").removeClass("active");
    $(this).addClass("active");

    $("#p-title").text($(this).attr("title"));

    const url =
      window.location.href.replace("/index.html", "") +
      "/assets/images/" +
      $(this).attr("id");
    let images = "";

    $.get(url, function (data, status) {
      $(data)
        .find("#files li")
        .each(function (index, elem) {
          if (index != 0) {
            images +=
              "<li><img src=" + $(this).find("a").attr("href") + " /></li>";
          }
        });
      $("#preview-thumnails").html(images);
      $("#preview-thumnails li:eq(2) img").trigger("click");
    });
  });

  // click on thumbnail to preview it
  $(document).on("click", "#preview-thumnails img", function () {
    $(this).parent("li").siblings("li").removeClass("active");
    $(this).parent("li").addClass("active");

    $("#previewImg").attr("src", $(this).attr("src"));
  });

  // mouse scroll of preview images
  let clicked = false,
    clickX;
  $("#preview-thumnails").on({
    mousemove: function (e) {
      clicked && updateScrollPos(e);
    },
    mousedown: function (e) {
      clicked = true;
      clickX = e.pageX;
    },
    mouseup: function () {
      clicked = false;
      $(this).css("cursor", "grab");
    },
  });

  const updateScrollPos = function (e) {
    $(this).css("cursor", "grabbing");
    $("#preview-thumnails").scrollLeft(
      $("#preview-thumnails").scrollLeft() + (clickX - e.pageX)
    );
  };
});
