var Main = function() {
    var self = this;

    self.load = function () {
        initFrameDecorator();
        self.loadLoginFrame();
        //self.loadSearchFrame();
        logoutEventOn();
    };

    function logoutEventOn() {
        $('#logout_btn').on('click', function () {
            self.loadLoginFrame();
        });
    }

    self.loadLoginFrame = function () {
        jQuery.get("/resources/templates/login/login.html", function (tmpl) {
            $('#main_frame').html(Handlebars.compile(tmpl));
        });
    };

    self.loadSearchFrame = function() {
        jQuery.get("/resources/templates/search/search-template.html", function (tmpl) {
            var template = Handlebars.compile(tmpl);
            $('#main_frame').html(template);
        });
    };

    self.loadDetailFrame = function(param) {
        self.detailParam = param;
        jQuery.get("/resources/templates/detail/detail-template.html", function (tmpl) {
            var template = Handlebars.compile(tmpl);
            $('#main_frame').html(template);
        });
    };


    /**
     * Frame Decorator
     * */
    function initFrameDecorator() {
        Handlebars.registerDecorator('login-script', function (program, props, container, context) {
            $.getScript("/resources/templates/login/login.js")
                .done(function (script, textStatus) {
                    self.loginTemplate = new LoginTemplate();
                    self.loginTemplate.load(self);
                })
                .fail(function (e) {
                    console.log('Frame Decorator Error!', e);
                });
        });


        Handlebars.registerDecorator('search-script', function (program, props, container, context) {
            $.getScript("/resources/templates/search/search-template.js")
                .done(function (script, textStatus) {
                    self.searchTemplate = new SearchTemplate();
                    self.searchTemplate.load(self);
                })
                .fail(function (e) {
                    console.log('Frame Decorator Error!', e);
                });
        });


        Handlebars.registerDecorator('detail-script', function (program, props, container, context) {
            $.getScript("/resources/templates/detail/detail-template.js")
                .done(function (script, textStatus) {
                    self.detailTemplate = new DetailTemplate();
                    self.detailTemplate.load(self, self.detailParam);
                })
                .fail(function (e) {
                    console.log('Frame Decorator Error!', e);
                });
        });
    };
}