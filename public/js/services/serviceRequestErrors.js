app.service('serviceRequestErrors', function ($http,$auth,ngDialog) {
    return {
        popupError: function(res) {
            ngDialog.open(
                {
                    template: '<div class="modal-header"><h3 class="modal-title"></h3><p>'+ res.status +'</p></div><div class="modal-body"><p>'+ res.data.message +'</p></div>',
                    className: 'ngdialog-theme-default',
                    controller: '',
                    closeByNavigation: true,
                    plain: true
                }
            );
        }
    }
});
