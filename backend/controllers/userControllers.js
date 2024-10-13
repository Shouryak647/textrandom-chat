const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

//@description     Get or Search all users
//@route           GET /api/user?search=
//@access          Public
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        // { email: { $regex: req.query.search, $options: "i" } },
        { gender: { $eq: req.query.search } },
      ],
    }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});


const getallUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users); // Send the users as a JSON response
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }

}
);


//@description     Register new user
//@route           POST /api/user/
//@access          Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, gender, age, password, pic } = req.body;

  if (!name || !email || !gender || !age || !password) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Capture IP address from the request headers or connection
  let ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // If 'x-forwarded-for' has multiple addresses, take the first one (real IP)
  if (ipAddress.includes(',')) {
    ipAddress = ipAddress.split(',')[0];
  }

  const user = await User.create({
    name,
    email,
    gender,
    age,
    password,
    pic,
    ipAddress,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age,
      isAdmin: user.isAdmin,
      pic: user.pic,
      ipAddress: user.ipAddress,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      age: user.age,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find and delete the user
    const user = await User.findByIdAndDelete(userId);

    // If user is not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return success response
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};


module.exports = { allUsers, getallUsers, registerUser, authUser, deleteUser };
