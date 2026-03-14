import { motion } from 'framer-motion';

/* ── Two-Step Hydroxylation Cascade ── */
const CascadeDiagram = () => {
    return (
        <svg viewBox="0 0 800 420" className="w-full h-auto rounded-2xl shadow-lg">
            <defs>
                <radialGradient id="liverGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#7F1D1D" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#991B1B" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#B91C1C" stopOpacity="0.3" />
                </radialGradient>
                <radialGradient id="kidneyGrad" cx="40%" cy="35%" r="60%">
                    <stop offset="0%" stopColor="#581C87" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#6B21A8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.25" />
                </radialGradient>
                <radialGradient id="molD3" cx="40%" cy="35%" r="50%">
                    <stop offset="0%" stopColor="#FDE68A" />
                    <stop offset="100%" stopColor="#F59E0B" />
                </radialGradient>
                <radialGradient id="mol25" cx="40%" cy="35%" r="50%">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="100%" stopColor="#3B82F6" />
                </radialGradient>
                <radialGradient id="mol125" cx="40%" cy="35%" r="50%">
                    <stop offset="0%" stopColor="#86EFAC" />
                    <stop offset="100%" stopColor="#16A34A" />
                </radialGradient>
                <filter id="organShadow">
                    <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.1" />
                </filter>
                <filter id="molGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="cardShadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.08" />
                </filter>
                <linearGradient id="flowArrow" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#94A3B8" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#94A3B8" stopOpacity="0.2" />
                </linearGradient>
            </defs>

            {/* Background */}
            <rect width="800" height="420" fill="#FAFBFE" rx="16" />
            {/* Subtle grid */}
            {Array.from({ length: 20 }, (_, i) => (
                <line key={`g-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="420" stroke="#E2E8F0" strokeWidth="0.5" opacity="0.3" />
            ))}
            {Array.from({ length: 11 }, (_, i) => (
                <line key={`gh-${i}`} x1="0" y1={i * 40} x2="800" y2={i * 40} stroke="#E2E8F0" strokeWidth="0.5" opacity="0.3" />
            ))}

            {/* ── FLOW LINE (main backbone) ── */}
            <path d="M85,165 L200,165 L310,165 L420,165 L530,165 L640,165 L730,165"
                stroke="#CBD5E1" strokeWidth="4" fill="none" opacity="0.3" strokeLinecap="round" />

            {/* Animated flow particles */}
            {[0, 1, 2].map(i => (
                <motion.circle key={`flow-${i}`} r="3" fill="#94A3B8" opacity="0.4"
                    animate={{ cx: [85, 730] }}
                    transition={{ duration: 8, delay: i * 2.5, repeat: Infinity, ease: "linear" }}
                    cy={165}
                />
            ))}

            {/* ── STAGE 1: D₃ ── */}
            <motion.g initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                {/* Molecule circle */}
                <circle cx="85" cy="165" r="32" fill="url(#molD3)" filter="url(#organShadow)" />
                <circle cx="85" cy="165" r="32" fill="none" stroke="#F59E0B" strokeWidth="2" />
                <text x="85" y="160" textAnchor="middle" fontSize="16" fontWeight="800" fill="#78350F" fontFamily="Inter">D₃</text>
                <text x="85" y="175" textAnchor="middle" fontSize="10" fill="#92400E" fontFamily="Inter">Cholecalciferol</text>
                {/* Origin label */}
                <text x="85" y="215" textAnchor="middle" fontSize="11" fill="#94A3B8" fontFamily="Inter">from skin / diet</text>
            </motion.g>

            {/* ── ARROW 1 ── */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <path d="M120,165 L185,165" stroke="#94A3B8" strokeWidth="2.5" fill="none"
                    markerEnd="url(#arrowhead)" />
                <text x="152" y="155" textAnchor="middle" fontSize="10" fill="#6B7280" fontFamily="Inter">blood</text>
            </motion.g>

            {/* ── STAGE 2: LIVER ── */}
            <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                filter="url(#organShadow)">
                {/* Liver shape - organic blob */}
                <path d="M200,120 C230,100 290,98 310,120 C330,142 325,180 300,200 C280,215 240,218 220,200 C195,178 185,145 200,120"
                    fill="url(#liverGrad)" />
                <path d="M200,120 C230,100 290,98 310,120 C330,142 325,180 300,200 C280,215 240,218 220,200 C195,178 185,145 200,120"
                    fill="none" stroke="#7F1D1D" strokeWidth="1.5" opacity="0.4" />
                <text x="255" y="140" textAnchor="middle" fontSize="15" fontWeight="700" fill="white" fontFamily="Inter">Liver</text>
                {/* Enzyme label */}
                <rect x="228" y="152" width="56" height="22" rx="11" fill="#F97316" />
                <text x="256" y="167" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Inter">CYP2R1</text>
                {/* +OH indicator */}
                <motion.g animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}>
                    <circle cx="262" cy="195" r="12" fill="#FFEDD5" stroke="#F97316" strokeWidth="1.5" />
                    <text x="262" y="199" textAnchor="middle" fontSize="11" fontWeight="700" fill="#EA580C" fontFamily="Inter">+OH</text>
                </motion.g>
            </motion.g>

            {/* ── ARROW 2 ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                <path d="M320,165 L385,165" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
                <polygon points="385,160 395,165 385,170" fill="#94A3B8" />
            </motion.g>

            {/* ── STAGE 3: 25(OH)D ── */}
            <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }}>
                <circle cx="430" cy="165" r="38" fill="url(#mol25)" filter="url(#organShadow)" />
                <circle cx="430" cy="165" r="38" fill="none" stroke="#2563EB" strokeWidth="2.5" />
                <text x="430" y="158" textAnchor="middle" fontSize="15" fontWeight="800" fill="white" fontFamily="Inter">25(OH)D</text>
                <text x="430" y="174" textAnchor="middle" fontSize="10" fill="#DBEAFE" fontFamily="Inter">Calcidiol</text>

                {/* ── BLOOD TEST callout ── */}
                <motion.g filter="url(#cardShadow)"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <rect x="370" y="225" width="120" height="55" rx="10" fill="white" />
                    <rect x="370" y="225" width="120" height="55" rx="10" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
                    <text x="395" y="245" fontSize="12" fontWeight="700" fill="#1D4ED8" fontFamily="Inter">📊 Blood Test</text>
                    <text x="395" y="259" fontSize="10" fill="#6B7280" fontFamily="Inter">measures THIS form</text>
                    <text x="395" y="272" fontSize="10" fill="#3B82F6" fontWeight="600" fontFamily="Inter">t½ = 2-3 weeks</text>
                </motion.g>
            </motion.g>

            {/* ── ARROW 3 ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
                <path d="M470,165 L535,165" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
                <polygon points="535,160 545,165 535,170" fill="#94A3B8" />
            </motion.g>

            {/* ── STAGE 4: KIDNEY ── */}
            <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}
                filter="url(#organShadow)">
                {/* Kidney shape - bean */}
                <path d="M555,120 C590,95 630,108 640,140 C650,172 640,200 620,210 C600,220 575,212 565,195 C555,178 548,155 555,120"
                    fill="url(#kidneyGrad)" />
                <path d="M555,120 C590,95 630,108 640,140 C650,172 640,200 620,210 C600,220 575,212 565,195 C555,178 548,155 555,120"
                    fill="none" stroke="#6B21A8" strokeWidth="1.5" opacity="0.4" />
                <text x="598" y="145" textAnchor="middle" fontSize="15" fontWeight="700" fill="white" fontFamily="Inter">Kidney</text>
                {/* Enzyme */}
                <rect x="572" y="155" width="56" height="22" rx="11" fill="#7C3AED" />
                <text x="600" y="170" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Inter">CYP27B1</text>
                {/* +OH */}
                <motion.g animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}>
                    <circle cx="605" cy="198" r="12" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
                    <text x="605" y="202" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6D28D9" fontFamily="Inter">+OH</text>
                </motion.g>
            </motion.g>

            {/* ── ARROW 4 ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
                <path d="M650,165 L700,165" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
                <polygon points="700,160 710,165 700,170" fill="#94A3B8" />
            </motion.g>

            {/* ── STAGE 5: CALCITRIOL ── */}
            <motion.g initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 }}>
                <circle cx="740" cy="165" r="40" fill="url(#mol125)" filter="url(#organShadow)" />
                <circle cx="740" cy="165" r="40" fill="none" stroke="#059669" strokeWidth="3" />
                {/* Sparkle effect */}
                <motion.circle cx="740" cy="165" r="40" fill="none" stroke="#86EFAC" strokeWidth="2"
                    animate={{ r: [40, 48, 40], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                />
                <text x="740" y="155" textAnchor="middle" fontSize="13" fontWeight="800" fill="white" fontFamily="Inter">1,25(OH)₂D</text>
                <text x="740" y="170" textAnchor="middle" fontSize="11" fill="#DCFCE7" fontFamily="Inter">Calcitriol</text>
                <text x="740" y="185" textAnchor="middle" fontSize="10" fill="#BBF7D0" fontWeight="600" fontFamily="Inter">⚡ ACTIVE</text>
            </motion.g>

            {/* ── IMMUNE CELL BRANCH ── */}
            <motion.g initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.8 }}>
                {/* Branch line from 25(OH)D down */}
                <path d="M430,210 C430,260 480,310 530,340" stroke="#059669" strokeWidth="2.5" fill="none" strokeDasharray="6 3" />
                <polygon points="530,335 538,345 525,345" fill="#059669" />

                {/* Immune cell card */}
                <g filter="url(#cardShadow)">
                    <rect x="540" y="310" width="190" height="70" rx="12" fill="white" />
                    <rect x="540" y="310" width="190" height="70" rx="12" fill="none" stroke="#86EFAC" strokeWidth="2" />
                    <text x="565" y="335" fontSize="13" fontWeight="700" fill="#065F46" fontFamily="Inter">🧬 Immune Cell Shortcut</text>
                    <text x="565" y="350" fontSize="11" fill="#6B7280" fontFamily="Inter">Macrophages also express CYP27B1</text>
                    <text x="565" y="365" fontSize="11" fill="#059669" fontWeight="600" fontFamily="Inter">→ local activation bypasses kidney!</text>
                </g>
            </motion.g>

            {/* ── TRAVELING MOLECULE ── */}
            <motion.g filter="url(#molGlow)">
                <motion.circle
                    r="6"
                    animate={{
                        cx: [85, 255, 430, 600, 740],
                        cy: [165, 165, 165, 165, 165],
                        fill: ['#FDB813', '#FDB813', '#3B82F6', '#7C3AED', '#16A34A'],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
            </motion.g>

            {/* ── SUFFICIENCY THRESHOLDS (top right) ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                filter="url(#cardShadow)">
                <rect x="20" y="20" width="280" height="70" rx="12" fill="white" />
                <rect x="20" y="20" width="280" height="70" rx="12" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
                <text x="40" y="42" fontSize="12" fontWeight="700" fill="#374151" fontFamily="Inter">25(OH)D Sufficiency Thresholds</text>
                <rect x="40" y="50" width="70" height="22" rx="6" fill="#FEF3C7" stroke="#FDE68A" />
                <text x="75" y="62" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E" fontFamily="Inter">Deficient</text>
                <text x="75" y="73" textAnchor="middle" fontSize="9" fill="#B45309" fontFamily="Inter">&lt;20 ng/mL</text>
                <rect x="120" y="50" width="80" height="22" rx="6" fill="#FFF7ED" stroke="#FDBA74" />
                <text x="160" y="62" textAnchor="middle" fontSize="10" fontWeight="700" fill="#9A3412" fontFamily="Inter">Insufficient</text>
                <text x="160" y="73" textAnchor="middle" fontSize="9" fill="#EA580C" fontFamily="Inter">20-30 ng/mL</text>
                <rect x="210" y="50" width="70" height="22" rx="6" fill="#F0FDF4" stroke="#86EFAC" />
                <text x="245" y="62" textAnchor="middle" fontSize="10" fontWeight="700" fill="#166534" fontFamily="Inter">Sufficient</text>
                <text x="245" y="73" textAnchor="middle" fontSize="9" fill="#16A34A" fontFamily="Inter">&gt;30 ng/mL</text>
            </motion.g>
        </svg>
    );
};

const ActivationPathway = () => {
    return (
        <section id="activation" className="py-24 bg-slate-50">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Step 2</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        The Hydroxylation Cascade
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Vitamin D₃ is biologically inert. It must be activated through two
                        sequential hydroxylation steps — first in the liver, then in the kidney — to
                        become the potent hormone calcitriol.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto mb-16"
                >
                    <CascadeDiagram />
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="font-bold text-slate-900 text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                        Why 25(OH)D is the Biomarker
                    </h3>
                    <p className="text-slate-600 leading-relaxed mb-4">
                        Calcidiol [25(OH)D] has a half-life of ~2-3 weeks, making it a stable indicator of
                        vitamin D status. Calcitriol's half-life is only 4-6 hours and is tightly regulated by
                        PTH, calcium, and phosphate — making it unreliable for assessing body stores.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <div className="px-5 py-3 bg-yellow-50 rounded-xl border border-yellow-200">
                            <div className="text-sm font-bold text-yellow-800">Deficient</div>
                            <div className="text-lg font-bold text-yellow-600">&lt;20 ng/mL</div>
                        </div>
                        <div className="px-5 py-3 bg-orange-50 rounded-xl border border-orange-200">
                            <div className="text-sm font-bold text-orange-800">Insufficient</div>
                            <div className="text-lg font-bold text-orange-600">20-30 ng/mL</div>
                        </div>
                        <div className="px-5 py-3 bg-green-50 rounded-xl border border-green-200">
                            <div className="text-sm font-bold text-green-800">Sufficient</div>
                            <div className="text-lg font-bold text-green-600">&gt;30 ng/mL</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ActivationPathway;
