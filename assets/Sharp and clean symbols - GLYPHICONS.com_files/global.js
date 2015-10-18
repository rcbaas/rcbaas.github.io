(function($) {

    /*!
     *
     *  Project:  GLYPHICONS
     *  Author:   Petr Urbanek - www.r4ms3s.cz
     *  Twitter:  @r4ms3scz
     *
     * @param {Object} window, document, undefined
     *
     */

     (function(window, document, undefined) {
        
        // Defaults
        // =====================================
       
        var r4 = window.r4 = {
            utils : {},
            cache : {}
        };
      

        // Methods
        // =====================================

        r4.utils.init = function() {
            r4.cache.window                = $(window);
            r4.cache.document              = $(document);
            r4.cache.html                  = $('html');
            r4.cache.body                  = $('body');

            r4.cache.header                = r4.cache.body.find('header');
            r4.cache.footer                = r4.cache.body.find('footer');
            r4.cache.section               = r4.cache.body.find('section');


            // MEDIA QUERIES
            r4.mobile = false;
            r4.bounds = [
                [1000, 10000, function() {
                    mobile = false;
                }],
                [0, 1000, function() {
                    mobile = true;
                }]
            ],
            r4.lastBound = -1;
        };


        // RESIZE
        r4.utils.resize = function(start){
            r4.utils.calcBounds(r4.cache.window, r4.bounds, r4.lastBound, start);
        };


        // RESIZE METHODS
        r4.utils.calcBounds = function(ths, bounds, lastBound, start) {
            var w = ths.width(),
                h = ths.height();
            for(var i = 0, j = bounds.length; i < j; i++) {
                if(w > bounds[i][0] && w < bounds[i][1] && lastBound !== i) {
                    bounds[i][2]();
                    lastBound = i;
                }
            }

        };


        // GLYPHICONS
        r4.utils.glyphiconsico = function(){

            $('.font-list li').each(function(index){
                glyphStore = $(this).find('.glyphicons');
                if ($(this).find('div').attr("data-utf")) {
                    $(glyphStore).html("&#x" + $(this).find('div').attr("data-utf") + ";");
                };
            });

            var content = $('.font-list-glyphicons'),
                list = content.find('li'),
                box = content.find('.glyphicons-box');

            // CLOSE AFTER CLICK - OUTSIDE
            $(document).click(function() {
                box.stop().fadeTo(200, 0, function(){
                    list.removeClass('act');
                    box.removeClass('act');
                });
            });
            $('.font-list ul, .glyphicons-box').click(function(event) {
                event.stopPropagation();
            });

            // LIST ICONS
            list.each(function(index){
                var li = $(this),
                    a = li.find('div'),newindex;

                li.on('click', function(e){
                    e.preventDefault();

                    var left = a.offset().left - content.offset().left - 3,
                        top = a.offset().top - content.offset().top - 5,
                        prefix = a.data('prefix'),
                        type = a.data('type'),
                        name = a.data('name'),
                        utf = a.data('utf'),
                        position = a.data('position'),
                        element = a.html(),
                        elementreplace = element.substring(element.indexOf(' aria-hidden="true">'));

                    if (element.indexOf(' aria-hidden="true">') > 0) {
                        var elementeval = element.replace(elementreplace, '></span>');
                    } else {
                        var elementeval = element;
                    }

                    if (index > 999) {
                        newindex = index.toString().substring(3);
                    } else if (index > 99) {
                        newindex = index.toString().substring(2);
                    } else if (index > 9) {
                        newindex = index.toString().substring(1);
                    } else {
                        newindex = index;
                    }

                    if (!li.hasClass('act')) {
                        list.removeClass('act');
                        box.removeClass('right-box');
                        box.addClass('act');

                        li.addClass('act');
                        box.find('strong').html(prefix + '-' + name);
                        box.find('.utf').html(utf);
                        box.find('.position').html(position);

                        box.find('input').val(elementeval);

                        box.css({
                            left: left + 'px',
                            top: top + 'px'
                        });
                        box.stop().fadeTo(200, 1);

                        // RIGHT BOX
                        if (parseInt(newindex) >= 5) {
                            box.addClass('right-box');
                            box.css({
                                left: left - box.width() + 'px'
                            })
                        }
                    }
                });
            });

            // SELECT
            $('.font-list-glyphicons select').select2();
            $('.font-list-glyphicons select').on('change', function(e){
                var val = $('.font-list-glyphicons select').val();

                if(val == 'new'){
                    list.addClass('hide');
                    list.find('div[data-type*="NEW IN 1.8"]').parent().removeClass('hide');
                } else if(val == 'new-second'){
                    list.addClass('hide');
                    list.find('div[data-type*="NEW IN 1.9"]').parent().removeClass('hide');
                } else {
                    list.removeClass('hide');
                }
            });
            
            // SEARCH INPUT
            $('.glyphicons-input').on('keyup', function(){
                var input = $(this),
                    val = input.val(),
                    select = $('.font-list-glyphicons select').val();

                if(val.length >= 1){
                    $('.font-list-glyphicons').addClass('searched');
                    list.addClass('hide');

                    if(select == 'new'){
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="NEW IN 1.8"]').parent().addClass('hide');
                    }else if(select == 'new-second'){
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="NEW IN 1.9"]').parent().addClass('hide');
                    }else{
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');
                    }
                }else{
                    $('.font-list-glyphicons').removeClass('searched');
                    if(select == 'new'){
                        list.addClass('hide');
                        list.find('div[data-type*="NEW IN 1.8"]').parent().removeClass('hide');
                    } else if(val == 'new-second'){
                        list.addClass('hide');
                        list.find('div[data-type*="NEW IN 1.9"]').parent().removeClass('hide');
                    }else{
                        list.removeClass('hide');
                    }
                }
            });
        }

        // HALFLINGS
        r4.utils.halflingsico = function(){

            $('.font-list li').each(function(index){
                glyphStore = $(this).find('.halflings');
                if ($(this).find('div').attr("data-utf")) {
                    $(glyphStore).html("&#x" + $(this).find('div').attr("data-utf") + ";");
                };
            });

            var content = $('.font-list-halflings'),
                list = content.find('li'),
                box = content.find('.halflings-box');

            // CLOSE AFTER CLICK - OUTSIDE
            $(document).click(function() {
                box.stop().fadeTo(200, 0, function(){
                    list.removeClass('act');
                    box.removeClass('act');
                });
            });
            $('.font-list ul, .glyphicons-box').click(function(event) {
                event.stopPropagation();
            });

            // LIST ICONS
            list.each(function(index){
                var li = $(this),
                    a = li.find('div');

                li.on('click', function(e){
                    e.preventDefault();

                    var left = a.offset().left - content.offset().left - 10,
                        top = a.offset().top - content.offset().top - 7,
                        prefix = a.data('prefix'),
                        type = a.data('type'),
                        name = a.data('name'),
                        utf = a.data('utf'),
                        position = a.data('position'),
                        element = a.html(),
                        elementreplace = element.substring(element.indexOf(' aria-hidden="true">')),
                        elementeval = element.replace(elementreplace, '></span>');

                    if (element.indexOf(' aria-hidden="true">') > 0) {
                        var elementeval = element.replace(elementreplace, '></span>');
                    } else {
                        var elementeval = element;
                    }

                    var newindex = (index / 20).toFixed(2),
                        indxstring = newindex.toString().indexOf('.'),
                        subindex = newindex.toString().substring((indxstring + 1));

                    //console.log(subindex);

                    if (!li.hasClass('act')) {
                        list.removeClass('act');
                        box.removeClass('right-box');
                        box.addClass('act');

                        li.addClass('act');
                        box.find('strong').html(prefix + '-' + name);
                        box.find('.utf').html(utf);
                        box.find('.position').html(position);

                        box.find('input').val(elementeval);

                        box.css({
                            left: left + 'px',
                            top: top + 'px'
                        });
                        box.stop().fadeTo(200, 1);


                        // CHECK - RESIZE
                        var w = r4.cache.window.width();
                        r4.cache.window.smartresize(function() {
                            w = r4.cache.window.width();
                        });

                        // RIGHT BOX
                        if (parseInt(subindex) >= 50 && w > 610) {
                            box.addClass('right-box');
                            box.css({
                                left: left - box.width() + 'px'
                            });
                        } else if (w <= 610) {
                            if (parseInt(subindex) >= 25 && parseInt(subindex) <= 45) {
                                box.addClass('right-box');
                                box.css({
                                    left: left - box.width() + 'px'
                                });
                            } else if (parseInt(subindex) >= 75 && parseInt(subindex) <= 95) {
                                box.addClass('right-box');
                                box.css({
                                    left: left - box.width() + 'px'
                                });
                            }
                        }
                    }
                });
            });

            // SELECT
            $('.font-list-halflings select').select2();
            $('.font-list-halflings select').on('change', function(e){
                var val = $('.font-list-halflings select').val();

                if(val == 'new'){
                    list.addClass('hide');
                    list.find('div[data-type*="NEW IN 1.8"]').parent().removeClass('hide');
                } else if(val == 'new-second'){
                    list.addClass('hide');
                    list.find('div[data-type*="NEW IN 1.9"]').parent().removeClass('hide');
                } else {
                    list.removeClass('hide');
                }
            });
            
            // SEARCH INPUT
            $('.halflings-input').on('keyup', function(){
                var input = $(this),
                    val = input.val(),
                    select = $('.font-list-halflings select').val();

                if(val.length >= 1){
                    $('.font-list-halflings').addClass('searched');
                    list.addClass('hide');

                    if(select == 'new'){
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="NEW IN 1.8"]').parent().addClass('hide');
                    }else if(select == 'new-second'){
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="NEW IN 1.9"]').parent().addClass('hide');
                    }else{
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');
                    }
                }else{
                    $('.font-list-halflings').removeClass('searched');
                    if(select == 'new'){
                        list.addClass('hide');
                        list.find('div[data-type*="NEW IN 1.8"]').parent().removeClass('hide');
                    } else if(val == 'new-second'){
                        list.addClass('hide');
                        list.find('div[data-type*="NEW IN 1.9"]').parent().removeClass('hide');
                    }else{
                        list.removeClass('hide');
                    }
                }
            });
        }

        // SOCIAL
        r4.utils.socialico = function(){

            $('.font-list li').each(function(index){
                glyphStore = $(this).find('.social');
                if ($(this).find('div').attr("data-utf")) {
                    $(glyphStore).html("&#x" + $(this).find('div').attr("data-utf") + ";");
                };
            });

            var content = $('.font-list-social'),
                list = content.find('li'),
                box = content.find('.social-box');

            // CLOSE AFTER CLICK - OUTSIDE
            $(document).click(function() {
                box.stop().fadeTo(200, 0, function(){
                    list.removeClass('act');
                    box.removeClass('act');
                });
            });
            $('.font-list ul, .social-box').click(function(event) {
                event.stopPropagation();
            });

            // LIST ICONS
            list.each(function(index){
                var li = $(this),
                    a = li.find('div'),newindex;

                li.on('click', function(e){
                    e.preventDefault();

                    var left = a.offset().left - content.offset().left - 3,
                        top = a.offset().top - content.offset().top - 6,
                        prefix = a.data('prefix'),
                        type = a.data('type'),
                        name = a.data('name'),
                        utf = a.data('utf'),
                        position = a.data('position'),
                        element = a.html(),
                        elementreplace = element.substring(element.indexOf(' aria-hidden="true">')),
                        elementeval = element.replace(elementreplace, '></span>');

                    if (element.indexOf(' aria-hidden="true">') > 0) {
                        var elementeval = element.replace(elementreplace, '></span>');
                    } else {
                        var elementeval = element;
                    }

                    if (index > 999) {
                        newindex = index.toString().substring(3);
                    } else if (index > 99) {
                        newindex = index.toString().substring(2);
                    } else if (index > 9) {
                        newindex = index.toString().substring(1);
                    } else {
                        newindex = index;
                    }

                    if (!li.hasClass('act')) {
                        list.removeClass('act');
                        box.removeClass('right-box');
                        box.addClass('act');

                        li.addClass('act');
                        box.find('strong').html(prefix + '-' + name);
                        box.find('.utf').html(utf);
                        box.find('.position').html(position);

                        box.find('input').val(elementeval);

                        box.css({
                            left: left + 'px',
                            top: top + 'px'
                        });
                        box.stop().fadeTo(200, 1);

                        // RIGHT BOX
                        if (parseInt(newindex) >= 5) {
                            box.addClass('right-box');
                            box.css({
                                left: left - box.width() + 'px'
                            })
                        }
                    }
                });
            });

            // SELECT
            $('.font-list-social select').select2();
            $('.font-list-social select').on('change', function(e){
                var val = $('.font-list-social select').val();

                if(val == 'new'){
                    list.addClass('hide');
                    list.find('div[data-type*="NEW IN 1.8"]').parent().removeClass('hide');
                } else if(val == 'new-second'){
                    list.addClass('hide');
                    list.find('div[data-type*="NEW IN 1.9"]').parent().removeClass('hide');
                }else{
                    list.removeClass('hide');
                }
            });
            
            // SEARCH INPUT
            $('.social-input').on('keyup', function(){
                var input = $(this),
                    val = input.val(),
                    select = $('.font-list-social select').val();

                if(val.length >= 1){
                    $('.font-list-social').addClass('searched');
                    list.addClass('hide');

                    if(select == 'new'){
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="NEW IN 1.8"]').parent().addClass('hide');
                    }else if(select == 'new-second'){
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="NEW IN 1.9"]').parent().addClass('hide');
                    }else{
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');
                    }
                }else{
                    $('.font-list-social').removeClass('searched');
                    if(select == 'new'){
                        list.addClass('hide');
                        list.find('div[data-type*="NEW IN 1.8"]').parent().removeClass('hide');
                    } else if(val == 'new-second'){
                        list.addClass('hide');
                        list.find('div[data-type*="NEW IN 1.9"]').parent().removeClass('hide');
                    }else{
                        list.removeClass('hide');
                    }
                }
            });
        }

        // FILETYPES
        r4.utils.filetypesico = function(){

            $('.font-list li').each(function(index){
                glyphStore = $(this).find('.filetypes');
                if ($(this).find('div').attr("data-utf")) {
                    $(glyphStore).html("&#x" + $(this).find('div').attr("data-utf") + ";");
                };
            });

            var content = $('.font-list-filetypes'),
                list = content.find('li'),
                box = content.find('.filetypes-box');

            // CLOSE AFTER CLICK - OUTSIDE
            $(document).click(function() {
                box.stop().fadeTo(200, 0, function(){
                    list.removeClass('act');
                    box.removeClass('act');
                });
            });
            $('.font-list ul, .filetypes-box').click(function(event) {
                event.stopPropagation();
            });

            // LIST ICONS
            list.each(function(index){
                var li = $(this),
                    a = li.find('div'),newindex;

                li.on('click', function(e){
                    e.preventDefault();

                    var left = a.offset().left - content.offset().left - 3,
                        top = a.offset().top - content.offset().top - 6,
                        prefix = a.data('prefix'),
                        type = a.data('type'),
                        name = a.data('name'),
                        utf = a.data('utf'),
                        position = a.data('position'),
                        element = a.html(),
                        elementreplace = element.substring(element.indexOf(' aria-hidden="true">')),
                        elementeval = element.replace(elementreplace, '></span>');

                    if (element.indexOf(' aria-hidden="true">') > 0) {
                        var elementeval = element.replace(elementreplace, '></span>');
                    } else {
                        var elementeval = element;
                    }

                    if (index > 999) {
                        newindex = index.toString().substring(3);
                    } else if (index > 99) {
                        newindex = index.toString().substring(2);
                    } else if (index > 9) {
                        newindex = index.toString().substring(1);
                    } else {
                        newindex = index;
                    }

                    if (!li.hasClass('act')) {
                        list.removeClass('act');
                        box.removeClass('right-box');
                        box.addClass('act');

                        li.addClass('act');
                        box.find('strong').html(prefix + '-' + name);
                        box.find('.utf').html(utf);
                        box.find('.position').html(position);

                        box.find('input').val(elementeval);

                        box.css({
                            left: left + 'px',
                            top: top + 'px'
                        });
                        box.stop().fadeTo(200, 1);

                        // RIGHT BOX
                        if (parseInt(newindex) >= 5) {
                            box.addClass('right-box');
                            box.css({
                                left: left - box.width() + 'px'
                            })
                        }
                    }
                });
            });

            // SELECT
            $('.font-list-filetypes select').select2();
            $('.font-list-filetypes select').on('change', function(e){
                var val = $('.font-list-filetypes select').val();

                if(val !== 'ALL GLYPHICONS'){
                    list.addClass('hide');
                    list.find('div[data-type*="' + val + '"]').parent().removeClass('hide');
                }else{
                    list.removeClass('hide');
                }
            });
            
            // SEARCH INPUT
            $('.filetypes-input').on('keyup', function(){
                var input = $(this),
                    val = input.val(),
                    select = $('.font-list-filetypes select').val();

                if(select !== 'ALL GLYPHICONS'){
                    list.addClass('hide');

                    if(val.length >= 1){
                        $('.font-list-filetypes').addClass('searched');
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div').not('[data-type*="' + select + '"]').parent().addClass('hide');
                    }else{
                        $('.font-list-filetypes').removeClass('searched');
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                        list.find('div[data-utf*="' + val + '"]').parent().removeClass('hide');

                        list.find('div[data-type*="' + select + '"]').parent().removeClass('hide');
                    }
                }else{
                    if(val.length >= 1){
                        $('.font-list-filetypes').addClass('searched');
                        list.addClass('hide');
                        list.find('div[data-name*="' + val + '"]').parent().removeClass('hide');
                    }else{
                        $('.font-list-filetypes').removeClass('searched');
                        list.removeClass('hide');
                    }
                }
            });
        }


        r4.utils.domLoad = function() {

            r4.utils.resize();
            r4.cache.window.smartresize(function() {
                r4.utils.resize();
            });


            if ($('.content-font-list').length) {

                // COPY
                var client = new ZeroClipboard( $('.copy-form button') );
                client.on( "ready", function( readyEvent ) {
                    client.on( "copy", function( event ) {
                        var clipboard = event.clipboardData;
                        var copyval = $('.glyphicons-box.act, .halflings-box.act, .social-box.act, .filetypes-box.act').find('input').val();
                        var copyvalreplace = copyval.substring(copyval.indexOf('">'));
                        var completeval = copyval.replace(copyvalreplace, '"></span>');

                        //clipboard.setData( "text/plain", copyval );
                        clipboard.setData( "text/plain", completeval );
                    } );
                    client.on( "aftercopy", function( event ) {
                        //console.log("Copied text to clipboard: " + event.data["text/plain"] );
                    } );
                } );

                setTimeout(function(){ 
                    $('.glyphicons-badge').fadeTo('normal', 0.9);
                }, 500);

                $('.tabs a').on('click', function(e){
                    e.preventDefault();

                    var li = $(this),
                        a = li.attr('rel');

                    if (!li.parents('li').hasClass('act')) {
                        $('.font-list-glyphicons select').select2('val', 'ALL GLYPHICONS');
                        $('.font-list-halflings select').select2('val', 'ALL GLYPHICONS');
                        $('.font-list-social select').select2('val', 'ALL GLYPHICONS');
                        $('.font-list-filetypes select').select2('val', 'ALL GLYPHICONS');

                        $('.font-list li').removeClass('act').removeClass('hide');

                        $('.tabs li').removeClass('act');
                        $(this).parents('li').addClass('act');

                        $('.font-list').removeClass('act');
                        $('.' + a).addClass('act');

                        $('.font-list-badge').attr('style', '').removeAttr('style');
                        setTimeout(function(){ 
                            $('.' + a).find('.font-list-badge').fadeTo('normal', 0.9);
                        }, 500);

                        if ($('.tabs').hasClass('show-tabs')) {
                            $('.tabs').removeClass('show-tabs');
                        }
                    } else{
                        $('.tabs').toggleClass('show-tabs');
                    }
                });

                r4.utils.glyphiconsico();
                r4.utils.halflingsico();
                r4.utils.socialico();
                r4.utils.filetypesico();
            }



            $('.btn-show-nav, .btn-close-nav').on('click', function(e){
                e.preventDefault();

                $('header').toggleClass('show-nav');
            });

            // Add new badge to main menu
            //$('#menu-menu .examples a').append('<span class="badge">NEW</span>');
        };


        // Initialize Events
        // =====================================

        r4.utils.init();

        jQuery(function($) {
            r4.utils.domLoad();
        });


    })(window, document);

    // debouncing function from John Hann
    // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
    (function($,sr) {

        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }
                timeout = setTimeout(delayed, threshold || 100);
            };
        };

        jQuery.fn[sr] = function(fn){ return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');


})(jQuery)