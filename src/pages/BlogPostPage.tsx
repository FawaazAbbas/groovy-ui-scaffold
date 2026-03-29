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
      <div className="container mx-auto max-w-4xl px-6 py-24 text-center">
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
    <article className="container mx-auto max-w-4xl px-6 py-24">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <div className="flex items-center gap-3 text-xs font-medium text-text-secondary mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-primary" />
            {post.read_time} min read
          </span>
        </div>

        <h1 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-text-primary tracking-tight leading-[1.15] mb-6">
          {post.title}
        </h1>

        <div className="flex items-center justify-between pt-6 border-t border-border/60">
          <div className="flex items-center gap-3">
            {post.author_avatar ? (
              <img src={post.author_avatar} alt={post.author_name} className="h-9 w-9 rounded-full" />
            ) : (
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {post.author_name.charAt(0)}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text-primary">{post.author_name}</span>
              <span className="text-xs text-text-secondary">Author</span>
            </div>
          </div>

          <button className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>

      {post.cover_image && (
        <div className="mb-12">
          <div className="rounded-2xl overflow-hidden aspect-[2/1] bg-surface-elevated">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto">
        <div className="max-w-none">
          {renderContent(post.content)}
        </div>
      </div>
    </article>
  );
}
