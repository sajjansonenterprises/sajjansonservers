var express = require('express');
const Register = require('./models/Register');
const bcrypt = require("bcrypt");


var Login = express.Router();


/* GET users listing. */
 
Login.post('/', async function(req, res, next) {


  try {
    let {email,password} = req.body
    email = email.replace(/\s/g, "").trim();
  password =password.trim().replace(/\s/g, "");
    const userdata2=await Register.find({}).select("-_id").select("-friendlist")
 const veryfyuernames = []
 for (let index in userdata2) {
    veryfyuernames.push(userdata2[index].email)
 }
if (!veryfyuernames.includes(email)){
  return res.status(400).json({ error: 'Credential not match' });
  

}
else{

  const user = await Register.findOne({email:email})
  
  const ismatch = await bcrypt.compare(password, user.password)

 
  const token = await user.generateAuthToken();

  

  if(ismatch)  {
    
    res.status(201).json({success:"Login Successful",token})
    
  }
  
  else{
res.status(400).json({ error: 'Credential not match' });
  
 
  }
}
 
  } catch (error) {
    console.log("this is err at login ", error)
  }
  
});


//chat app logic



module.exports = Login;
// module.exports = {sendemail