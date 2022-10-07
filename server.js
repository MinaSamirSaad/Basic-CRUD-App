require('dotenv').config();
// Grap Our Dependencies
const express = require('express'),
    app = express(),
    mongoose=require('mongoose')
    port =process.env.PORT ||5000;

// dataBase
(async function (){
    await mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.KEY}@cluster0.wxxquch.mongodb.net/?retryWrites=true&w=majority`,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>console.log('data base loaded'))
})();

// (async function (){
//     try{
//     await mongoose.connect('mongodb://localhost:27017/tasks',{
//         useNewUrlParser:true,
//         useUnifiedTopology:true
//     }).then(()=>console.log('data base loaded'))
// }catch(error){
//     console.log()
// }
// })();

// Static Middleware 
app.use(express.static(__dirname+'/public'));

// set view engine
app.set('view engine' , 'ejs');

// Define App Routes
app.use(express.urlencoded({extended : true}));
app.use(require('./routes/route'))
// Running App Server
app.listen(port , ()=> {
    console.log(`Server Running on localhost : ${port}`);
});
