require('dotenv').config()
//importing the model schema
const book = require('../model/Book');
const author = require('../model/Author')
const email = require('../model/emailsubmission')
const admin = require('../model/admin')
const comments = require('../model/comments')
const { submissionvalidation, emailValidation, AdminValidation, loginAdminValidation } = require('../utils/validation')
require('../model/database')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
//the controller to the homepage
exports.homepage = async function (req, res) {
  try {
    const limitnumber = 4;
    const books = await book.find().populate('author').limit(limitnumber).sort({ nameofthebook: 1, rating: 1 });
    const authorlist = await author.find().limit(3)
    const bookslist = books;
    res.render('home', { title: 'homepage', bookslist, authorlist })
  }
  catch (error) {
    res.status(500).send({ message: "server error" });
  }
}
//controller to access the authorpage field
exports.authorpage = async function (req, res) {
  try {
    const abouttheauthor = req.params;
    const authorinfo = await author.findById(abouttheauthor);
    const otherbooks = await book.find({ "author": abouttheauthor }).populate("author");
    res.render('authorpage', { title: 'authorpage', authorinfo, otherbooks })
  }
  catch (error) {
    res.status(500).send({ message: error.message });
  }
}
//controller to access the bookpage
exports.bookpage = async function (req, res) {
  try {
    const books = req.params._id;
    const foundbook = await book.findById(books).populate('author')
    const genre = foundbook.genre;
    const genrefound = await book.find({ "genre": genre }).populate('author');
    const otherbooks = await book.find({}).populate("author").limit(3);
    const comment = await comments.find({"bookId":books}).sort({_id:-1}).populate("userId")
    res.render('book', { title: foundbook.nameofthebook, foundbook, genrefound, otherbooks,comment})
  }
  catch (error) {
    res.status(500).send({ message: "server error" })
  }
}
//random picking of books
exports.random = async function (req, res) {
  try {
    const availablebooks = await book.find().countDocuments();
    const random = Math.floor(Math.random() * availablebooks)
    let chosenbook = await book.findOne().skip(random).populate("author")
    //res.json(chosenbook)
    res.render('random', { title: chosenbook.nameofthebook, chosenbook })
  }
  catch (error) {
    return res.status(500).send("internal server error")
  }
}
//controller to access the genre page
exports.genre = async function (req, res) {
  try {
    const genretolookupto = req.params.genre;
    const genrefound = await book.find({ "genre": genretolookupto }).populate("author");
    res.render('genre', { title: "genre", genrefound });
  }
  catch (error) {
    res.status(500).send({ message: "server error" });
  }
}//


exports.submitpage = async function (req, res) {
  try {
    //creating a flash message object that will be sending
    //messages of success or error when submitting a book

    const infoerrorObj = req.flash('infoerror');
    const successObj = req.flash('success');
    const imageerrorObj = req.flash('imageerror');
    const authorbookvalidationObj = req.flash('authorbookvalidation')

    res.render("submitpage", { title: "submit", infoerrorObj, successObj, imageerrorObj, authorbookvalidationObj })
  }
  catch (error) {
    res.status(500).send(error.message)
  }
}


exports.emailpage = async function (req, res) {
  try {
    const infoerrorObj = req.flash('infoerror');
    const successObj = req.flash('success');
    res.render("signemail", { title: "email page", infoerrorObj, successObj })
  }
  catch (error) {
    res.json(error).send(error)
  }
}

exports.registerAdmin = async function (req, res) {
  try {
    const infoerrorObj = req.flash('infoerror');
    const successObj = req.flash('success');
    res.render("admin", { title: "registerAdmin", infoerrorObj, successObj })
  }
  catch (error) {

    return res.status(500).send('Internal server error')
  }
}

exports.loginAdminPage = async function (req, res) {
  try {
    const infoerrorObj = req.flash('infoerror');
    const successObj = req.flash('success');
    res.render("loginAdmin", { title: "loginAdmin", infoerrorObj, successObj })
  }
  catch (error) {
    return res.status(500).send('Internal server error');
  }
}


//get request end


//post request start


