const Blog = require('../models/Blog');
exports.getAllBlogs = async (req, res) => {
    try{
        const blog = await Blog.find();
        res.status(200).json(blog);
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
};
exports.createBlog = async (req, res) => {
    try{
        const {title, body} = req.body;
        const newBlog = new Blog({title, body});
        const savedBlog = await newBlog.save();
        res.status(201).json({success: true, data: savedBlog});
    }
    catch (error) {
        res.status(400).json({message: error.Blogmessage});
    }
}