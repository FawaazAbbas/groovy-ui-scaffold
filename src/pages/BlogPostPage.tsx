import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Loader2, ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { type BlogPost } from './BlogPage';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      if (!isSupabaseConfigured || !slug) {
        setLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Error fetching post:', error);
      } else if (data) {
        setPost(data as BlogPost);
      }
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C800DF]" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Post not found</h1>
        <p className="text-text-secondary mb-8">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn-gradient px-6 py-2.5 text-sm font-medium inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Very basic markdown parsing for our dummy content
  const renderContent = (content: string) => {
    const lines = content.split('\\n');
    return lines.map((line, i) => {
      if (line.startsWith('## ')) {
        return <h2 key={i} className="text-2xl font-bold text-text-primary mt-12 mb-6">{line.replace('## ', '')}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-bold text-text-primary mt-8 mb-4">{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('- ')) {
        return <li key={i} className="text-text-secondary ml-4 mb-2">{line.replace('- ', '')}</li>;
      }
      if (line.match(/^[0-9]+\. /)) {
        return <ol key={i} className="text-text-secondary list-decimal ml-6 mb-2"><li>{line.replace(/^[0-9]+\. /, '')}</li></ol>;
      }
      if (line.trim() === '') {
        return <div key={i} className="h-4"></div>;
      }
      // Parse bold text
      const withBold = line.split(/\\*\\*(.*?)\\*\\*/g).map((part, j) => 
        j % 2 === 1 ? <strong key={j} className="text-text-primary">{part}</strong> : part
      );
      // Parse italic text
      const withItalic = withBold.map((part, j) => {
        if (typeof part !== 'string') return part;
        return part.split(/\\*(.*?)\\*/g).map((p, k) => 
          k % 2 === 1 ? <em key={k} className="text-text-primary font-medium">{p}</em> : p
        );
      });
      return <p key={i} className="text-lg text-text-secondary leading-relaxed mb-6">{withItalic}</p>;
    });
  };

  return (
    <article className="pb-24">
      {/* Hero */}
      <div className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-surface-solid/80 z-0" />
        {post.cover_image && (
          <div className="absolute inset-0 z-[-1] opacity-20">
            <img src={post.cover_image} alt="" className="w-full h-full object-cover blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
          </div>
        )}
        
        <div className="container relative z-10 mx-auto max-w-4xl px-6">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors mb-10">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-tight leading-tight mb-8">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-text-secondary border-t border-border pt-8">
            <div className="flex items-center gap-3">
              {post.author_avatar && (
                <img src={post.author_avatar} alt={post.author_name} className="h-10 w-10 rounded-full ring-2 ring-white/10" />
              )}
              <div className="flex flex-col">
                <span className="text-text-primary">{post.author_name}</span>
                <span className="text-xs">Author</span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-border hidden sm:block"></div>
            
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#C800DF]" />
                {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#C800DF]" />
                {post.read_time} min read
              </span>
            </div>

            <button className="sm:ml-auto flex items-center gap-2 hover:text-text-primary transition-colors">
              <Share2 className="h-4 w-4" /> Share
            </button>
          </div>
        </div>
      </div>

      {post.cover_image && (
        <div className="container mx-auto max-w-5xl px-6 mb-16 -mt-8 relative z-20">
          <div className="rounded-3xl overflow-hidden shadow-glass-xl border border-white/10 aspect-[2/1] bg-surface-elevated animate-in fade-in slide-in-from-bottom-8 duration-700">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto max-w-3xl px-6">
        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </div>
    </article>
  );
}