//search page
exports.searchpage = async function (req, res) {
  try {
    const search = req.body.searchTerm;
    const itemsfound = await book.find({ $text: { $search: search, $diacriticSensitive: true } }).populate("author");
    res.render("search", { title: "search results", itemsfound })
  }
  catch (error) {
    res.status(500).send({ message: "server error" })
  }
}
exports.addNew = async function (req, res) {
  try {

    //check for validation for the published book and author details
    //file handling
    let uploadedimagepath;
    let newnameoftheimage; //to ensure unique in the name of the author
    let uploadedimageauthor;
    let imageofthebookuploaded;
    let newnamefortheimage;
    let pathoftheimage;
    //filehandling 
    if (!req.files || Object.keys(req.files) === 0) {
      req.flash('imageerror', 'no image submitted')
      return req.redirect('/submit')
    }
    else {
      //the user has selected an image to upload so we will set sent  it to the server
      //handling the image of the author
      uploadedimageauthor = req.files.imageofauthor;
      newnameoftheimage = Date.now() + uploadedimageauthor.name;  //we will have a unique name for the image
      uploadedimagepath = require('path').resolve('./') + '/public/images/Authors/' + newnameoftheimage;
      console.log(newnameoftheimage)

      //handling the image of the book
      imageofthebookuploaded = req.files.imageofthebook;
      newnamefortheimage = Date.now() + imageofthebookuploaded.name;
      pathoftheimage = require('path').resolve('./') + '/public/images/books/' + newnamefortheimage;

      //write the uploaded image of the author to the server
      uploadedimageauthor.mv(uploadedimagepath, function (error) {
        if (error) {
          req.flash('infoerror', "image failed to load")
          return req.redirect('/submit')
        }
      })

      //write the uploaded image of the book to the server
      imageofthebookuploaded.mv(pathoftheimage, function (error) {
        if (error) {
          return req.flash('infoerror', "book image failed to load")
        }
      })
    }
    //publishing the author details
    const authorData = {
      name: req.body.name,
      twitter: req.body.twitter,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      linkedn: req.body.linkedn,
      biography: req.body.biography,
      awards: req.body.awards,
      authorquotes: req.body.authorquotes,
      image: newnameoftheimage,
    };

    //checking whether the author exists
    const existingAuthor = await author.findOne({ name: authorData.name });

    //if the author does not exist we will add the author
    if (!existingAuthor) {
      const insertedAuthor = await author.insertMany(authorData);

      const bookData = {
        nameofthebook: req.body.nameofthebook,
        imageofthebook: newnamefortheimage,
        publisher: req.body.publisher,
        publishingdate: req.body.publishingdate,
        aboutthebook: req.body.aboutthebook,
        rating: req.body.rating,
        genre: req.body.genre,
        review: req.body.review,
        cost: req.body.cost,
        author: insertedAuthor[0]._id, // Use the inserted author's ID
      };

      await book.insertMany(bookData);

      res.status(201)
      req.flash('success', "Book and author successfully inserted")
      req.redirect('/submit')

    } else {
      const bookData = {
        nameofthebook: req.body.nameofthebook,
        imageofthebook: newnamefortheimage,
        publisher: req.body.publisher,
        publishingdate: req.body.publishingdate,
        aboutthebook: req.body.aboutthebook,
        rating: req.body.rating,
        genre: req.body.genre,
        review: req.body.review,
        cost: req.body.cost,
        author: existingAuthor._id,
      };
      await book.insertMany(bookData);
      res.status(201);
      req.flash('success', "Book successfully inserted for existing author")
      res.redirect('/submit')
    }
  } catch (error) {
    req.flash('authorbookvalidation', error);
    return  res.redirect('/submit')
  }

};

//handle email submission
exports.addEmail = async (req, res) => {
  try {
    const { error } = emailValidation(req.body);
    if (error) {
      req.flash('infoerror', error.details[0].message);
      res.redirect('/signinemail')
    }
    const userEmail = {
      email: req.body.email
    }

    //check if email exisits in the database
    const emailExist = await email.findOne({ email: userEmail.email });
    if (emailExist) {
      req.flash('infoerror', 'email exists');
      return res.redirect('/signinemail');
    }
    else {
      await email.insertMany(userEmail);
      req.flash('success', 'email successfully submitted')
      return res.redirect('/signinemail')
    }
  }
  catch (error) {
    res.status(500);
  }
}
 //handling admin signin
exports.addAdmin = async function (req, res) {
  const { error } = AdminValidation(req.body);
  if (error) {
    req.flash('infoerror', error.details[0].message);
    return res.redirect('/registerAdmin')
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)
  const adminData = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  }
  //check whether the admin exist
  const adminExist = await admin.findOne({ username: adminData.username })
  if (adminExist) {
    req.flash('infoerror', 'admin exists');
    return res.redirect('/registerAdmin');
  }
  else {
    await admin.insertMany(adminData);
    req.flash('success', "successfully registerd as admin");
    return res.redirect('/registerAdmin')
  }
}
 //handling admin login
exports.loginAdmin = async function (req, res) {
  try {
    const { error } = loginAdminValidation(req.body);
    if (error) {
      req.flash('infoerror', error.details[0].message);
      return res.redirect('/loginAdminPage')
    }
    const adminData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    const usernameExist = await admin.findOne({ username: adminData.username });
    const emailExist = await admin.findOne({ email: adminData.email });
    if (!usernameExist || !emailExist) {
      req.flash('infoerror', "username or email does not exist")
      return res.redirect('/loginAdminPage');
    }

    //verify the password provided 

    const verifiedPassword = await bcrypt.compare(req.body.password, usernameExist.password);
    if (!verifiedPassword) {
      req.flash('infoerror', 'username or password is not correct')
      return res.redirect('/loginAdminPage')
    }
    else {

      const AccessToken = jwt.sign({ _id: usernameExist._id }, process.env.ACCESS_SECRET_TOKEN)
      res.cookie('jwtToken', AccessToken,
        {
          httpOnly: true,
          sameSite: 'strict'
        }
      )
      req.flash('success', 'successfully logged in')
      res.redirect('/submit')
    }
  }
  catch (error) {
    res.senddStatus(500)
  }


}



//login admin


exports.postComment = async function (req, res) {
  try {

    const userComment = {
      bookId: req.params.bookId,
      userId: req.user._id,
      comment: req.body.comment
    }

    const comment = await comments.insertMany(userComment)
    console.log(comment.bookId)
    const bookComment = await book.updateOne({"_id":userComment.bookId},{$push:{"comments":comment._id}})
    res.redirect('/books/'+ userComment.bookId)

  }
  catch (error) {
    console.log(error.message)
  }
}

//post request end