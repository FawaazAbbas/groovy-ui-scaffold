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
    <div className="container mx-auto max-w-5xl px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
          The <span className="font-monoton text-primary font-normal mx-3" style={{ fontSize: 'inherit', display: 'inline' }}>Groovy</span> Blog
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
          Insights, guides, and stories from the frontier of enterprise AI automation.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 glass-card glass-shimmer rounded-2xl">
          <p className="text-text-secondary">No blog posts yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group glass-card glass-shimmer rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface-elevated">
                {post.cover_image ? (
                  <img
                    src={post.cover_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                    <span className="font-monoton text-primary text-4xl opacity-30">G</span>
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs font-medium text-text-secondary mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.read_time} min read
                  </span>
                </div>

                <h2 className="text-lg font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>

                <p className="text-sm text-text-secondary line-clamp-3 mb-5 flex-1 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    {post.author_avatar ? (
                      <img src={post.author_avatar} alt={post.author_name} className="h-7 w-7 rounded-full" />
                    ) : (
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {post.author_name.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs font-medium text-text-primary">{post.author_name}</span>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="h-3.5 w-3.5" />
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
