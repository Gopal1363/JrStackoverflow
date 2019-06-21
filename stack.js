var bodyParser = require("body-parser");
expressSanitizer = require("express-sanitizer");
mongoose = require("mongoose");
express = require("express");
app = express();

mongoose.connect("mongodb://localhost/stackapp");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



//SCHEMA

var stackSchema = new mongoose.Schema({
    title: String,
    description: String,
    created_date: {type: Date, default: Date.now},
    answer: [
        {
            answer_name: String,
            answer: String,
            answer_created_date: {type: Date, default: Date.now}
        }
    ],
});

var Stack = mongoose.model("Stack", stackSchema);
//ROUTES

app.get("/",function(req,res){
    res.redirect("/dash");
});

app.get("/dash",function(req,res){
    Stack.find({},function(err,blogs){
        if(err){
            console.log("ERROR!!");
        } else{
            res.render("index",{blogs: blogs});
        }
    });
});

//NEW ROUTE
app.get("/dash/new",function(req,res){
    res.render("newpost");
});

//CREATE ROUTE
app.post("/dash", function(req,res){
     Stack.create(req.body.new, function(err, newStack){
        if(err){
            res.render("newpost");
        } else {
            res.redirect("/dash");
        }
    });
});

//Show Route
app.get("/dash/:id", function(req,res){
    Stack.findById(req.params.id, function(err, foundStack){
        if(err){
            res.redirect("/dash");
        } else {
           
            res.render("show", {stack: foundStack});
        }
    });
});

app.post("/dash/:id",function(req,res){
    var data = req.body.stack;
    var id = req.params.id;
    Stack.findById(req.params.id, function(err,ques){
        if(err){
            res.render("show");
        }else{
    } 
        var d = ques.answer.push(data);
       
        ques.save();
        res.redirect("show"); 
    });
});



app.listen(2000,function(){
    console.log("Server Running!!")
});
