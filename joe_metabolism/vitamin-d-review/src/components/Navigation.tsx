import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sun, Menu, X } from 'lucide-react';

const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'synthesis', label: 'Synthesis' },
    { id: 'activation', label: 'Activation' },
    { id: 'vdr-signaling', label: 'VDR Signaling' },
    { id: 'antimicrobial', label: 'Innate Defense' },
    { id: 'macrophage', label: 'Macrophage Loop' },
    { id: 'tcell', label: 'T-Cell Balance' },
    { id: 'barrier', label: 'Barrier Integrity' },
    { id: 'evidence', label: 'Evidence' },
    { id: 'references', label: 'References' },
];

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const offsets = sections.map(s => {
                const el = document.getElementById(s.id);
                if (!el) return { id: s.id, top: Infinity };
                return { id: s.id, top: Math.abs(el.getBoundingClientRect().top - 100) };
            });
            const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
            setActiveSection(closest.id);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-100'
                    : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <button onClick={() => scrollTo('overview')} className="flex items-center gap-2 group">
                    <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-1.5 rounded-lg shadow-sm group-hover:shadow-amber-200 transition-shadow">
                        <Sun size={18} className="text-white" />
                    </div>
                    <span className={`font-bold text-sm tracking-tight transition-colors ${scrolled ? 'text-slate-800' : 'text-slate-700'}`}>
                        Vitamin D Review
                    </span>
                </button>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-1">
                    {sections.map(s => (
                        <button
                            key={s.id}
                            onClick={() => scrollTo(s.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${activeSection === s.id
                                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                                    : scrolled
                                        ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg"
                >
                    <div className="container mx-auto px-6 py-4 grid grid-cols-2 gap-2">
                        {sections.map(s => (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                className={`px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${activeSection === s.id
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                            >
                                {s.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navigation;
