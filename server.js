const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const Registeruser = require("./model"); // Ensure this path is correct
const jwt = require("jsonwebtoken");
const middleware = require("./middleware");
const cors = require('cors'); //policy errors rakunda frontend code access cheyadaniki use ayye module or package


const app = express();
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({origin:"*"})) //ee domain name nunchi ayina access chesukodaniki * use chestam, leda particular domain ki access cheyyalante aa domain name mention cheyyali


mongoose
  .connect(
    "mongodb+srv://yarrabattisurekha:surekha@auth.fetw369.mongodb.net/testprojects",
    {
      // No need for useNewUrlParser and useUnifiedTopology options
    }
  )
  .then(() => {
    console.log("DB connection established");
  })
  .catch((err) => {
    console.error("DB connection error:", err);
  });

// Define a root route
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});


app.post("/register", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body; // Expecting details from the user
    console.log("Received data:", {
      username,
      email,
      password,
      confirmpassword,
    });

    let exist = await Registeruser.findOne({ email: email }); // Check if email exists in the database
    console.log("User exists:", exist);

    if (exist) {
      return res.status(400).send("User Already Exists");
    }
    if (password !== confirmpassword) {
      return res.status(400).send("Passwords are not Matching");
    }

    let newUser = new Registeruser({
      username,
      email,
      password,
      confirmpassword,
    });
    await newUser.save();
    res.status(200).send("User Registered Successfully");
  } catch (err) {
    console.log("Error in /register route:", err);
    return res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Something broke!");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await Registeruser.findOne({ email: email });
    if (!exist) {
      return res.status(400).send("User Not Found");
    }
    if (exist.password != password) {
      return res.status(400).send("Invalid Credentials");
    }

    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(
      payload,
      "jwtsecured", //payload is the value of that object like ID

      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});


app.get('/myprofile', middleware,async(req,res)=>{  //middileware handles the token related things
    try{
        let exist = await Registeruser.findById(req.user.id)  //ee id manaku middlware nunchi vastadi
        if (!exist){
            return res.status(400).send("User Not Found!!");
        }
        res.json(exist);

    }catch(err){
        console.log(err)
        return res.status(500).send("Invalid Token!")
    }
})

app.listen(5000, () => {
  console.log("Server running");
});
