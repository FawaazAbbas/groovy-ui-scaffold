import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Loader2, Calendar, Clock, ArrowRight } from 'lucide-react';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author_name: string;
  author_avatar: string;
  read_time: number;
  published_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      if (!isSupabaseConfigured) {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
      } else if (data) {
        setPosts(data as BlogPost[]);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C800DF]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl px-6 py-24">
      <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary mb-6">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C800DF] to-[#2E00FF]">Groovy</span> Blog
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Insights, guides, and stories from the frontier of enterprise AI automation.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 glass-card glass-shimmer rounded-3xl">
          <p className="text-text-secondary">No blog posts found. Check your database connection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.slug}`}
              className="group glass-card glass-shimmer rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-glass-lg hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#C800DF]/20 to-[#2E00FF]/20" />
                )}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-medium text-text-secondary mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.read_time} min read
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-[#C800DF] transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-sm text-text-secondary line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border">
                  <div className="flex items-center gap-2.5">
                    {post.author_avatar ? (
                      <img src={post.author_avatar} alt={post.author_name} className="h-8 w-8 rounded-full ring-2 ring-white/10" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {post.author_name.charAt(0)}
                      </div>
                    )}
                    <span className="text-sm font-medium text-text-primary">{post.author_name}</span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-elevated text-text-secondary group-hover:bg-[#C800DF] group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
