var express = require('express');
const Register = require('./models/Register');
var Signup = express.Router();

// POST route for user signup
Signup.post('/', async function(req, res, next) {
    try {
        const { username, name, email, password } = req.body;
        console.log('Received data:', { username, name, email, password });
        const usernamefind=await Register.findOne({username:username})
        const emailfind=await Register.findOne({username:email})
        console.log(usernamefind,!!emailfind)
if (usernamefind||emailfind) {
    console.log("first")
    res.status(200).json({
        error:true,
        message: 'Please try with another Email or Username',
    
      
    });
}
else{
    if (name!=""&&email!=""&&password!=""&&username!="") {
        const newUser = new Register({
            username,
            name,
            email,
            password
        });
        
        // Optionally log the user object to check
        console.log('New user object:', newUser);
        
        // Save the new user to the database
        await newUser.save();
        
        // Assuming generateAuthToken is a method on your model that generates a JWT token
        const token = await newUser.generateAuthToken();
        console.log('User created:', newUser);
        console.log('Generated Token:', token);
        
        // Send a response with the new user's data and the token
        res.status(201).json({
            message: 'User created successfully',
            user: {
                username: newUser.username,
                name: newUser.name,
                email: newUser.email
            },
            token: token
        });
    }
    else{

        res.status(200).json({
            error:true,
            message: 'field cant be empty',
        
          
        });
    }
 // Create a new user object from the Register model


}
       

    } catch (error) {
        console.error("Signup error:", error.errorResponse);

        // Handle errors and send response with appropriate HTTP status code
        res.status(500).json({
            message: 'Error occurred during signup',
            error: error.message
        });
    }
});

module.exports = Signup;
