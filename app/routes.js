var Post = require('./models/post.js');

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // dash SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dash', isLoggedIn, function(req, res) {
        res.render('dash.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // POSTS ===============================
    // =====================================

    app.post('/api/post', function(req,res){

        var newPost = new Post();
        newPost._posterId = req.session.user._id;
        newPost.title = req.param('title');
        newPost.rooms = req.param('rooms');
        newPost.price = req.param('price');
        newPost.wifi = req.param('wifi');
        newPost.pets = req.param('pets');
        newPost.parking = req.param('parking');
        newPost.laundry = req.param('laundry');
        newPost.furnished = req.param('furnished');
        newPost.smoking = req.param('smoking');

        newPost.save (function(err){
            if(err)
            throw err;

            var returnJson = {};
            returnJson.status = "success";
            return res.json(returnJson);
        });
    });


    // =====================================
    // DASH POSTS ==========================
    // =====================================

    app.get('/api/post', function(req,res){
        Post.find({}).sort('-date').exec(function(err,posts){
            return res.json(posts);
        })
    });



    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dash', // redirect to the secure dash section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dash', // redirect to the secure dash section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/dash',
            failureRedirect : '/'
        }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // TWITTER ROUTES ======================
    // =====================================
    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/dash',
            failureRedirect : '/'
        }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
