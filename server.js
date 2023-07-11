
require('dotenv').config();
const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient
app.use(express.json())
app.use(cors());

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));

//const source = process.env.ATLAS_CONNECTION;
mongoose.connect('mongodb+srv://aishwarya:aishwaryapass@cluster0.fah4o06.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



  const {userRoutes, router} = require('./controllers/user.controller');
  app.use('/users', router);
  //const userdb = require('../models/user.model')
  const connection = mongoose.connection;
  connection.once('open',()=>{
    console.log("DB Connected")
  })
  const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`); 
  });

  app.post('/attend',async (req,res)=>{
    const {email, password1} = req.body;
    console.log(email);
    console.log(password1);
    try {
        let data = await userRoutes.findOne({ email :email });
        if (data) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'User exists' }] });
          }
          const Data = userRoutes.save({
            password1,
            email
          });
        //  const storedata= await Data.save();
         console.log(Data);
          //res.json("added success fully");
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
    // return res.redirect('aftersignuppage.html');
   return res.json({msg: "success"})
});
//module.exports = User = mongoose.model('users',Schema);

/*
app.post('/sign_up', async(req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var data = {
    email: email,
    password: password
  };

  connection.collection('details1').insertOne(data, (err, collection) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error occurred during sign-up.');
    }

    console.log('Record inserted successfully');
    return res.redirect('aftersignuppage.html');
  });
}).catch((err) => {
   console.error('DB connection error:', err);
     process.exit(1); 
   });
*/
/*app.get('/',function(req,res){
  res.set({
      'Access-control-Allow-Origin': '*'
      });
  return res.redirect('signuppage.html');
  }).listen(6969)

*/

