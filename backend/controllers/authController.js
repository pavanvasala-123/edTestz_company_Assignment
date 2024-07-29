const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secretkey = "pavankumar123";

// exports.signup = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ where: { username } })
//     if(existingUser){
//       return res.status(200).json({ message: "Username already  exists" });
//     }
//     console.log(existingUser)
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, password: hashedPassword });
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "User creation failed" });
//   }
// };


exports.signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error('User creation failed:', error); // Log the error for debugging
    res.status(500).json({ error: "User creation failed" });
  }
};


exports.signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if(!user){
      return res.status(401).json({ error: "User is not registered" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user.id }, secretkey, {
        expiresIn: "1h",
      });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Signin failed" });
  }
};
