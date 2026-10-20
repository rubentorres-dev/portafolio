import useSeo from '../hooks/useSeo';
import FeaturedProjects from '../sections/FeaturedProjects';

export default function Projects() {
  useSeo({ titulo: 'Proyectos', descripcion: 'Proyectos de software de Rubén Torres Osorio: Java, JavaScript, Python, IoT y automatizaciones.' });
  return <div className="pt-24"><FeaturedProjects todos /></div>;
}
