import asyncHandler from '../middleware/asyncHandler.js';
import Blog from '../models/blogModel.js';

// @desc    Fetch all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.json(blogs);
});

// @desc    Fetch single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error('Articolo non trovato');
  }
});

// @desc    Create a blog post
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  // Note: 'image' is NOT in req.body anymore, it's in req.file
  const { title, category, content, author, readTime } = req.body;

  // Validation
  if (!req.file) {
    res.status(400);
    throw new Error('Immagine di copertina richiesta');
  }

  const image = req.file.path; // Cloudinary URL

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const blog = new Blog({
    title,
    slug,
    image, // Save the Cloudinary URL
    category,
    content,
    author,
    readTime
  });

  const createdBlog = await blog.save();
  res.status(201).json(createdBlog);
});

// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.deleteOne();
    res.json({ message: 'Articolo rimosso' });
  } else {
    res.status(404);
    throw new Error('Articolo non trovato');
  }
});

export { getBlogs, getBlogById, createBlog, deleteBlog };