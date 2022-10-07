function index(req , res){
    res.render('home.ejs' , {title : "Home Page"});
}


module.exports = {
    index
}