LoginTemplate = function() {
    var self = this;

    self.load = function(main) {
        loginEventOn();
        self.main = main;
    };

    function loginEventOn() {
        $('#login_btn').on('click', function () {
            login();
        });
    }

    function login() {
        var param = {
            id : $('#id').val(),
            pw : SHA256($('#pw').val())
        };

        callApi("http://localhost:9000/login/auth", param).then(isAuthorized => {
            if(isAuthorized) {
                console.log('Login success');
                self.main.loadSearchFrame();
            }else {
                console.log('Login Failed');
                alert('Login Failed.');
            }
        });
    }
};