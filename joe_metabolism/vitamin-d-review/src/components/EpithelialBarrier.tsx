import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CitationBadge from './CitationBadge';

/* ── Epithelial Barrier Integrity ── */
const BarrierDiagram = ({ fortified }: { fortified: boolean }) => {
    return (
        <svg viewBox="0 0 650 380" className="w-full h-auto">
            <defs>
                <linearGradient id="mucusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4ADE80" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="gobletGrad" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.3" />
                </radialGradient>
            </defs>

            <rect width="650" height="380" fill={fortified ? '#F0FDF4' : '#FEF2F2'} rx="16" />

            {/* Status */}
            <AnimatePresence mode="wait">
                <motion.g
                    key={fortified ? 'fort' : 'comp'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <rect x="200" y="10" width="250" height="28" rx="14"
                        fill={fortified ? '#DCFCE7' : '#FEE2E2'}
                        stroke={fortified ? '#86EFAC' : '#FCA5A5'} />
                    <text x="325" y="29" textAnchor="middle" fontSize="13" fontWeight="700"
                        fill={fortified ? '#166534' : '#991B1B'} fontFamily="Inter">
                        {fortified ? '✓ Vitamin D → Barrier Fortified' : '✗ Deficient → Barrier Compromised'}
                    </text>
                </motion.g>
            </AnimatePresence>

            {/* ── MUCUS LAYER ── */}
            <motion.path
                d="M0,70 Q50,55 100,70 Q150,85 200,70 Q250,55 300,70 Q350,85 400,70 Q450,55 500,70 Q550,85 600,70 Q625,63 650,70 L650,90 L0,90 Z"
                fill="url(#mucusGrad)"
                animate={{
                    d: [
                        "M0,70 Q50,55 100,70 Q150,85 200,70 Q250,55 300,70 Q350,85 400,70 Q450,55 500,70 Q550,85 600,70 Q625,63 650,70 L650,90 L0,90 Z",
                        "M0,72 Q50,85 100,72 Q150,58 200,72 Q250,85 300,72 Q350,58 400,72 Q450,85 500,72 Q550,58 600,72 Q625,78 650,72 L650,90 L0,90 Z",
                        "M0,70 Q50,55 100,70 Q150,85 200,70 Q250,55 300,70 Q350,85 400,70 Q450,55 500,70 Q550,85 600,70 Q625,63 650,70 L650,90 L0,90 Z",
                    ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <text x="30" y="85" fontSize="10" fill="#166534" fontFamily="Inter" fontWeight="600" opacity="0.5">MUCUS</text>

            {/* ── EPITHELIAL CELLS ── */}
            {Array.from({ length: 8 }, (_, i) => {
                const x = i * 80 + 10;
                const isGoblet = i === 2 || i === 5;
                return (
                    <g key={`epi-${i}`}>
                        {/* Cell body */}
                        <rect x={x} y="90" width="75" height="90" rx="4"
                            fill={isGoblet ? 'url(#gobletGrad)' : '#FEE2E2'}
                            stroke={fortified ? '#FDA4AF' : '#FCA5A5'}
                            strokeWidth={1.5} />

                        {/* Nucleus */}
                        <ellipse cx={x + 37} cy={150} rx="15" ry="10"
                            fill="#BE185D" opacity="0.25" />

                        {/* Goblet cell granules */}
                        {isGoblet && (
                            <g>
                                {[0, 1, 2, 3, 4, 5].map(j => (
                                    <circle key={j} cx={x + 20 + (j % 3) * 18} cy={105 + Math.floor(j / 3) * 20} r="6"
                                        fill="#86EFAC" opacity="0.5" />
                                ))}
                                <text x={x + 37} y="170" textAnchor="middle" fontSize="9" fill="#166534" fontFamily="Inter">goblet</text>
                            </g>
                        )}
                    </g>
                );
            })}

            {/* ── TIGHT JUNCTIONS ── */}
            {Array.from({ length: 7 }, (_, i) => {
                const x = i * 80 + 85;
                return (
                    <g key={`tj-${i}`}>
                        {fortified ? (
                            /* Tight junctions sealed */
                            <motion.g
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                {/* Junction proteins (occludin/claudin bridges) */}
                                {[0, 1, 2, 3, 4].map(j => (
                                    <motion.rect
                                        key={j}
                                        x={x - 4} y={95 + j * 18} width="8" height="10" rx="2"
                                        fill="#7C3AED" opacity="0.7"
                                        animate={{ opacity: [0.5, 0.9, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: j * 0.3 }}
                                    />
                                ))}
                                {/* Connection lines */}
                                {[0, 1, 2, 3, 4].map(j => (
                                    <line key={`line-${j}`}
                                        x1={x - 8} y1={100 + j * 18} x2={x + 8} y2={100 + j * 18}
                                        stroke="#7C3AED" strokeWidth="1.5" opacity="0.4" />
                                ))}
                            </motion.g>
                        ) : (
                            /* Gaps in junctions */
                            <motion.g>
                                {/* Only 1-2 junction proteins (weakened) */}
                                <rect x={x - 3} y={100} width="6" height="8" rx="2" fill="#7C3AED" opacity="0.2" />
                                <rect x={x - 3} y={155} width="6" height="8" rx="2" fill="#7C3AED" opacity="0.2" />

                                {/* Gap indicator */}
                                <motion.rect
                                    x={x - 6} y={115} width="12" height="30" rx="3"
                                    fill="transparent" stroke="#DC2626" strokeWidth="1" strokeDasharray="3 3"
                                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <text x={x} y={133} textAnchor="middle" fontSize="9" fill="#DC2626" fontFamily="Inter">gap</text>
                            </motion.g>
                        )}
                    </g>
                );
            })}

            {/* Tight junction labels */}
            {fortified && (
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <rect x="20" y="195" width="120" height="40" rx="8" fill="white" stroke="#C4B5FD" strokeWidth="1" />
                    <text x="35" y="212" fontSize="10" fontWeight="700" fill="#7C3AED" fontFamily="Inter">Tight Junction Proteins</text>
                    <text x="35" y="225" fontSize="9" fill="#6B7280" fontFamily="Inter">occludin, claudin-1, -4</text>
                </motion.g>
            )}

            {/* ── PATHOGENS ── */}
            {/* Pathogens above mucus trying to get through */}
            {[0, 1, 2, 3, 4].map(i => {
                const baseX = 80 + i * 120;
                return (
                    <motion.g key={`path-${i}`}>
                        {/* Pathogen (virus-like) */}
                        <motion.g
                            animate={
                                fortified
                                    ? { y: [0, 5, 0], x: [0, (i % 2 === 0 ? 3 : -3), 0] }
                                    : { y: [0, 40, 100, 180], opacity: [1, 1, 0.8, 0.3] }
                            }
                            transition={
                                fortified
                                    ? { duration: 3, repeat: Infinity, delay: i * 0.5 }
                                    : { duration: 5, repeat: Infinity, delay: i * 1 }
                            }
                        >
                            <circle cx={baseX} cy={45} r="8" fill="#DC2626" opacity="0.6" />
                            {/* Spikes */}
                            {[0, 60, 120, 180, 240, 300].map(angle => {
                                const rad = (angle * Math.PI) / 180;
                                return (
                                    <line key={angle}
                                        x1={baseX + Math.cos(rad) * 8} y1={45 + Math.sin(rad) * 8}
                                        x2={baseX + Math.cos(rad) * 12} y2={45 + Math.sin(rad) * 12}
                                        stroke="#DC2626" strokeWidth="1.5" opacity="0.5" />
                                );
                            })}
                        </motion.g>

                        {/* Block indicator when fortified */}
                        {fortified && (
                            <motion.text
                                x={baseX} y={62} textAnchor="middle" fontSize="13"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 1 + i * 0.3 }}
                            >
                                ✋
                            </motion.text>
                        )}
                    </motion.g>
                );
            })}

            {/* ── BASAL MEMBRANE ── */}
            <line x1="0" y1="185" x2="650" y2="185" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" />
            <text x="560" y="200" fontSize="10" fill="#6B7280" fontFamily="Inter" opacity="0.5">basal lamina</text>

            {/* ── SUBMUCOSAL SPACE ── */}
            <rect x="0" y="200" width="650" height="180" fill={fortified ? '#F0FDF4' : '#FEF2F2'} opacity="0.3" />
            <text x="30" y="220" fontSize="11" fill="#6B7280" fontFamily="Inter" fontWeight="600" opacity="0.4">SUBMUCOSA</text>

            {/* Blood vessel in submucosa */}
            <path d="M100,340 Q250,320 400,340 Q500,355 600,335" stroke="#DC2626" strokeWidth="12" fill="none" opacity="0.1" />

            {/* Immune cells in submucosa */}
            {!fortified && (
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <text x="300" y="280" textAnchor="middle" fontSize="11" fill="#991B1B" fontFamily="Inter" fontWeight="600">
                        ⚠️ Pathogens breach compromised barrier → inflammation
                    </text>
                    {[0, 1, 2].map(i => (
                        <motion.circle
                            key={`inf-${i}`}
                            cx={250 + i * 60} cy={310} r="12"
                            fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1"
                            animate={{ r: [12, 15, 12], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        />
                    ))}
                    <text x="325" y="340" textAnchor="middle" fontSize="10" fill="#DC2626" fontFamily="Inter">
                        inflammatory infiltrate
                    </text>
                </motion.g>
            )}

            {fortified && (
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <text x="325" y="280" textAnchor="middle" fontSize="11" fill="#166534" fontFamily="Inter" fontWeight="600">
                        ✓ Intact barrier prevents pathogen translocation
                    </text>
                </motion.g>
            )}

            {/* Legend */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="480" y="195" width="150" height="90" rx="8" fill="white" stroke="#E5E7EB" />
                <text x="555" y="212" textAnchor="middle" fontSize="11" fontWeight="700" fill="#374151" fontFamily="Inter">Legend</text>
                <rect x="495" y="220" width="10" height="10" rx="2" fill="#FEE2E2" stroke="#FDA4AF" />
                <text x="510" y="229" fontSize="10" fill="#6B7280" fontFamily="Inter">Epithelial cell</text>
                <rect x="495" y="236" width="10" height="10" rx="2" fill="#86EFAC" opacity="0.4" />
                <text x="510" y="245" fontSize="10" fill="#6B7280" fontFamily="Inter">Goblet cell</text>
                <rect x="495" y="252" width="10" height="10" rx="2" fill="#7C3AED" opacity="0.6" />
                <text x="510" y="261" fontSize="10" fill="#6B7280" fontFamily="Inter">Tight junction</text>
                <circle cx="500" cy="275" r="5" fill="#DC2626" opacity="0.6" />
                <text x="510" y="278" fontSize="10" fill="#6B7280" fontFamily="Inter">Pathogen</text>
            </motion.g>
        </svg>
    );
};

const EpithelialBarrier = () => {
    const [fortified, setFortified] = useState(true);

    return (
        <section id="barrier" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-purple-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Barrier Function</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Fortifying Epithelial Barriers
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Beyond immune cells, vitamin D strengthens the physical barriers that pathogens must cross —
                        respiratory and gut epithelia. It upregulates tight junction proteins (occludin, claudins)
                        that seal the gaps between cells.
                        <CitationBadge refId="adams2008" claim="Vitamin D upregulates tight junction proteins (occludin, claudin-1, -4) in epithelial barriers" />
                    </p>
                </motion.div>

                {/* Interactive toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-full p-1 shadow-sm border border-slate-200 flex">
                        <button
                            onClick={() => setFortified(false)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${!fortified
                                    ? 'bg-red-500 text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Compromised
                        </button>
                        <button
                            onClick={() => setFortified(true)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${fortified
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Fortified
                        </button>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <BarrierDiagram fortified={fortified} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-bold text-purple-900 mb-3 text-lg">Respiratory Epithelium</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The airways are the primary entry point for respiratory pathogens. Vitamin D enhances the
                            expression of tight junction proteins and promotes secretion of antimicrobial peptides
                            into the airway surface liquid. This creates a dual physical-chemical barrier that is
                            critical for preventing viral entry — particularly relevant for SARS-CoV-2, influenza,
                            and RSV infections.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-2xl border border-amber-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-bold text-amber-900 mb-3 text-lg">Gut Barrier ("Leaky Gut")</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Vitamin D deficiency is associated with increased intestinal permeability — colloquially
                            "leaky gut." The VDR directly regulates expression of claudin-2, -12, and -15 in
                            intestinal epithelium.
                            <CitationBadge refId="aranow2011" claim="VDR directly regulates claudin expression in intestinal epithelium; deficiency → increased permeability" />
                            {' '}Compromised gut barrier allows bacterial translocation, contributing
                            to systemic inflammation, endotoxemia, and potentially driving autoimmune conditions
                            like IBD and celiac disease.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EpithelialBarrier;
