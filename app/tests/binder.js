/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['jquery', 'tests/box'], function ($) {
    var W = (W && W.window || window),
        C = (W.C || W.console || {}),
        D = W.document,
        U;

    function Binder(object_id) {
        // Use a jQuery object as simple PubSub
        var pubSub = $({});

        // We expect a `data` element specifying the binding
        // in the form: data-bind-<object_id>='<property_name>'
        var data_attr = 'bind-' + object_id,
            message = object_id + ':change';

        // Listen to change events on elements with the data-binding attribute and proxy
        // them to the PubSub, so that the change is 'broadcasted' to all connected objects
        $(document).on('change', '[data-' + data_attr + ']', function (evt) {
            var $input = $(this);

            pubSub.trigger(message, [$input.data(data_attr), $input.val()]);
        });

        // PubSub propagates changes to all bound elements, setting value of
        // input tags or HTML content of other tags
        pubSub.on(message, function (evt, prop_name, new_val) {
            $('[data-' + data_attr + '=' + prop_name + ']').each(function () {
                var $bound = $(this);

                if ($bound.is('input, textarea, select')) {
                    $bound.val(new_val);
                } else {
                    $bound.html(new_val);
                }
            });
        });

        return pubSub;
    }
    // - - - - - - - - - - - - - - - - - -
    // PRIVATE

    // - - - - - - - - - - - - - - - - - -
    // CONSTRUCT

    Binder.prototype = {constructor: Binder,
        toString: function () {
            return JSON.stringify(this);
        },
    };

    return Binder;
});
/*



 */
