import useSeo from '../hooks/useSeo';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Tech from '../sections/Tech';
import Experience from '../sections/Experience';
import FeaturedProjects from '../sections/FeaturedProjects';
import Reach from '../sections/Reach';
import Services from '../sections/Services';
import GithubStats from '../sections/GithubStats';
import TestimonialsBlog from '../sections/TestimonialsBlog';
import Contact from '../sections/Contact';
import { scrollA } from '../hooks/useLenis';

export default function Home() {
  useSeo();
  const { hash } = useLocation();
  const [asunto, setAsunto] = useState('');

  useEffect(() => {
    if (hash) setTimeout(() => scrollA(hash), 300);
  }, [hash]);

  return (
    <>
      <Hero />
      <About />
      <Tech />
      <Experience />
      <FeaturedProjects />
      <Reach />
      <Services onCotizar={setAsunto} />
      <GithubStats />
      <TestimonialsBlog />
      <Contact asuntoInicial={asunto} />
    </>
  );
}
