$(document).ready(function () {
  // MagnificPopup
  var magnifPopup = function () {
    console.log("this", this);
    $(".popup-image").magnificPopup({
      // type: this.type,
      // type: "iframe",
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-with-zoom",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: "ease-in-out", // CSS transition easing function

        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
      callbacks: {
        elementParse: function (item) {
          // the class name
          if (item.el.context.className == "popup-image video-link") {
            item.type = "iframe";
          } else {
            item.type = "image";
          }
        },
      },
    });
  };

  // Call the functions
  magnifPopup();

  // $(".popup-image").magnificPopup({
  //   delegate: "a",
  //   type: "image",
  //   tLoading: "Loading image #%curr%...",
  //   mainClass: "mfp-img-mobile",
  //   gallery: {
  //     enabled: true,
  //     navigateByImgClick: true,
  //     preload: [0, 1], // Will preload 0 - before current, and 1 after the current image
  //   },
  //   image: {
  //     tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
  //   },
  //   callbacks: {
  //     elementParse: function (item) {
  //       // the class name
  //       if (item.el.context.className == "video-link") {
  //         item.type = "iframe";
  //       } else {
  //         item.type = "image";
  //       }
  //     },
  //   },
  // });
});
