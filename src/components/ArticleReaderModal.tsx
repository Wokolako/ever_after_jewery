import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { X } from 'lucide-react';

interface ArticleReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

/**
 * Shared full-article reader. Used by the Journal page and by the
 * Journal carousel on the home page so a story can be read from either place.
 */
export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ post, onClose }) => {
  // Close on Escape and lock background scroll while the reader is open.
  useEffect(() => {
    if (!post) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
    >
      <div
        className="bg-[#FAF8F5] dark:bg-[#121110] w-full max-w-3xl rounded-xl border border-[#D5CDC4] dark:border-[#2C2926] shadow-2xl overflow-hidden my-8 relative max-h-[90vh] flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E8E1D9] dark:border-[#262320] flex items-center justify-between bg-[#FFFFFF] dark:bg-[#181614]">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8C827A] dark:text-[#A69C94]">
            {post.category} • {post.readTime}
          </span>
          <button
            onClick={onClose}
            aria-label="Close article"
            className="p-1.5 text-[#57534E] dark:text-[#D5CDC4] hover:text-[#1A1918] dark:hover:text-[#F5F2ED] hover:bg-[#F2ECE4] dark:hover:bg-[#23201D] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1918] dark:text-[#F5F2ED] leading-tight font-normal">
            {post.title}
          </h2>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-[#78716C] dark:text-[#A69C94] pb-4 border-b border-[#E8E1D9] dark:border-[#262320] font-medium">
            <span className="font-bold text-[#1A1918] dark:text-[#F5F2ED]">{post.author}</span>
            <span>({post.authorRole})</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <div className="rounded-lg overflow-hidden h-72 border border-[#E8E1D9] dark:border-[#262320]">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-stone dark:prose-invert max-w-none text-sm sm:text-base text-[#44403C] dark:text-[#D5CDC4] space-y-4 font-light leading-relaxed">
            {post.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="p-5 bg-[#FFFFFF] dark:bg-[#181614] border border-[#E8E1D9] dark:border-[#262320] rounded-lg mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#8C827A] dark:text-[#A69C94] block font-bold">Have questions about this piece?</span>
              <span className="text-sm sm:text-base font-serif text-[#1A1918] dark:text-[#F5F2ED]">Consult directly with {post.author.split(',')[0]}</span>
            </div>
            <a
              href={`mailto:consult@yosenamora.com?subject=Inquiry regarding: ${post.title}`}
              className="px-5 py-2.5 bg-[#1A1918] dark:bg-[#F5F2ED] text-[#FAF8F5] dark:text-[#1A1918] text-xs sm:text-sm uppercase tracking-wider rounded font-bold hover:bg-[#33312E] dark:hover:bg-[#E3DDD4] transition-colors"
            >
              Email Author Desk
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
