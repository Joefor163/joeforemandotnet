import { motion } from 'framer-motion';
import CitationBadge from './CitationBadge';

/* ── Cathelicidin Pore Formation ── */
const AMPDiagram = () => {
    return (
        <svg viewBox="0 0 650 380" className="w-full h-auto">
            <defs>
                <linearGradient id="bacGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#991B1B" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7F1D1D" stopOpacity="0.5" />
                </linearGradient>
                <radialGradient id="bacInner" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FECACA" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FCA5A5" stopOpacity="0.1" />
                </radialGradient>
                <filter id="peptideGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            <rect width="650" height="380" fill="#FFF8F0" rx="16" />

            {/* Title */}
            <text x="325" y="30" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400E" fontFamily="Inter" opacity="0.5">
                Cathelicidin (LL-37) vs. Bacterial Membrane
            </text>

            {/* ── BACTERIUM ── */}
            {/* Outer membrane */}
            <ellipse cx="325" cy="210" rx="200" ry="120" fill="none" stroke="#DC2626" strokeWidth="4" opacity="0.3" />
            {/* Inner membrane */}
            <ellipse cx="325" cy="210" rx="175" ry="100" fill="url(#bacGrad)" stroke="#EF4444" strokeWidth="3" opacity="0.5" />
            {/* Cytoplasm */}
            <ellipse cx="325" cy="210" rx="155" ry="85" fill="url(#bacInner)" />

            {/* Bacterial DNA (circular) */}
            <motion.ellipse
                cx="325" cy="210" rx="50" ry="30"
                fill="none" stroke="#991B1B" strokeWidth="1.5" opacity="0.3"
                animate={{ rx: [50, 55, 50], ry: [30, 33, 30] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <text x="325" y="213" textAnchor="middle" fontSize="10" fill="#991B1B" fontFamily="Inter" opacity="0.4">DNA</text>

            {/* Ribosomes */}
            {[[270, 180], [370, 180], [280, 240], [360, 240], [310, 260]].map(([cx, cy], i) => (
                <circle key={`rib-${i}`} cx={cx} cy={cy} r="4" fill="#B91C1C" opacity="0.2" />
            ))}

            {/* ── CATHELICIDIN PEPTIDES (alpha-helical, gold) ── */}
            {/* Peptide 1: approaching from top-left */}
            <motion.g
                animate={{
                    x: [0, 40, 65],
                    y: [0, 30, 55],
                }}
                transition={{ duration: 4, repeat: Infinity, repeatDelay: 3 }}
            >
                <motion.path
                    d="M100,60 Q110,55 120,60 Q130,65 140,60 Q150,55 160,60"
                    stroke="#FDB813"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#peptideGlow)"
                    animate={{ strokeWidth: [4, 5, 4] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
                <text x="130" y="52" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400E" fontFamily="Inter">LL-37</text>
            </motion.g>

            {/* Peptide 2: approaching from top-right */}
            <motion.g
                animate={{
                    x: [0, -35, -55],
                    y: [0, 25, 50],
                }}
                transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, repeatDelay: 3.5 }}
            >
                <motion.path
                    d="M480,55 Q490,50 500,55 Q510,60 520,55 Q530,50 540,55"
                    stroke="#FDB813"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#peptideGlow)"
                />
                <text x="510" y="47" textAnchor="middle" fontSize="10" fontWeight="600" fill="#92400E" fontFamily="Inter">LL-37</text>
            </motion.g>

            {/* Peptide 3: approaching from left */}
            <motion.g
                animate={{
                    x: [0, 30, 55],
                    y: [0, 5, 0],
                }}
                transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 4 }}
            >
                <motion.path
                    d="M50,200 Q60,195 70,200 Q80,205 90,200 Q100,195 110,200"
                    stroke="#E8A317"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#peptideGlow)"
                />
            </motion.g>

            {/* Peptide 4: approaching from right */}
            <motion.g
                animate={{
                    x: [0, -25, -50],
                    y: [0, -5, 0],
                }}
                transition={{ duration: 3.5, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
                <motion.path
                    d="M560,220 Q570,215 580,220 Q590,225 600,220 Q610,215 620,220"
                    stroke="#E8A317"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    filter="url(#peptideGlow)"
                />
            </motion.g>

            {/* ── PORE FORMATION (at membrane) ── */}
            {/* Pore 1: top */}
            <motion.g
                animate={{ opacity: [0, 0, 0.5, 1, 1] }}
                transition={{ duration: 5, delay: 2, repeat: Infinity, repeatDelay: 2 }}
            >
                <rect x="290" y="87" width="20" height="30" rx="3" fill="#FDB813" opacity="0.8" />
                <rect x="340" y="87" width="20" height="30" rx="3" fill="#FDB813" opacity="0.8" />
                {/* Gap / pore */}
                <rect x="310" y="90" width="30" height="24" rx="4" fill="#FFF8F0" stroke="#FDB813" strokeWidth="1" strokeDasharray="3 3" />
                <text x="325" y="105" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400E" fontFamily="Inter">PORE</text>
            </motion.g>

            {/* ── ION LEAKAGE from pore ── */}
            {[0, 1, 2, 3, 4].map(i => (
                <motion.circle
                    key={`ion-${i}`}
                    r="2.5"
                    fill={i % 2 === 0 ? "#3B82F6" : "#EF4444"}
                    animate={{
                        cx: [325 + (i - 2) * 8, 325 + (i - 2) * 15],
                        cy: [90, 50 - i * 8],
                        opacity: [0, 0, 0.8, 0],
                    }}
                    transition={{ duration: 3, delay: 3 + i * 0.3, repeat: Infinity, repeatDelay: 4 }}
                />
            ))}

            {/* Ion labels */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
            >
                <text x="295" y="72" fontSize="9" fill="#3B82F6" fontFamily="Inter">K⁺</text>
                <text x="345" y="72" fontSize="9" fill="#EF4444" fontFamily="Inter">Ca²⁺</text>
                <text x="315" y="60" fontSize="9" fill="#6B7280" fontFamily="Inter">ion leakage →</text>
                <text x="315" y="50" fontSize="9" fill="#6B7280" fontFamily="Inter">membrane depolarization</text>
            </motion.g>

            {/* ── DEFENSIN PEPTIDES (right side, blue) ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {/* Defensin cluster */}
                <motion.g
                    animate={{ x: [0, -15, -30], y: [0, 10, 15] }}
                    transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                    <circle cx="560" cy="300" r="8" fill="#3B82F6" opacity="0.7" filter="url(#peptideGlow)" />
                    <circle cx="575" cy="290" r="7" fill="#60A5FA" opacity="0.6" />
                    <circle cx="550" cy="285" r="6" fill="#93C5FD" opacity="0.5" />
                    <text x="562" y="315" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E40AF" fontFamily="Inter">β-Defensins</text>
                </motion.g>
            </motion.g>

            {/* ── LEGEND ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="30" y="320" width="170" height="50" rx="8" fill="white" stroke="#E5E7EB" />
                <circle cx="50" cy="338" r="5" fill="#FDB813" />
                <text x="60" y="341" fontSize="10" fill="#374151" fontFamily="Inter">Cathelicidin (LL-37)</text>
                <circle cx="50" cy="355" r="5" fill="#3B82F6" />
                <text x="60" y="358" fontSize="10" fill="#374151" fontFamily="Inter">β-Defensin 2 (hBD-2)</text>
            </motion.g>
        </svg>
    );
};

const AntimicrobialPeptides = () => {
    return (
        <section id="antimicrobial" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Innate Defense</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Nature's Antibiotics
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        The most potent immune output of vitamin D signaling: antimicrobial peptides (AMPs).
                        Cathelicidin (LL-37) and β-defensins physically destroy invading bacteria by
                        puncturing their membranes.
                        <CitationBadge refId="liu2006" claim="VDR-VDRE signaling in macrophages directly induces cathelicidin (CAMP gene) expression to kill bacteria" />
                        <CitationBadge refId="aranow2011" claim="Innate immunity: vitamin D induces cathelicidin and β-defensins via VDR transcriptional control" />
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <AMPDiagram />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-sm border border-amber-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-bold text-amber-900 mb-3 text-lg">LL-37: Dual Agent</h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                            Cathelicidin LL-37 doesn't just kill bacteria. It also acts as an <strong>immunomodulatory
                                signal</strong> — it recruits neutrophils and monocytes to the infection site (chemotaxis),
                            promotes wound healing, and can even neutralize bacterial endotoxin (LPS).
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Its expression is <strong>almost entirely dependent</strong> on vitamin D — the CAMP gene
                            promoter contains a potent VDRE that is one of the most robustly regulated
                            vitamin D target genes known.
                            <CitationBadge refId="adams2008" claim="CAMP gene promoter contains a potent VDRE; cathelicidin is one of the most robustly VDR-regulated genes" />
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-bold text-blue-900 mb-3 text-lg">The Tuberculosis Connection</h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                            Before antibiotics, TB patients were treated with <strong>sunlight therapy</strong> (heliotherapy)
                            in sanatoriums — and it worked. The mechanism was unknown until 2006, when Liu et al. published
                            in <em>Science</em> that TLR activation in macrophages upregulates the vitamin D–cathelicidin
                            pathway, directly killing <em>M. tuberculosis</em>.
                            <CitationBadge refId="liu2006" claim="Molecular mechanism explaining why heliotherapy worked for TB: TLR→VDR→CYP27B1→cathelicidin→M. tuberculosis killed" />
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            This landmark paper provided the first molecular explanation for why sunlight helps fight TB,
                            and why vitamin D deficiency is a risk factor for the disease.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AntimicrobialPeptides;
