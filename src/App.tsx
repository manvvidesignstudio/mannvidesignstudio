import React, { Suspense, lazy, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Preloader } from './components/layout/Preloader';
import { PublicLayout } from './components/layout/PublicLayout';

// Eagerly loaded public homepage for immediate render
import { Home } from './pages/Home';

// Lazy loaded public pages
const Studio = lazy(() => import('./pages/Studio').then(m => ({ default: m.Studio })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Process = lazy(() => import('./pages/Process').then(m => ({ default: m.Process })));
const Portfolio = lazy(() => import('./pages/Portfolio').then(m => ({ default: m.Portfolio })));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Lazy loaded admin pages
const Login = lazy(() => import('./pages/admin/Login').then(m => ({ default: m.Login })));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute').then(m => ({ default: m.ProtectedRoute })));
const Dashboard = lazy(() => import('./pages/admin/Dashboard').then(m => ({ default: m.Dashboard })));
const HeroEditor = lazy(() => import('./pages/admin/HeroEditor').then(m => ({ default: m.HeroEditor })));
const StudioEditor = lazy(() => import('./pages/admin/StudioEditor').then(m => ({ default: m.StudioEditor })));
const ProjectsManager = lazy(() => import('./pages/admin/ProjectsManager').then(m => ({ default: m.ProjectsManager })));
const ProjectEditor = lazy(() => import('./pages/admin/ProjectEditor').then(m => ({ default: m.ProjectEditor })));
const ServicesManager = lazy(() => import('./pages/admin/ServicesManager').then(m => ({ default: m.ServicesManager })));
const ProcessManager = lazy(() => import('./pages/admin/ProcessManager').then(m => ({ default: m.ProcessManager })));
const TestimonialsManager = lazy(() => import('./pages/admin/TestimonialsManager').then(m => ({ default: m.TestimonialsManager })));
const GalleryManager = lazy(() => import('./pages/admin/GalleryManager').then(m => ({ default: m.GalleryManager })));
const MessagesManager = lazy(() => import('./pages/admin/MessagesManager').then(m => ({ default: m.MessagesManager })));
const SettingsManager = lazy(() => import('./pages/admin/SettingsManager').then(m => ({ default: m.SettingsManager })));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-6 h-6 border-2 border-[#C8A97E] border-t-transparent rounded-full animate-spin" />
  </div>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Preloader />
      <Router>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Website Routes */}
            <Route element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="studio" element={<Studio />} />
              <Route path="services" element={<Services />} />
              <Route path="process" element={<Process />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="portfolio/:slug" element={<ProjectDetail />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Auth Route */}
            <Route path="/admin/login" element={<Login />} />

            {/* Protected Admin Dashboard & CMS */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="hero" element={<HeroEditor />} />
              <Route path="studio" element={<StudioEditor />} />
              <Route path="projects" element={<ProjectsManager />} />
              <Route path="projects/new" element={<ProjectEditor />} />
              <Route path="projects/:id" element={<ProjectEditor />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="process" element={<ProcessManager />} />
              <Route path="testimonials" element={<TestimonialsManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="messages" element={<MessagesManager />} />
              <Route path="settings" element={<SettingsManager />} />
            </Route>

            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
