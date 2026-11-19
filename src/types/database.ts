export interface GalleryCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  storage_path: string;
  category_id: string | null;
  is_featured: boolean;
  is_published: boolean;
  display_order: number;
  created_at: string;
  category?: GalleryCategory | null;
}

export type EnquiryType = 'general' | 'admission';
export type EnquiryStatus = 'new' | 'in_progress' | 'resolved' | 'archived';

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  enquiry_type: EnquiryType;
  status: EnquiryStatus;
  created_at: string;
}

export interface SiteContent {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  body: string;
  updated_at: string;
}

export interface AdminUserRecord {
  user_id: string;
  email: string;
  role: 'admin' | 'super_admin';
  created_at: string;
}
