/**
 * cbpFixedScrollLayout.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpFixedScrollLayout = (function () {

    // cache and initialize some values
    var config = {
        // the cbp-fbscroller's sections
        $sections: $('#cbp-fbscroller > section'),
        // the navigation links
        $navlinks: $('#cbp-fbscroller > nav:first > ul > li'),
        // index of current link / section
        currentLink: 0,
        // the body element
        $body: $('html, body'),
        // the body animation speed
        animspeed: 650,
        // the body animation easing (jquery easing)
        animeasing: 'easeInOutExpo'
    };


    // modified cufonized fly-out menu from codrops.com
    var $menu = $("#slidingMenu");

    /**
     * the first item in the menu,
     * which is selected by default
     */
    var $selected = config.$navlinks.eq(config.currentLink);

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
     * each sliding div (descriptions) will have the same top
     * as the corresponding item in the menu
     */
//    $('#slidingMenuDesc > div').each(function(i){
//        var $this = $(this);
//        $this.css('top',$menu.find('li:nth-child('+parseInt(i+2)+')')[0].offsetTop + 'px');
//    });

    /**
     * moves the absolute div,
     * with a certain speed,
     * to the position of $elem
     */
    function moveTo($elem, speed) {
//        console.log('moveTo selected: ' + config.currentLink);
        $moving.stop(true).animate({
            top: $elem[0].offsetTop + 'px',
            width: $elem[0].offsetWidth + 'px'
        }, speed, 'easeOutExpo');
    }

    $(function () {
        Cufon.replace('a, span').CSS.ready(function () {
            /**
             * append the absolute div to the menu;
             * when we mouse out from the menu
             * the absolute div moves to the selected item;
             * when hovering the items of the menu, we move it to its position
             */
            $menu.bind('mouseleave', function () {
//                console.log('mouseleave, moving to selected: ' + config.currentLink);
                moveTo($selected, 400);
            })
                .append($moving)
                .find('li')
                .not('.move')
                .bind('mouseenter', function () {
                    var $this = $(this);
                    var offsetLeft = $this.offset().left - 20;
                    //slide in the description
//                    $('#slidingMenuDesc > div:nth-child('+ parseInt($this.index()) +')').stop(true).animate({'width':offsetLeft+'px'},400, 'easeOutExpo');
                    //move the absolute div to this item
                    moveTo($this, 400);
                })
                .bind('mouseleave', function () {
                    var $this = $(this);
                    var offsetLeft = $this.offset().left - 20;
                    //slide out the description
//                    $('#slidingMenuDesc > div:nth-child('+ parseInt($this.index()) +')').stop(true).animate({'width':'0px'},400, 'easeOutExpo');
                });
        });
    });


    function init() {

        // click on a navigation link: the body is scrolled to the position of the respective section
        config.$navlinks.on('click', function () {
            scrollAnim(config.$sections.eq($(this).index()).offset().top);
            return false;
        });

        // 2 waypoints defined:
        // First one when we scroll down: the current navigation link gets updated.
        // A "new section" is reached when it occupies more than 70% of the viewport
        // Second one when we scroll up: the current navigation link gets updated.
        // A "new section" is reached when it occupies more than 70% of the viewport
        config.$sections.waypoint(function (direction) {
            if (direction === 'down') {
                changeNav($(this));
            }
        }, { offset: '30%' }).waypoint(function (direction) {
            if (direction === 'up') {
                changeNav($(this));
            }
        }, { offset: '-30%' });

        // on window resize: the body is scrolled to the position of the current section
        $(window).on('debouncedresize', function () {
            scrollAnim(config.$sections.eq(config.currentLink).offset().top);
        });

    }

    // update the current navigation link
    function changeNav($section) {
//		config.$navlinks.eq( config.currentLink ).removeClass( 'cbp-fbcurrent' );
        config.currentLink = $section.index('section');
//		config.$navlinks.eq( config.currentLink ).addClass( 'cbp-fbcurrent' );
//        console.log('changeNav, updated selected: ' + config.currentLink);
        // select the new menu item
        $selected = config.$navlinks.eq(config.currentLink);
//        console.log('changeNav, moving to selected: ' + config.currentLink);
        // move to the new menu item
        moveTo($selected, 400);
    }

    // function to scroll / animate the body
    function scrollAnim(top) {
        config.$body.stop().animate({ scrollTop: top }, config.animspeed, config.animeasing);
    }

    return { init: init };

})();
