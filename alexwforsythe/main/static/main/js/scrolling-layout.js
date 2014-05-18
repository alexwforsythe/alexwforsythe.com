// Modified cufonized menu by Manoela Ilic : http://tympanus.net/codrops/
$(function () {
    // getScrollbarWidth by David Walsh : http://davidwalsh.name/detect-scrollbar-width
    function getScrollbarWidth() {
        // Create the measurement node
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "scrollbar-measure";
        document.body.appendChild(scrollDiv);

        // Get the scrollbar width
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        // Delete the DIV
        document.body.removeChild(scrollDiv);

        return scrollbarWidth;
    }
    // Set the right position of the sliding menu
    $(".sliding-menu").css('right', getScrollbarWidth());

    Cufon.replace('a').CSS.ready(function () {
        var $menu = $("#sliding-menu");

        /**
         * the first item in the menu,
         * which is selected by default
         */
        var $selected = $menu.find('li:first');

        /**
         * this is the absolute element,
         * that is going to move across the menu items
         * it has the width of the selected item
         * and the top is the distance from the item to the top
         */
        var $moving = $('<li />', {
            'class': 'move',
            'top': $selected[0].offsetTop + 'px',
            'width': $selected[0].offsetWidth + 'px'
        });

        /**
         * append the absolute div to the menu;
         * when we mouse out from the menu
         * the absolute div moves to the top (like initially);
         * when hovering the items of the menu, we move it to its position
         */
        $menu.bind('mouseleave', function () {
            moveTo($selected, 400);
        })
            .append($moving)
            .find('li')
            .not('.move')
            .bind('mouseenter', function () {
                var $this = $(this);
                var offsetLeft = $this.offset().left - 20;
                // move the absolute div to this item
                moveTo($this, 400);
            })
            .bind('mouseleave', function () {
                var $this = $(this);
                var offsetLeft = $this.offset().left - 20;
            });

        /**
         * moves the absolute div,
         * with a certain speed,
         * to the position of $elem
         */
        function moveTo($elem, speed) {
            $moving.stop(true).animate({
                top: $elem[0].offsetTop + 'px',
                width: $elem[0].offsetWidth + 'px'
            }, speed, 'easeOutExpo');
        }

        // jQuery.panelSnap
        var panels = ["first", "second", "third", "fourth"];

        var options = {
            $menu: $('.menu'),
            // menuSelector: 'a',
            // panelSelector: 'section',
            // namespace: '.panelSnap',
            onSnapStart: function () {
            },
            onSnapFinish: function () {
            },
            onActivate: function () {
                $dataPanel = $('.panel-container .active').attr('data-panel');
                // todo: custom attr selector doesn't work
                // $menuItem = ".sliding-menu a[data-panel='" + $dataPanel + "']";
                // $selected = $($menuItem);
                var $child = panels.indexOf($dataPanel) + 1;
                $selected = $(".sliding-menu li:nth-child(" + $child + ")");
                moveTo($selected, 400);
            },
            directionThreshold: 1,
            slideSpeed: 400,
            keyboardNavigation: {
                enabled: true,
                nextPanelKey: 40,
                previousPanelKey: 38,
                wrapAround: false
            }
        };

        $('.panel-container').panelSnap(options);
    });
});
