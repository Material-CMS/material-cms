apos.define('color-picker', {

  afterConstruct: function(self) {
    self.addFieldType();
  },

  construct: function(self, options) {

    self.addFieldType = function() {
      apos.schemas.addFieldType({
        name: 'color-picker',
        populate: self.populate,
        convert: self.convert
      });
    };

    self.populate = function(object, name, $field, $el, field, callback) {
      var $fieldset = apos.schemas.findFieldset($el, name);
      var $colorPicker = $fieldset.find('[data-color-picker]');
      var $preview = $fieldset.find('[data-color-picker-preview]');
      if (object[name]) {
        $preview.css('background-color', object[name]);
      }

      var canvas = $colorPicker[0];
      var red, green, blue, x, y, ctx;
      ctx = canvas.getContext('2d');
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      y = 0;
      for (blue = 0; (blue < 256); blue += 32) {
        x = 0;
        for (green = 0; (green < 256); green += 32) {
          for (red = 0; (red < 256); red += 32) {
            ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
            ctx.fillRect(x, y, 4, 32);
            x += 4;
          }
        }
        y += 32;
      }
      $fieldset.data('color', object[name]);
      $colorPicker.on('click', function(e) {
        var x = e.pageX - $(this).offset().left;
        var y = e.pageY - $(this).offset().top;
        var cellX = Math.floor(x / 4);
        var cellY = Math.floor(y / 32);
        var red = Math.min((cellX % 8) * 32, 255);
        var green = Math.min(Math.floor(cellX / 8) * 32, 255);
        var blue = Math.min(cellY * 32, 255);
        var color = 'rgb(' + red + ',' + green + ',' + blue + ')';
        $fieldset.data('color', color);
        $preview.css('background-color', color);
        return false;
      });
      return setImmediate(callback);
    };

    self.convert = function(object, name, $field, $el, field, callback) {
      var $fieldset = apos.schemas.findFieldset($el, name);
      object[name] = $fieldset.data('color');
      if (field.required && (!object[name])) {
        return setImmediate(_.partial(callback, 'required'));
      }
      return setImmediate(callback);
    };

  }
});
