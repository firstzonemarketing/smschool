import { assetUrl } from '../lib/assetUrl';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ZoomIn, LayoutGrid, Columns3, Images, Loader2 } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { SectionHeader } from '../components/MotionPrimitives';
import { Lightbox } from '../components/Lightbox';
import {
  fetchGalleryCategories,
  fetchPublishedGalleryImages,
} from '../services/schoolService';
import type { GalleryCategory, GalleryImage } from '../types/database';

const PAGE_SIZE = 18;

export function GalleryPage() {
  const [categories, setCategories] = useState<GalleryCategory[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid'>('masonry');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([fetchGalleryCategories(), fetchPublishedGalleryImages()]).then(
      ([cats, { images: imgs }]) => {
        if (!mounted) return;
        setCategories(cats);
        setImages(imgs);
        setLoading(false);
      }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const filteredImages = useMemo(() => {
    const q = search.trim().toLowerCase();
    return images.filter((img) => {
      const matchesCat =
        activeCategory === 'all' ||
        img.category_id === activeCategory ||
        img.category?.slug === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        img.title.toLowerCase().includes(q) ||
        img.description.toLowerCase().includes(q) ||
        (img.category?.name.toLowerCase().includes(q) ?? false)
      );
    });
  }, [images, activeCategory, search]);

  const visibleImages = useMemo(
    () => filteredImages.slice(0, visibleCount),
    [filteredImages, visibleCount]
  );

  function handleSelectCategory(catKey: string) {
    setActiveCategory(catKey);
    setVisibleCount(PAGE_SIZE);
    setLightboxIdx(null);
  }

  return (
    <>
      <SEOHead
        title="Event & Campus Gallery"
        description="Browse authentic photographs of SM English School in Hoodi, Bangalore — school events, classroom activities, sports, cultural programs, celebrations, and campus facilities."
        image={assetUrl('/assets/events/event-morning-assembly-aerial.jpg')}
      />

      {/* Header */}
      <section className="bg-warm-mesh pt-14 pb-12 lg:pt-20 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeader
            eyebrow="Dynamic Event Gallery"
            title="Life at SM English School in Pictures"
            description="Explore joyful moments from our classrooms, sports field, cultural celebrations, and hands-on learning programs."
            accent="sunshine"
          />

          {/* Filter Bar */}
          <div className="mt-10 space-y-5">
            {/* Category Pills */}
            <div
              role="tablist"
              aria-label="Gallery categories"
              className="flex flex-wrap justify-center gap-2.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                onClick={() => handleSelectCategory('all')}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0284C7] hover:text-[#0284C7]'
                }`}
              >
                All Photos ({images.length})
              </button>

              {categories.map((cat) => {
                const count = images.filter(
                  (i) => i.category_id === cat.id || i.category?.slug === cat.slug
                ).length;
                const isSelected = activeCategory === cat.id || activeCategory === cat.slug;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                      isSelected
                        ? 'bg-[#0284C7] text-white shadow-md'
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-[#0284C7] hover:text-[#0284C7]'
                    }`}
                  >
                    {cat.name}
                    {count > 0 && <span className="ml-1.5 opacity-75">({count})</span>}
                  </button>
                );
              })}
            </div>

            {/* Search & Layout Toggle */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  placeholder="Search events, yoga, Montessori, sports..."
                  aria-label="Search gallery photographs"
                  className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-slate-200 text-sm text-[#0F172A] placeholder:text-slate-400 shadow-xs focus:border-[#0284C7] focus:ring-4 focus:ring-sky-100 transition-all"
                />
              </div>

              <div className="inline-flex self-center p-1 rounded-full bg-white border border-slate-200 shadow-xs">
                <button
                  type="button"
                  onClick={() => setLayoutMode('masonry')}
                  aria-label="Masonry layout"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    layoutMode === 'masonry'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  Masonry
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode('grid')}
                  aria-label="Uniform grid layout"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all ${
                    layoutMode === 'grid'
                      ? 'bg-[#0F172A] text-white'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16 bg-white min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#0284C7]" />
              <p className="text-sm font-medium">Loading SM English School gallery...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="py-20 text-center max-w-md mx-auto space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Images className="w-7 h-7" />
              </div>
              <h2 className="font-display text-xl font-bold text-[#0F172A]">No photos found</h2>
              <p className="text-sm text-slate-600">
                Try choosing another category or clearing your search keyword.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveCategory('all');
                  setSearch('');
                }}
                className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0284C7] text-white text-xs font-bold"
              >
                Show All Photos
              </button>
            </div>
          ) : (
            <>
              <div
                className={
                  layoutMode === 'masonry'
                    ? 'masonry-columns'
                    : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
                }
              >
                {visibleImages.map((img, idx) => (
                  <motion.article
                    key={img.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: Math.min((idx % 9) * 0.04, 0.32) }}
                    className={layoutMode === 'masonry' ? 'masonry-item' : ''}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIdx(idx)}
                      className="group relative block w-full text-left rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/70 shadow-sm hover:shadow-card-hover transition-all"
                    >
                      <div className={layoutMode === 'grid' ? 'aspect-[4/3] overflow-hidden' : 'overflow-hidden'}>
                        <img
                          src={img.image_url}
                          alt={img.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      {/* Subtle always-readable bottom caption bar on hover + mobile friendly info */}
                      <div className="p-4 bg-white">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            {img.category?.name && (
                              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#0284C7]">
                                {img.category.name}
                              </span>
                            )}
                            <h3 className="font-display text-base font-bold text-[#0F172A] leading-snug mt-0.5">
                              {img.title}
                            </h3>
                            {img.description && (
                              <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                                {img.description}
                              </p>
                            )}
                          </div>
                          <span className="w-8 h-8 rounded-full bg-sky-50 text-[#0284C7] group-hover:bg-[#0284C7] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                            <ZoomIn className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </button>
                  </motion.article>
                ))}
              </div>

              {/* Load More Pagination */}
              {visibleCount < filteredImages.length && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F172A] hover:bg-[#0284C7] text-white font-bold text-sm shadow-md transition-all"
                  >
                    Load More Photos ({filteredImages.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Lightbox
        images={visibleImages}
        currentIndex={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onChangeIndex={setLightboxIdx}
      />
    </>
  );
}
