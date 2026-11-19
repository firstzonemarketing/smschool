import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PublicLayout } from './components/PublicLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { AcademicsPage } from './pages/AcademicsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ActivitiesPage } from './pages/ActivitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminFeatured } from './pages/admin/AdminFeatured';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminSettings } from './pages/admin/AdminSettings';

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Website Routes */}
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/academics" element={<AcademicsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Secure Admin Portal Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="featured" element={<AdminFeatured />} />
            <Route path="enquiries" element={<AdminEnquiries />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
