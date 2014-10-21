/*!
 *  Comsat - A Simple jQuery plugin to show or hide the value of your
 *    password field using by clicking a button or a checkbox.
 *
 *  Author   : Marc Cometa
 *  Version  : 0.1.0
 *  Github   : http://github.com/mcometa/comsat
 *
 */

(function($) {
    $.fn.comsat = function(options) {

        var settings, markup;

        return this.each(function() {
            var self = $(this);

            settings = {
                comsatSelector: self.data('input-selector'),
                comsatToggleType: self.attr('type'),
                comsatToggle: self,
                label: self.data('label'),
                toggleClass: self.data('comsat-class'),
                after: function() {},
                before: function() {}
            }

            settings = $.extend( settings, options ); // provision to extend settings for more additional options by user

            if (typeof settings.before == 'function') {
                settings.before.call(this)
            }

            markup = "<input type='"+settings.comsatToggleType+"' class='"+settings.toggleClass+"' >";

            var comsatToggle     = $( settings.comsatToggle ),
                comsatSelector   = $( settings.comsatSelector ),
                comsatToggleType = settings.comsatToggleType;

            if ( comsatToggleType == "checkbox" ) {

                if ( settings.label !== "" || settings.label !== " "  ) {
                    comsatToggle.wrap('<label class="comsat-label">').after( settings.label );
                }

                comsatToggle.on('change', function( e ){
                    if ( e.target.checked ) {
                        comsatSelector.attr( 'type', 'text' );
                        comsatToggle.addClass('comsat-open');
                    } else {
                        comsatSelector.attr( 'type', 'password' );
                        comsatToggle.removeClass('comsat-open');
                    }
                });

            } else if ( comsatToggleType == "button" ) {

                if ( settings.label !== "" || settings.label !== " "  ) {
                    comsatToggle.html( settings.label );
                }

                comsatToggle.on( 'click', function( e ) {

                    if ( comsatSelector.attr('type') == 'text' ) {
                        comsatSelector.attr( 'type', 'password' );
                        comsatToggle.removeClass('comsat-open');
                    } else {
                        comsatSelector.attr( 'type', 'text' );
                        comsatToggle.addClass('comsat-open');
                    }

                });

            }

            if (typeof settings.after == 'function') {
                settings.after.call(this)
            }


        });
    };
}(jQuery));
