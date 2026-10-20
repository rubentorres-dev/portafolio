import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../src/components/layout/Footer';
import ProjectCard from '../src/components/ProjectCard';
import { proyectosRespaldo } from '../src/data/content';

describe('Componentes', () => {
  it('el pie de página muestra el nombre', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Footer /></MemoryRouter>);
    expect(screen.getByText(/Rubén Torres Osorio/)).toBeInTheDocument();
  });

  it('la tarjeta de proyecto muestra título y tecnologías', () => {
    render(<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><ProjectCard p={proyectosRespaldo[0]} /></MemoryRouter>);
    expect(screen.getByText('SGIS · Inventario y ventas')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });
});
