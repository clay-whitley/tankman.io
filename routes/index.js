
/*
 * GET home page.
 */

exports.index = function(req, res){
  if (req.cookies.identity){
    res.render('index', { title: 'tankman.io' });
  } else {
    res.render('sign_in', { title: 'Sign in'});
  }
};