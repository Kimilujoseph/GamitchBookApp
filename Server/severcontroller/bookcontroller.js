
require('../model/database');
const model = require('../model/model');
const model2 = require('../model/model2')




exports.homepage = async function(req,res){
 try{
    const limitNumber = 5;
     const categories = await model.find({}).limit(limitNumber)
     const books = await model2.find({}).sort({"Rating":-1}).limit(1);
     const latest = await model2.find({}).sort({_id:-1}).limit(6);
     res.render('home',{title:"Homepage",categories,books,latest});
 }
 catch(error){
    res.status(500).send({message:error.message || "an error has occured"})
 }
}

exports.categories = async function(req,res){
   try {
    const categories = await model.find({})
    res.render('categories',{title:"Categories",categories});
   } catch (error) {
       res.status(500).send({message:error.message || "an error has occured"})
   }
}

exports.morebooks = async function(req,res){
    try{
        const allbooks = await model2.find({}).sort({_id:1});
        res.render("morepage",{title:"MoreBooks",allbooks})
    }
    catch(error){
        res.status(500).send({message:error.message} || "an error has just occured")
    }
}


exports.descriptionofthebook = async function(req,res){
    try{
        const bookid = req.params;
        const specifiedbook = await model2.findById(bookid)
        res.render("description",{title:specifiedbook.Nameofthebook,specifiedbook})
    }
    catch(error){
        res.status(500).send({message:error.message} ||  "error has just occured inside the server")
    }
}





























async function insertdummydata(){
    try{
         await model2.insertMany([
             {
                 "Nameofthebook":"book32",
                "Image":"book32.jpg",
                "Author":"Lewis Joshua",
                 "Publisher":"targeter@company",
                 "PublishingDate":"2013-05-05",
                 "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                "Categories_NameoftheCategory":"Romance",
                "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "8.93",
                 "Cost":"ksh 3000"
             },
             {
                "Nameofthebook":"book17",
                "Image":"book17.jpg",
                 "Author":"Lewis Mark",
                 "Publisher":"targeter@company",
                "PublishingDate":"2013-05-05",
                 "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Categories_NameoftheCategory":"Thrillers",
                "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "9.93",
                 "Cost":"ksh 3500"
            },
             {
                 "Nameofthebook":"book12",
                 "Image":"book12.jpg",
                 "Author":"Alex Joshua",
                 "Publisher":"targeter@company",
                 "PublishingDate":"2013-05-05",
                 "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Categories_NameoftheCategory":"Fictions",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "7.93",
                 "Cost":"ksh 2500"
             }, {
                 "Nameofthebook":"book4",
                 "Image":"book4.jpg",
                 "Author":"Mitchelle Faith",
                "Publisher":"targeter@company",
                 "PublishingDate":"2013-05-05",
                 "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Categories_NameoftheCategory":"Horror",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "8.93",
                 "Cost":"ksh 4500"
             }, {
                 "Nameofthebook":"book23",
                 "Image":"book23.jpg",
                 "Author":"Gamitch Tokodi",
                 "Publisher":"targeter@company",
                 "PublishingDate":"2013-05-05",
                "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                "Categories_NameoftheCategory":"Crime",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "8.93",
                 "Cost":"ksh 3000"
             },
             {
                "Nameofthebook":"book15",
                 "Image":"book15.jpg",
                "Author":"Edwin Pascal",
                 "Publisher":"targeter@company",
                 "PublishingDate":"2013-05-05",
                 "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Categories_NameoftheCategory":"Fictions",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "9.0",
                 "Cost":"ksh 4000"
            },
             {
                 "Nameofthebook":"book24",
                 "Image":"book24.jpg",
                 "Author":"Lewis Joshua",
                "Publisher":"targeter@company",
                "PublishingDate":"2013-05-05",
                "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Categories_NameoftheCategory":"Crime",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                "Rating": "8.93",
                "Cost":"ksh 3900"
             },
             {
                "Nameofthebook":"book19",
                "Image":"book35.jpg",
                 "Author":"Kimilu Joseph",
                 "Publisher":"targeter@company",
                 "PublishingDate":"2013-05-05",
                 "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Categories_NameoftheCategory":"Thrillers",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                 "Rating": "8.93",
                 "Cost":"ksh 4000"
            },
            {
                "Nameofthebook":"book10",
                 "Image":"book32.jpg",
                 "Author":"Anita Web",
                 "Publisher":"targeter@company",
                "PublishingDate":"2013-05-05",
                "Description":"An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common and,An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                "Categories_NameoftheCategory":"Self-Improvement",
                 "Review":"An extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common andAn extensive class of modifiers exists for manipulating arrays. Arrays are common and",
                "Rating": "8.93",
                 "Cost":"ksh 3000"
             },
            
         ])
    }
    catch(error){
         console.log(error);
    }
 }

 //insertdummydata()















































































































// async function run(){
//     try {
//        await model.insertMany([
//          {
//              "Nameofthecategory":"Horror",
//              "Image":"book1.jpg",
//              "Books":["book1","book2","book2","book4","book5"]
//         },
//         {
//             "Nameofthecategory":"Self-Improvement",
//             "Image":"book7.jpg",
//             "Books":["book6","book7","book8","book9","book10"]
//          },
//         {
//             "Nameofthecategory":"Fictions",
//             "Image":"book11.jpg",
//              "Books":["book11","book12","book13","book14","book15"]
//         },
//         {
//             "Nameofthecategory":"Thrillers",
//            "Image":"book16.jpg",
//             "Books":["book16","book17","book18","book19","book20"]
//         },
//         {
//             "Nameofthecategory":"Crime",
//              "Image":"book21.jpg",
//             "Books":["book22","book23","book24","book25","book26"]
//          },
//         {
//             "Nameofthecategory":"Romance",
//              "Image":"book31.jpg",
//             "Books":["book31","book32","book32","book34","book35"]
//          }
//        ])

//    } catch (error) {
//        console.log(error)
//     }
//  }

//  run()