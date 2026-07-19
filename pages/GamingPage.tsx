import React from 'react';
import Hero from '../components/Hero';
import MarketAnalysis from '../components/MarketAnalysis';
import Services from '../components/Services';
import Partners from '../components/Partners';
import Contact from '../components/Contact';
import PageMeta, { JsonLd } from '../components/PageMeta';
import { gamingPageSchema } from '../lib/jsonld';

const TITLE = "AfroPlay — Africa's Web3 Gaming & Media Platform";
const DESCRIPTION =
  "AfroPlay connects Web3 games with Africa's 60M+ gamers through community, content, and partnerships. Home of the Onchain Africa interview series.";

const GamingPage: React.FC = () => {
  return (
    <main>
      <PageMeta
        title={TITLE}
        description={DESCRIPTION}
        canonical="https://afroplay.org/gaming"
        ogImage="https://afroplay.org/og/gaming.svg"
      />
      <JsonLd data={gamingPageSchema} />

      <Hero />
      <MarketAnalysis />
      <Services />
      <Partners />
      <Contact />
    </main>
  );
};

export default GamingPage;
