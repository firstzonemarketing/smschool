import { apiRequest } from '../lib/api';
import { DEFAULT_GALLERY_CATEGORIES, SEED_GALLERY_IMAGES } from '../data/gallerySeed';
import type {
  ContactEnquiry,
  EnquiryStatus,
  EnquiryType,
  GalleryCategory,
  GalleryImage,
  SiteContent,
} from '../types/database';

export const DEFAULT_SITE_CONTENT: Record<string, SiteContent> = {
  hero: {
    id: 'default-hero',
    section_key: 'hero',
    title: "Where Every Child's Journey Begins.",
    subtitle: 'SM Education Society • Est. 1965 • Hoodi, Bangalore',
    body: 'We invite you to be a part of this journey — by learning with us, by contributing in thought and spirit, and by sharing your learning experiences.',
    updated_at: '2025-02-11T00:00:00.000Z',
  },
  welcome: {
    id: 'default-welcome',
    section_key: 'welcome',
    title: 'Welcome to SM School',
    subtitle: 'Nurturing Young Minds Since 1965',
    body: 'SM Education Society, established in 1965 by late Dr. Nazir Ahmed, founded SM English School in 1985 to provide effective, affordable, and holistic quality education blending the best of Montessori and traditional learning.',
    updated_at: '2025-02-11T00:00:00.000Z',
  },
  admissions_banner: {
    id: 'default-admissions',
    section_key: 'admissions_banner',
    title: "Begin Your Child's Learning Journey at SMES",
    subtitle: 'Visit our Hoodi campus or send an admission enquiry',
    body: 'Connect with our school office Monday to Saturday between 8:00 AM and 4:00 PM to learn more about our programs and campus.',
    updated_at: '2025-02-11T00:00:00.000Z',
  },
};

function attachSeedCategories(images: GalleryImage[]): GalleryImage[] {
  const map = new Map(DEFAULT_GALLERY_CATEGORIES.map((c) => [c.id, c]));
  return images.map((img) => ({
    ...img,
    category: img.category_id ? map.get(img.category_id) ?? null : null,
  }));
}

// =============================================================================
// PUBLIC API OPERATIONS (LARAVEL BACKEND)
// =============================================================================

export async function fetchGalleryCategories(): Promise<GalleryCategory[]> {
  try {
    const res = await apiRequest<{ data: GalleryCategory[] }>('/api/categories');
    return res.data?.length ? res.data : DEFAULT_GALLERY_CATEGORIES;
  } catch {
    return DEFAULT_GALLERY_CATEGORIES;
  }
}

export async function fetchPublishedGalleryImages(options?: {
  featuredOnly?: boolean;
  categoryId?: string;
  limit?: number;
}): Promise<{ images: GalleryImage[]; source: 'laravel' | 'local' }> {
  try {
    const params = new URLSearchParams();
    if (options?.featuredOnly) params.set('featured', '1');
    if (options?.categoryId) params.set('category_id', options.categoryId);
    if (options?.limit) params.set('limit', String(options.limit));
    const qs = params.toString() ? `?${params.toString()}` : '';

    const res = await apiRequest<{ data: GalleryImage[] }>(`/api/gallery${qs}`);
    return { images: res.data ?? [], source: 'laravel' };
  } catch {
    let items = attachSeedCategories(SEED_GALLERY_IMAGES).filter((i) => i.is_published);
    if (options?.featuredOnly) items = items.filter((i) => i.is_featured);
    if (options?.categoryId) items = items.filter((i) => i.category_id === options.categoryId);
    if (options?.limit) items = items.slice(0, options.limit);
    return { images: items, source: 'local' };
  }
}

export async function fetchSiteContentMap(): Promise<Record<string, SiteContent>> {
  try {
    const res = await apiRequest<{ data: SiteContent[] }>('/api/content');
    const merged: Record<string, SiteContent> = { ...DEFAULT_SITE_CONTENT };
    for (const row of res.data ?? []) {
      merged[row.section_key] = row;
    }
    return merged;
  } catch {
    return DEFAULT_SITE_CONTENT;
  }
}

export async function submitContactEnquiry(payload: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  enquiry_type: EnquiryType;
}): Promise<{ ok: boolean; error?: string; persistedToDb: boolean }> {
  try {
    await apiRequest('/api/enquiries', {
      method: 'POST',
      body: {
        name: payload.name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        subject: payload.subject.trim(),
        message: payload.message.trim(),
        enquiry_type: payload.enquiry_type,
      },
    });
    return { ok: true, persistedToDb: true };
  } catch (err) {
    return {
      ok: false,
      persistedToDb: false,
      error: (err as Error).message || 'Could not submit enquiry. Please try again.',
    };
  }
}

