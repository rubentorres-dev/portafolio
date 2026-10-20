// Rutas y estructura general (barra, efectos, pie de página y avisos).
import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/layout/ScrollProgress';
import CookieNotice from './components/layout/CookieNotice';
import CursorGlow from './components/effects/CursorGlow';
import useLenis from './hooks/useLenis';
import useNavegacionTeclado from './hooks/useNavegacionTeclado';
import Home from './pages/Home';

// Las páginas secundarias se cargan solo cuando se visitan (sitio más rápido).
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Gracias = lazy(() => import('./pages/Gracias'));
const Legal = lazy(() => import('./pages/Legal'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AlCambiarRuta() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  useLenis();
  useNavegacionTeclado(pathname === '/');
  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-noche">Saltar al contenido</a>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <AlCambiarRuta />
      <main id="contenido" className="relative z-[2]">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/proyectos/:slug" element={<ProjectDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/gracias" element={<Gracias />} />
            <Route path="/aviso-legal" element={<Legal tipo="aviso-legal" />} />
            <Route path="/privacidad" element={<Legal tipo="privacidad" />} />
            <Route path="/cookies" element={<Legal tipo="cookies" />} />
            <Route path="/terminos" element={<Legal tipo="terminos" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <CookieNotice />
    </>
  );
}
