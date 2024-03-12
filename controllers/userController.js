const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

//registered user
exports.registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //validation
    if (!username || !email || !password) {
      return res.status(400).send({
        msg: "Please fill all the fields",
      });
    }
    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success:false,
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      success: true,
      msg: "new user created",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error during registration",
      success: false,
      error,
    });
  }
};

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    return res.status(200).send({
      userCount: users.length,
      success: true,
      message: "all users data",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in get all user",
      error,
    });
  }
};

//login user
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        msg: "please provide both email and password ",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        msg: "Email is not registered",
      });
    }

    //password matching
    const isMAtch = await bcrypt.compare(password, user.password);
    if (!isMAtch) {
      return res.status(401).send({
        success: false,
        msg: "Invalid username or password. try again...!",
      });
    }

    return res.status(200).send({
      success: true,
      msg: "Login succesfully",
      user: {
        _id: user._id
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error in login user",
      success: false,
      error,
    });
  }
};
