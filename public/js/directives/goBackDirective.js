app.directive('goBack', function () {
    return {
        restrict: 'E',
        template: "<span><i class='fa fa-angle-double-left'>{{back}}</i></span>",
        scope: {
            back: '@back'
        },
        link: function(scope, element, attrs) {
            $(element).on('click', function() {
                history.back();
                scope.$apply();
            });
        }
    };
});

