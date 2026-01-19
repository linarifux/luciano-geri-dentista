import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../services/api';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const SingleBlog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await API.get(`/blogs/${id}`);
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center"><div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div></div>;
  if (!post) return <div className="h-screen flex items-center justify-center">Articolo non trovato</div>;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-6">
        
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-dark mb-8 font-bold text-xs uppercase tracking-widest transition-colors">
          <ArrowLeft size={14} /> Torna al Blog
        </Link>

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            {post.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-dark mb-8 leading-[1.1]">{post.title}</h1>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 font-medium border-y border-gray-100 py-6">
            <span className="flex items-center gap-2"><User size={16} className="text-primary" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {new Date(post.createdAt).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {post.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 aspect-video">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* Content - Renders HTML */}
        <div 
          className="prose prose-lg prose-headings:font-bold prose-headings:text-dark prose-p:text-gray-600 prose-a:text-primary max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>

      </article>
    </div>
  );
};
export default SingleBlog;