/*jslint  white:false */
/*global define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE

 TODO

 */
define(['pair', 'box'], function (Pair, Box) {
  var W = (W && W.window || window),
      C = (W.C || W.console || {}),
      D = W.document,
      U;

  function Stack() {
    this.size = new Box(1920, 1280);
    this.context = newcontext();
    this.origin = new Pair();
    this.stack = [, ];

    this.canvas = this.context.canvas;
    this._reset();
  }
  // - - - - - - - - - - - - - - - - - -
  // PRIVATE

  function newcontext() {
    return D.createElement('canvas').getContext('2d');
  }
  function resize(ele, box) {
    ele.width = box.getWidth();
    ele.height = box.getHeight();
  }
  function resolve(img) { // TODO  return data from x (image? canvas?, url)
    return img;
  }
  function wrap(img, pos) {
    return {
      e: img,
      x: pos.a,
      y: pos.b
    };
  }
  // - - - - - - - - - - - - - - - - - -
  // CONSTRUCT

  Stack.prototype = {constructor: Stack,
    _flatten: function () { // clear canvas and stamp each on stack
      var obj = this;

      this._reset();
      this.stack.forEach(function (o) {
        if (typeof o === 'object') {
          obj._stamp(o);
        }
      });
      this.stack = [, ];
    },
    _reset: function () {
      resize(this.canvas, this.size);
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return this;
    },
    _stamp: function (obj) { // put image on canvas at origin
      this.context.drawImage(obj.e, obj.x, obj.y);
    },
    toString: function () {
      return JSON.stringify(this);
    },
    setOrigin: function (x, y) {
      this.origin = new Pair(x, y);
      return this;
    },
    setSize: function (w, h) {
      this.size = new Box(w, h);
      return this._resize();
    },
    insertLayer: function (lay, idx, x, y) {
      var len = this.stack.length;

      idx = (idx === U || idx > len) ? len : (1 * idx);
      return this.addLayer(lay, x, y, idx);
    },
    addLayer: function (lay, x, y, idx) { // resolve layer and add to stack at index (or at end)
      var img = resolve(lay),
          pos = (x !== U) ? new Pair(x, y) : this.origin;

      idx = idx || this.stack.length;

      this.stack.splice(idx, 0, wrap(img, pos));
      return this;
    },
    getFlat: function () { // flatten and return data
      this._flatten(this.context, this.stack);

      return this.canvas;
    },
    drawOn: function (can) {
      if (can.constructor === W.HTMLCanvasElement) {
        can.getContext('2d').drawImage(this.getFlat(), 0, 0);
      }
      return this;
    },
  };

  return Stack;
});
/*



 */
