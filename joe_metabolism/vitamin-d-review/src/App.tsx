import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SkinSynthesis from './components/SkinSynthesis';
import ActivationPathway from './components/ActivationPathway';
import VDRSignaling from './components/VDRSignaling';
import AntimicrobialPeptides from './components/AntimicrobialPeptides';
import MacrophageLoop from './components/MacrophageLoop';
import TCellModulation from './components/TCellModulation';
import EpithelialBarrier from './components/EpithelialBarrier';
import Evidence from './components/Evidence';
import ReferencesSection from './components/ReferencesSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navigation />
      <Hero />
      <SkinSynthesis />
      <ActivationPathway />
      <VDRSignaling />
      <AntimicrobialPeptides />
      <MacrophageLoop />
      <TCellModulation />
      <EpithelialBarrier />
      <Evidence />
      <ReferencesSection />
      <Footer />
    </div>
  );
}

export default App;