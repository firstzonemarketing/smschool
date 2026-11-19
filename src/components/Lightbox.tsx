import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../types/database';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onChangeIndex }: LightboxProps) {
  const isOpen = currentIndex !== null && images[currentIndex] !== undefined;
  const active = isOpen ? images[currentIndex] : null;

  useEffect(() => {
    if (!isOpen || currentIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onChangeIndex((currentIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') onChangeIndex((currentIndex - 1 + images.length) % images.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, currentIndex, images.length, onClose, onChangeIndex]);

  return (
    <AnimatePresence>
      {isOpen && active && currentIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#0F172A]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={onClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo preview"
            className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Counter */}
          <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChangeIndex((currentIndex - 1 + images.length) % images.length);
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Main Image Card */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900 max-h-[74vh] flex items-center justify-center">
              <img
                src={active.image_url}
                alt={active.title}
                className="max-h-[74vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="mt-5 text-center max-w-2xl px-4">
              {active.category?.name && (
                <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider mb-2">
                  {active.category.name}
                </span>
              )}
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                {active.title}
              </h3>
              {active.description && (
                <p className="mt-1.5 text-sm sm:text-base text-slate-300 leading-relaxed">
                  {active.description}
                </p>
              )}
            </div>
          </motion.div>

          {/* Next */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChangeIndex((currentIndex + 1) % images.length);
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
