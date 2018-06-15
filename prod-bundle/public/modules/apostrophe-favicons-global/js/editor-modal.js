apos.define('apostrophe-global-editor-modal', {
  extend: 'apostrophe-pieces-editor-modal',
  construct: function (self, options) {
    var superAfterHide = self.afterHide;
    self.afterHide = function () {
      superAfterHide();
      if (self._id) {
        apos.docs.unlock(self._id, function () {});
      }

      var notiId = apos.utils.generateId();
      var $notification;
      var processing = false;
      var timer;
      requestStatus();

      function requestStatus() {
        self.api('favicon-progress', {}, function (data) {
          updateProgress(data);
        }, function (err) {
          if (err) {
            console.log(err);
          }
        });
      };

      function updateProgress(data) {
        if (data.processing === true) {
          if (processing === false) {
            apos.notify('Processing favicons ... ', { pulse: true, id: notiId });
            processing = true;
            timer = setInterval(requestStatus, 10000)
          }
        } else {
          if (processing !== false) {
            removeProgressNotification();
          }
        }
      };

      function removeProgressNotification() {
        $notification = $('#' + notiId + '[data-apos-notification]');
        $notification.trigger('click');
        window.clearInterval(timer);
        apos.notify('Done processing favicons!', { type: 'success', dismiss: 50 });
      }
    };
  }
});