// =============================================================================
// PROTECTED ADMIN API OPERATIONS (LARAVEL SANCTUM + ADMIN MIDDLEWARE)
// =============================================================================

export async function adminFetchAllImages(): Promise<GalleryImage[]> {
  const res = await apiRequest<{ data: GalleryImage[] }>('/api/admin/gallery', { auth: true });
  return res.data ?? [];
}

export async function adminFetchCategories(): Promise<GalleryCategory[]> {
  const res = await apiRequest<{ data: GalleryCategory[] }>('/api/admin/categories', { auth: true });
  return res.data ?? [];
}

export async function adminUploadGalleryImage(params: {
  file: File;
  title: string;
  description: string;
  category_id: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
}): Promise<GalleryImage> {
  const formData = new FormData();
  formData.append('image', params.file);
  formData.append('title', params.title.trim());
  formData.append('description', params.description.trim());
  if (params.category_id) formData.append('category_id', params.category_id);
  formData.append('is_featured', params.is_featured ? '1' : '0');
  formData.append('is_published', params.is_published ? '1' : '0');
  formData.append('display_order', String(params.display_order));

  const res = await apiRequest<{ data: GalleryImage }>('/api/admin/gallery', {
    method: 'POST',
    formData,
    auth: true,
  });
  return res.data;
}

export async function adminUpdateGalleryImage(
  id: string,
  updates: Partial<
    Pick<
      GalleryImage,
      'title' | 'description' | 'category_id' | 'is_featured' | 'is_published' | 'display_order'
    >
  >
): Promise<GalleryImage> {
  const res = await apiRequest<{ data: GalleryImage }>(`/api/admin/gallery/${id}`, {
    method: 'PUT',
    body: updates,
    auth: true,
  });
  return res.data;
}

export async function adminDeleteGalleryImage(image: GalleryImage): Promise<void> {
  await apiRequest(`/api/admin/gallery/${image.id}`, {
    method: 'DELETE',
    auth: true,
  });
}

export async function adminReorderImages(orderedIds: string[]): Promise<void> {
  await apiRequest('/api/admin/gallery/reorder', {
    method: 'POST',
    body: { ordered_ids: orderedIds },
    auth: true,
  });
}

export async function adminCreateCategory(payload: {
  name: string;
  slug: string;
  description: string;
}): Promise<GalleryCategory> {
  const res = await apiRequest<{ data: GalleryCategory }>('/api/admin/categories', {
    method: 'POST',
    body: payload,
    auth: true,
  });
  return res.data;
}

export async function adminUpdateCategory(
  id: string,
  payload: { name: string; slug: string; description: string }
): Promise<GalleryCategory> {
  const res = await apiRequest<{ data: GalleryCategory }>(`/api/admin/categories/${id}`, {
    method: 'PUT',
    body: payload,
    auth: true,
  });
  return res.data;
}

export async function adminDeleteCategory(id: string): Promise<void> {
  await apiRequest(`/api/admin/categories/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

export async function adminFetchEnquiries(): Promise<ContactEnquiry[]> {
  const res = await apiRequest<{ data: ContactEnquiry[] }>('/api/admin/enquiries', { auth: true });
  return res.data ?? [];
}

export async function adminUpdateEnquiryStatus(
  id: string,
  status: EnquiryStatus
): Promise<ContactEnquiry> {
  const res = await apiRequest<{ data: ContactEnquiry }>(`/api/admin/enquiries/${id}`, {
    method: 'PATCH',
    body: { status },
    auth: true,
  });
  return res.data;
}

export async function adminDeleteEnquiry(id: string): Promise<void> {
  await apiRequest(`/api/admin/enquiries/${id}`, {
    method: 'DELETE',
    auth: true,
  });
}

export async function adminFetchSiteContent(): Promise<SiteContent[]> {
  const res = await apiRequest<{ data: SiteContent[] }>('/api/admin/content', { auth: true });
  return res.data ?? [];
}

export async function adminUpsertSiteContent(payload: {
  section_key: string;
  title: string;
  subtitle: string;
  body: string;
}): Promise<SiteContent> {
  const res = await apiRequest<{ data: SiteContent }>(
    `/api/admin/content/${encodeURIComponent(payload.section_key)}`,
    {
      method: 'PUT',
      body: {
        title: payload.title.trim(),
        subtitle: payload.subtitle.trim(),
        body: payload.body.trim(),
      },
      auth: true,
    }
  );
  return res.data;
}
