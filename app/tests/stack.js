/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(function () {
    function Stack() {
        //  create canvas
        //  create stack
        //  create origin (point)
        //  create area (box)
        //  derive context from canvas
    }
    function _stamp(data) {
        //        put data on canvas at origin

        return this;
    }
    function _resolve() {

        //return data from x (image? canvas?, url)

        return this;
    }
    function _flatten() {

        //clear canvas and _stamp each on stack

        return this;
    }
    function _z() {
        return this;
    }
    Stack.prototype = {constructor: Stack,
        toString: function () {
            return JSON.stringify(this);
        },
        setArea: function () {
//      setArea(w, h) {}
            return this;
        },
        setOrigin: function () {
            //setOrigin(x,y) {}
            return this;
        },
        addData: function () {
//        resolve layer and add to stack at index (or at end)
            return this;
        },
        getData: function () {
//        flatten and return data
            return this;
        },
        z: function () {
            return this;
        },
    };

    return Stack;
});
/*



 */
