import mongoose from 'mongoose';

const blogSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // URL friendly version of title
    image: { type: String, required: true }, // URL of the featured image
    category: { type: String, required: true },
    content: { type: String, required: true }, // Stores HTML from Rich Text Editor
    author: { type: String, required: true },
    readTime: { type: String, default: '5 min' },
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;