import React, { useState, useEffect } from 'react';
import { BLOG_POSTS } from '../data/content';
import { BlogPost } from '../types';
import { BookOpen, Clock, Calendar, ArrowRight, User, X, Share2, Sparkles } from 'lucide-react';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Ethical Sourcing', 'Gemology', 'Market Intelligence'];

  // Close the article reader on Escape and lock background scroll while it is open.
  useEffect(() => {
    if (!selectedPost) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedPost]);

  const filteredPosts = filterCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === filterCategory);

  return (
    <div className="py-12 lg:py-20 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C827A] font-semibold">
            Gemological Journal &amp; Market Intelligence
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#1A1918]">
            The Somuchaura Gazette
          </h1>
          <p className="text-sm sm:text-base text-[#57534E] font-light leading-relaxed">
            Scholarly insights into rare unheated corundum, Type IIa diamond crystallisation, ethical extraction economics, and advisory for bespoke fine jewellers.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                filterCategory === cat
                  ? 'bg-[#1A1918] text-[#FAF8F5] font-semibold'
                  : 'bg-[#FFFFFF] border border-[#E0D8CE] text-[#57534E] hover:border-[#1A1918]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-[#FFFFFF] border border-[#E8E1D9] rounded-xl overflow-hidden hover:border-[#1A1918] hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-[#1A1918]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 px-2.5 py-1 rounded text-[10px] uppercase font-bold tracking-wider text-[#1A1918]">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-[#8C827A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1A1918] group-hover:text-[#635E59] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#57534E] font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#FAF8F5]">
                <div className="flex items-center justify-between pt-4 border-t border-[#F2ECE4]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E0D8CE] flex items-center justify-center text-[10px] font-bold text-[#1A1918]">
                      {post.author.charAt(0)}
                    </div>
                    <span className="text-xs text-[#57534E] font-medium">{post.author}</span>
                  </div>
                  <span className="text-xs text-[#C5A880] group-hover:text-[#1A1918] flex items-center gap-1 font-semibold">
                    Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedPost && (
          <div
            onClick={() => setSelectedPost(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedPost.title}
            className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          >
            <div 
              className="bg-[#FAF8F5] w-full max-w-3xl rounded-xl border border-[#D5CDC4] shadow-2xl overflow-hidden my-8 relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-[#E8E1D9] flex items-center justify-between bg-[#FFFFFF]">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8C827A]">
                  {selectedPost.category} • {selectedPost.readTime}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="p-1.5 text-[#57534E] hover:text-[#1A1918] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-[#78716C] pb-4 border-b border-[#E8E1D9]">
                  <span className="font-semibold text-[#1A1918]">{selectedPost.author}</span>
                  <span>({selectedPost.authorRole})</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>

                <div className="rounded-lg overflow-hidden h-72">
                  <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                </div>

                <div className="prose prose-stone max-w-none text-sm text-[#44403C] space-y-4 font-light leading-relaxed">
                  {selectedPost.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="p-4 bg-[#FFFFFF] border border-[#E8E1D9] rounded-lg mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8C827A] block">Have questions about this piece?</span>
                    <span className="text-sm font-serif text-[#1A1918]">Consult directly with {selectedPost.author.split(',')[0]}</span>
                  </div>
                  <a
                    href={`mailto:consult@yosenamora.com?subject=Inquiry regarding: ${selectedPost.title}`}
                    className="px-4 py-2 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-wider rounded font-semibold hover:bg-[#33312E] transition-colors"
                  >
                    Email Author Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
