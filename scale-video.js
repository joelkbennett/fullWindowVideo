/**
 * Created by Joel on 06/01/14.
 */

(function(){
    'use strict';

     var scaleVideoResize = function(coverElem, coverRatio, navHeight) {
        var viewport = $(window),
            windowWidth = viewport.width(),
            windowHeight = viewport.height(),
            windowRatio = windowWidth / windowHeight; // aspect ratio of the window, as it changes

        $('.video-layer').height(windowHeight - navHeight); // positions the nav-bar

        if ( coverRatio > windowRatio ) {
            // if the aspect ratio of the video is bigger than the window
            var newWidth = coverRatio * windowHeight,
                newLeftMargin = ((newWidth - windowWidth) / 2) * -1;

            coverElem.height(windowHeight)
                .width(newWidth)
                .css('margin-left', newLeftMargin)
                .css('margin-top', 0);
        } else {
            // if the aspect ratio of the video is smaller than the window
            var newHeight = windowWidth / coverRatio,
                newTopMargin = ((newHeight - windowHeight) / 2) * -1; // var for negative margins

            // Set the width based on the the width of the window
            coverElem.width(windowWidth)
                .height(newHeight)
                .css('margin-top', newTopMargin)
                .css('margin-left', 0);
        }
    };

    var scaleVideoBind = function() {
        // Grab the cover video and determine the aspect ratio

        $('#cover').bind("loadedmetadata", function() {
            var coverElem = $('#cover'),
                coverWidth = this.videoWidth,
                coverHeight = this.videoHeight,
                coverRatio = coverWidth / coverHeight,
                navHeight = $('#navigation').height();

            scaleVideoResize(coverElem, coverRatio, navHeight);

            $(window).on('resize', function() {
                scaleVideoResize(coverElem, coverRatio, navHeight);
            });
        });
    };

    scaleVideoBind();
})();