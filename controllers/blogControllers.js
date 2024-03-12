const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

//get all blogs

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user');
    if (!blogs) {
      return res.status(200).send({
        success: false,
        msg: "No blogs found",
      });
    }

    return res.status(200).send({
      success: true,
      blogCount: blogs.length,
      msg: "All blog lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: "Error while getting blogs",
      error,
    });
  }
};

// create blog

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    // Validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        msg: "Provide all fields, including the user field",
      });
    }

    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Create a new blog
    const newBlog = new blogModel({ title, description, image, user });

    // Save the blog
    await newBlog.save();

    // Update the user's blogs array
    existingUser.blogs.push(newBlog);
    await existingUser.save();

    return res.status(201).send({
      success: true,
      msg: "Blog created successfully",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error while creating blog",
    });
  }
};

// update blog

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    // const { title, description, image } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      msg: "blog updated",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error while updating blogs",
      error,
    });
  }
};

// get single blog

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(400).send({
        success: false,
        msg: "blog not found on this id.",
      });
    }

    return res.status(200).send({
      success: true,
      msg: "fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error while getting blog",
      error,
    });
  }
};

//delete blog

exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");

    if (!blog) {
      return res.status(404).send({
        success: false,
        msg: "Blog not found",
      });
    }

    // Check if the blog has a related user
    if (blog.user) {
      // Remove the blog from the user's blogs array
      blog.user.blogs.pull(blog);
      await blog.user.save();
    }

    return res.status(200).send({
      success: true,
      msg: "blog deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error while deleting blog",
      error,
    });
  }
};

// get || user blog
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found with this user",
      });
    }

    return res.status(200).send({
      success: true,
      message: "user blogs",
      userBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      msg: "Error in user blog",
      error,
    });
  }
};
