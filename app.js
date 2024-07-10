const path= require('path');
const express = require('express');
const app = express();
const port = 80;
const hostname = '127.0.0.1';

const mongoose = require('mongoose');
const db = mongoose.connection;


main().catch(err => console.log(err));

async function main() {
    
    await mongoose.connect('mongodb://127.0.0.1:27017/teacher');
 
 //   use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static files 
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set("view engine","pug");// setting template for pug
app.set("views",path.join(__dirname,"views"));//setting views directory

//Mongoose Schema
const TeacherSchema = new mongoose.Schema({
    ID : {type:String, required:true},
    TName : {type: String, required: true },
    Dept: {type:String, required:true},
    Lecture1:{type:String},
    Lecture2:{type:String},
    Lecture3:{type:String},
    Lecture4:{type:String},
    Lecture5:{type:String},
    Lecture6:{type:String},
    Lecture7:{type:String},
    Lecture8:{type:String},
});
const Teacher = mongoose.model('Teacher', TeacherSchema); 

//ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).render('base.pug');
});
app.get('/adminpage1',(req,res)=>{
    try{
        res.render('admin1.pug');
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
})
app.post('/adminpage', async(req,res)=>{
    try{
        var Username = req.body.username;
        var Password= req.body.password;
        if(Username=='admin'&& Password== 100){
            res.status(200).render('admin1.pug');
        }
        else{
            res.render('errorpage.pug');
        }
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});
app.get('/studentpage',(req,res)=>{
    try{
        res.render('student.pug');
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
})
app.post('/studentpage',(req,res)=>{
    try{
        var Username = req.body.username;
        var Password= req.body.password;
        if(Username=='student'&& Password== 200 ){
            res.status(200).render('student.pug');
        }
        else{
            res.render('errorpage.pug');
        }
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
})
app.get('/createrecord',(req,res)=>{
    try{
        res.status(200).render('createrecord.pug');
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});
app.post('/create',(req,res)=>{
    try{
        var record = new Teacher(req.body);
        record.save().then(()=>{
            res.render('success.pug');
        })
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});
    
app.get('/updaterecord',(req,res)=>{
    try{
        res.status(200).render('updaterecord.pug');
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});
app.post('/update',async(req,res)=>{
    try{
        var result = await Teacher.updateOne({ID:req.body.ID},
            { 
                $set:
                { ID:req.body.id,
                  TName: req.body.TName,
                  Dept: req.body.Dept,
                  Lecture1: req.body.Lecture1,
                  Lecture2: req.body.Lecture2,
                  Lecture3: req.body.Lecture3,  
                  Lecture4: req.body.Lecture4,
                  Lecture5: req.body.Lecture5,
                  Lecture6: req.body.Lecture6,
                  Lecture7: req.body.Lecture7,
                  Lecture8: req.body.Lecture8
            }})
        res.render('success.pug');    
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
})
app.get('/deleterecord',(req,res)=>{
    try{
        res.status(200).render('deleterecord.pug');
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});
app.post('/delete',async(req,res)=>{
    try{
        var item = await Teacher.deleteOne({ID:req.body.ID});
        res.render("success.pug");
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
})
app.get('/checkrecord',(req,res)=>{
    try{
        res.status(200).render('checkrecordd.pug');
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});
app.post('/check',async(req,res)=>{
    try{
        var teacher = await Teacher.find({
                $or:[
                    {TName:req.body.TName},
                    {Dept:req.body.Dept}
                ]
            });
        res.render("checkrecord.pug",{x:teacher});
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
});

app.get('/retrieverecord',async(req,res)=>{
    try{
        var teacher = await Teacher.find({});
        res.render('checkrecord.pug',{x:teacher});
    }catch(error){
        res.status(404).render('errorpage.pug');
    }
})

//START SERVER
app.listen(port,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`The application succesfully started on ${port}`);
});











