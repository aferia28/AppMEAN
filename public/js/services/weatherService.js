app.service('serviceAdmin', function ($http,$auth) {
        var user;
        var admin;

        if(!$auth.getToken())
        {
            console.log('No hay persona logeada..');
        }
        else{
            $http.get('/persona')
            .success(function(data) {
                console.log('>>>Service', data);
                user = data;
                admin = data.isAdmin;
            });
        }

        return {
            getProperty: function () {
                return user;
            },
            getAdmin: function() {
            	console.log(user);
            	return admin;
            },
            setProperty: function(value) {
                user = value;
            },
            setAdmin: function(value) {
                admin = value;
            }
        };
    });
