import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CitationBadge from './CitationBadge';

/* ── T-Cell Differentiation Balance ── */
const TCellDiagram = ({ vitaminDSufficient }: { vitaminDSufficient: boolean }) => {
    return (
        <svg viewBox="0 0 650 420" className="w-full h-auto">
            <defs>
                <radialGradient id="naiveT" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E0E7FF" />
                    <stop offset="100%" stopColor="#C7D2FE" />
                </radialGradient>
                <radialGradient id="dcGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.3" />
                </radialGradient>
            </defs>

            <rect width="650" height="420" fill="#FAFBFF" rx="16" />

            {/* Status indicator */}
            <AnimatePresence mode="wait">
                <motion.g
                    key={vitaminDSufficient ? 'suf' : 'def'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <rect x="220" y="10" width="210" height="30" rx="15"
                        fill={vitaminDSufficient ? '#DCFCE7' : '#FEE2E2'}
                        stroke={vitaminDSufficient ? '#86EFAC' : '#FCA5A5'} strokeWidth="1.5" />
                    <text x="325" y="30" textAnchor="middle" fontSize="13" fontWeight="700"
                        fill={vitaminDSufficient ? '#166534' : '#991B1B'} fontFamily="Inter">
                        {vitaminDSufficient ? '✓ Vitamin D Sufficient' : '✗ Vitamin D Deficient'}
                    </text>
                </motion.g>
            </AnimatePresence>

            {/* ── DENDRITIC CELL ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <circle cx="100" cy="220" r="40" fill="url(#dcGrad)" stroke="#F59E0B" strokeWidth="2" />
                {/* Dendrites */}
                {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
                    const rad = (angle * Math.PI) / 180;
                    const x1 = 100 + Math.cos(rad) * 40;
                    const y1 = 220 + Math.sin(rad) * 40;
                    const x2 = 100 + Math.cos(rad) * 55;
                    const y2 = 220 + Math.sin(rad) * 55;
                    return (
                        <motion.line key={angle} x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"
                            animate={{ x2: [x2, x2 + Math.cos(rad) * 5, x2], y2: [y2, y2 + Math.sin(rad) * 5, y2] }}
                            transition={{ duration: 3, repeat: Infinity, delay: angle * 0.01 }}
                        />
                    );
                })}
                <text x="100" y="215" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E" fontFamily="Inter">Dendritic</text>
                <text x="100" y="228" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E" fontFamily="Inter">Cell</text>

                {/* Tolerogenic label when Vit D sufficient */}
                <AnimatePresence>
                    {vitaminDSufficient && (
                        <motion.g
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <rect x="55" y="270" width="90" height="20" rx="10" fill="#16A34A" />
                            <text x="100" y="284" textAnchor="middle" fontSize="10" fontWeight="600" fill="white" fontFamily="Inter">tolerogenic</text>
                        </motion.g>
                    )}
                </AnimatePresence>
            </motion.g>

            {/* ──  NAIVE T CELL ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <circle cx="260" cy="220" r="30" fill="url(#naiveT)" stroke="#818CF8" strokeWidth="2" />
                <text x="260" y="217" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730A3" fontFamily="Inter">Naïve</text>
                <text x="260" y="230" textAnchor="middle" fontSize="11" fontWeight="700" fill="#3730A3" fontFamily="Inter">T Cell</text>
            </motion.g>

            {/* Arrow: DC → T cell */}
            <motion.line x1="145" y1="220" x2="225" y2="220" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* ── DIFFERENTIATION ARROWS ── */}
            {/* Th1 */}
            <motion.g>
                <motion.line x1="290" y1="200" x2="410" y2="110"
                    stroke="#EF4444" strokeWidth={vitaminDSufficient ? 1.5 : 3}
                    markerEnd="url(#redArrow)" />

                <circle cx="440" cy="95" r="28"
                    fill={vitaminDSufficient ? '#FEE2E2' : '#FECACA'}
                    stroke="#EF4444" strokeWidth={vitaminDSufficient ? 1 : 2.5} />
                <text x="440" y="92" textAnchor="middle" fontSize="13" fontWeight="700" fill="#991B1B" fontFamily="Inter">Th1</text>
                <text x="440" y="104" textAnchor="middle" fontSize="9" fill="#DC2626" fontFamily="Inter">pro-inflam.</text>

                {/* Cytokine */}
                <motion.g animate={{ opacity: vitaminDSufficient ? 0.3 : 1 }}>
                    <rect x="480" y="80" width="55" height="18" rx="9" fill="#FEE2E2" stroke="#FCA5A5" />
                    <text x="507" y="93" textAnchor="middle" fontSize="10" fontWeight="600" fill="#DC2626" fontFamily="Inter">IFN-γ ↑</text>
                </motion.g>
            </motion.g>

            {/* Th17 */}
            <motion.g>
                <motion.line x1="290" y1="215" x2="410" y2="190"
                    stroke="#EA580C" strokeWidth={vitaminDSufficient ? 1.5 : 3} />

                <circle cx="440" cy="180" r="28"
                    fill={vitaminDSufficient ? '#FFF7ED' : '#FFEDD5'}
                    stroke="#EA580C" strokeWidth={vitaminDSufficient ? 1 : 2.5} />
                <text x="440" y="177" textAnchor="middle" fontSize="13" fontWeight="700" fill="#9A3412" fontFamily="Inter">Th17</text>
                <text x="440" y="189" textAnchor="middle" fontSize="9" fill="#EA580C" fontFamily="Inter">autoimmune</text>

                <motion.g animate={{ opacity: vitaminDSufficient ? 0.3 : 1 }}>
                    <rect x="480" y="165" width="55" height="18" rx="9" fill="#FFF7ED" stroke="#FDBA74" />
                    <text x="507" y="178" textAnchor="middle" fontSize="10" fontWeight="600" fill="#EA580C" fontFamily="Inter">IL-17 ↑</text>
                </motion.g>
            </motion.g>

            {/* Th2 */}
            <motion.g>
                <motion.line x1="290" y1="230" x2="410" y2="280"
                    stroke="#2563EB" strokeWidth={vitaminDSufficient ? 2.5 : 1.5} />

                <circle cx="440" cy="285" r="28"
                    fill={vitaminDSufficient ? '#DBEAFE' : '#EFF6FF'}
                    stroke="#2563EB" strokeWidth={vitaminDSufficient ? 2 : 1} />
                <text x="440" y="282" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1E3A8A" fontFamily="Inter">Th2</text>
                <text x="440" y="294" textAnchor="middle" fontSize="9" fill="#2563EB" fontFamily="Inter">humoral</text>

                <motion.g animate={{ opacity: vitaminDSufficient ? 1 : 0.3 }}>
                    <rect x="480" y="270" width="55" height="18" rx="9" fill="#EFF6FF" stroke="#93C5FD" />
                    <text x="507" y="283" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2563EB" fontFamily="Inter">IL-4 ↑</text>
                </motion.g>
            </motion.g>

            {/* Treg */}
            <motion.g>
                <motion.line x1="290" y1="240" x2="410" y2="365"
                    stroke="#16A34A" strokeWidth={vitaminDSufficient ? 3.5 : 1.5} />

                <motion.circle cx="440" cy="370" r="28"
                    fill={vitaminDSufficient ? '#DCFCE7' : '#F0FDF4'}
                    stroke="#16A34A" strokeWidth={vitaminDSufficient ? 2.5 : 1}
                    animate={vitaminDSufficient ? { r: [28, 32, 28] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <text x="440" y="367" textAnchor="middle" fontSize="13" fontWeight="700" fill="#166534" fontFamily="Inter">Treg</text>
                <text x="440" y="379" textAnchor="middle" fontSize="9" fill="#16A34A" fontFamily="Inter">tolerance</text>

                <motion.g animate={{ opacity: vitaminDSufficient ? 1 : 0.3 }}>
                    <rect x="480" y="355" width="55" height="18" rx="9" fill="#F0FDF4" stroke="#86EFAC" />
                    <text x="507" y="368" textAnchor="middle" fontSize="10" fontWeight="600" fill="#16A34A" fontFamily="Inter">IL-10 ↑</text>
                </motion.g>
            </motion.g>

            {/* ── Vitamin D influence indicator ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                <rect x="510" y="130" width="120" height="110" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <text x="570" y="150" textAnchor="middle" fontSize="11" fontWeight="700" fill="#374151" fontFamily="Inter">Vitamin D Effect</text>
                <line x1="525" y1="158" x2="615" y2="158" stroke="#E5E7EB" />
                <text x="530" y="175" fontSize="10" fill="#DC2626" fontFamily="Inter">↓ Th1/Th17</text>
                <text x="530" y="190" fontSize="9" fill="#6B7280" fontFamily="Inter">(less inflammation)</text>
                <text x="530" y="210" fontSize="10" fill="#16A34A" fontFamily="Inter">↑ Treg/Th2</text>
                <text x="530" y="225" fontSize="9" fill="#6B7280" fontFamily="Inter">(more tolerance)</text>
            </motion.g>
        </svg>
    );
};

const TCellModulation = () => {
    const [vitaminDSufficient, setVitaminDSufficient] = useState(true);

    return (
        <section id="tcell" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-green-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Adaptive Immunity</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Rebalancing the T-Cell Response
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Vitamin D doesn't just boost innate immunity — it actively <em>rebalances</em> adaptive
                        immunity by suppressing pro-inflammatory T-cell subsets (Th1, Th17) while promoting
                        regulatory T cells (Treg) and tolerogenic dendritic cells.
                        <CitationBadge refId="aranow2011" claim="Vitamin D promotes tolerogenic DCs, suppresses Th1/Th17, promotes Treg and Th2 differentiation" />
                        <CitationBadge refId="adams2008" claim="VDR signaling in immune cells: Th1/Th17 suppression, Treg promotion explained by VDR transcriptional control" />
                    </p>
                </motion.div>

                {/* Interactive toggle */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white rounded-full p-1 shadow-sm border border-slate-200 flex">
                        <button
                            onClick={() => setVitaminDSufficient(false)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${!vitaminDSufficient
                                    ? 'bg-red-500 text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Deficient State
                        </button>
                        <button
                            onClick={() => setVitaminDSufficient(true)}
                            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${vitaminDSufficient
                                    ? 'bg-green-500 text-white shadow-md'
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Sufficient State
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
                    <TCellDiagram vitaminDSufficient={vitaminDSufficient} />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-sm border border-red-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="font-bold text-red-900 mb-3 text-lg">Why This Prevents Cytokine Storms</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            In severe infections (COVID-19, sepsis), unchecked Th1/Th17 responses produce a
                            "cytokine storm" — a flood of IL-6, TNF-α, and IL-17 that damages host tissue more
                            than the pathogen does. Vitamin D's ability to <strong>dampen this overreaction</strong> while
                            maintaining pathogen defense via innate immunity (cathelicidin) is what makes it
                            uniquely protective against severe outcomes.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-white p-8 rounded-2xl shadow-sm border border-green-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h4 className="font-bold text-green-900 mb-3 text-lg">Autoimmune Implications</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The promotion of Treg cells and tolerogenic dendritic cells explains vitamin D's
                            association with reduced autoimmune disease risk. The VITAL trial showed a
                            <strong>22% reduction in autoimmune disease</strong> with vitamin D supplementation over 5 years —
                            one of the most robust findings in the entire vitamin D literature.
                            <CitationBadge refId="hahn2022" claim="VITAL 5-year follow-up: 22% reduction in confirmed autoimmune disease with 2,000 IU/day vitamin D" />
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TCellModulation;
