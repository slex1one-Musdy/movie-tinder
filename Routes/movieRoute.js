const express = require("express");
const movieRoute = express.Router();
const Products = require("../Model/productModels");

//Main Page Routes
//@/filmler ---FILMLER----
movieRoute.get("/",async (req,res)=>{

    let query = Products.find({isSeries:false});

    //Searching for names
    if(req.query.name !=null && req.query.name !== ""){
        let query = query.regex("name",new RegExp(req.query.name,"i"))
    };

    //Searching for types


    // if(req.query.name != null && req.query.name !== ""){
    //     searchOptions.name = new RegExp(req.query.name,'i');
    // }
    // const product = await Products.find({isSeries:false},searchOptions);
    const product = await query.exec();
    res.render("films/index",{
      movies:product,
       searchOptions:req.query
    })
 });

//----------------------------------------------------------------------

//--FILM KAYDETME----
movieRoute.post("/filmKaydet", async (req, res) => {

    const {name, director, releaseDate, trailer,
        writers, image, producer, actors, imbdScore, description,
        time, type } = req.body;

    const product =await Product.create({
        name,
        director,
        releaseDate,
        trailer,
        writers,
        image,
        producer,
        actors,
        imbdScore,
        description,
        time,
        type
    });

    res.send({
        message:`${product.name} is added`
    });
});

//Exporting the route
module.exports = movieRoute; 