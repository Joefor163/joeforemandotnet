import { motion } from 'framer-motion';
import CitationBadge from './CitationBadge';

/* ── Macrophage Autocrine Vitamin D Loop ── */
const MacrophageDiagram = () => {
    return (
        <svg viewBox="0 0 650 450" className="w-full h-auto">
            <defs>
                <radialGradient id="macroGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.5" />
                    <stop offset="70%" stopColor="#BFDBFE" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.2" />
                </radialGradient>
                <radialGradient id="macroNuc" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.3" />
                </radialGradient>
                <filter id="macGlow">
                    <feGaussianBlur stdDeviation="3" />
                </filter>
                <marker id="macArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#3B82F6" />
                </marker>
                <marker id="redArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#DC2626" />
                </marker>
                <marker id="goldArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#D97706" />
                </marker>
            </defs>

            <rect width="650" height="450" fill="#F0F9FF" rx="16" />

            {/* ── MACROPHAGE CELL ── */}
            {/* Cell body with pseudopods */}
            <motion.path
                d="M180,180 Q130,160 120,220 Q110,280 160,320 Q200,350 280,340 
           Q360,330 400,290 Q430,250 420,200 Q410,160 360,150 
           Q300,140 240,150 Q200,155 180,180 Z"
                fill="url(#macroGrad)"
                stroke="#60A5FA"
                strokeWidth="2.5"
                animate={{
                    d: [
                        "M180,180 Q130,160 120,220 Q110,280 160,320 Q200,350 280,340 Q360,330 400,290 Q430,250 420,200 Q410,160 360,150 Q300,140 240,150 Q200,155 180,180 Z",
                        "M175,185 Q125,165 115,225 Q108,282 165,322 Q205,348 285,338 Q365,328 405,288 Q435,248 425,198 Q415,158 365,148 Q305,138 245,148 Q205,153 175,185 Z",
                        "M180,180 Q130,160 120,220 Q110,280 160,320 Q200,350 280,340 Q360,330 400,290 Q430,250 420,200 Q410,160 360,150 Q300,140 240,150 Q200,155 180,180 Z",
                    ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Pseudopod extensions */}
            <motion.path
                d="M120,220 Q90,200 70,210 Q60,215 65,225"
                fill="url(#macroGrad)" stroke="#60A5FA" strokeWidth="1.5"
                animate={{
                    d: [
                        "M120,220 Q90,200 70,210 Q60,215 65,225",
                        "M120,220 Q85,195 60,205 Q48,212 55,225",
                        "M120,220 Q90,200 70,210 Q60,215 65,225",
                    ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Nucleus */}
            <ellipse cx="280" cy="250" rx="60" ry="40" fill="url(#macroNuc)" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="280" y="253" textAnchor="middle" fontSize="12" fontWeight="600" fill="#1E3A8A" fontFamily="Inter" opacity="0.6">Nucleus</text>

            {/* Cell label */}
            <text x="270" y="170" textAnchor="middle" fontSize="15" fontWeight="800" fill="#1E40AF" fontFamily="Inter" opacity="0.3">MACROPHAGE</text>

            {/* ── STEP 1: TLR detects pathogen ── */}
            {/* Pathogen (bacterium) */}
            <motion.g
                animate={{ x: [0, 15, 25], opacity: [0.5, 1, 1] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            >
                <ellipse cx="30" cy="210" rx="18" ry="10" fill="#DC2626" opacity="0.7" stroke="#991B1B" strokeWidth="1" />
                <text x="30" y="213" textAnchor="middle" fontSize="9" fill="white" fontWeight="600" fontFamily="Inter">PAMP</text>
                <text x="30" y="235" textAnchor="middle" fontSize="10" fill="#DC2626" fontFamily="Inter">pathogen</text>
            </motion.g>

            {/* TLR receptors on pseudopod */}
            <motion.g>
                <rect x="68" y="200" width="30" height="20" rx="5" fill="#EF4444" opacity="0.8" />
                <text x="83" y="213" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter">TLR</text>
                <text x="83" y="190" textAnchor="middle" fontSize="9" fill="#DC2626" fontFamily="Inter">2/1</text>
            </motion.g>

            {/* Step 1 label */}
            <rect x="20" y="120" width="120" height="40" rx="8" fill="white" stroke="#FCA5A5" strokeWidth="1.5" />
            <text x="35" y="138" fontSize="11" fontWeight="700" fill="#DC2626" fontFamily="Inter">① TLR Detection</text>
            <text x="35" y="150" fontSize="10" fill="#6B7280" fontFamily="Inter">PAMP recognized</text>
            <line x1="83" y1="160" x2="83" y2="190" stroke="#FCA5A5" strokeWidth="1" strokeDasharray="3 3" />

            {/* ── STEP 2: Signal cascade → CYP27B1 + VDR upregulation ── */}
            <motion.path
                d="M100,215 Q150,240 200,250 Q230,255 260,250"
                stroke="#DC2626"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                markerEnd="url(#redArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1, duration: 1.5, repeat: Infinity, repeatDelay: 6 }}
            />

            {/* Nuclear signal output */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.path
                    d="M310,230 Q350,200 380,205"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#macArrow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                />

                <rect x="20" y="275" width="120" height="50" rx="8" fill="white" stroke="#93C5FD" strokeWidth="1.5" />
                <text x="35" y="293" fontSize="11" fontWeight="700" fill="#1E40AF" fontFamily="Inter">② Gene Upregulation</text>
                <text x="35" y="305" fontSize="10" fill="#3B82F6" fontFamily="Inter">↑ CYP27B1 enzyme</text>
                <text x="35" y="315" fontSize="10" fill="#3B82F6" fontFamily="Inter">↑ VDR expression</text>
            </motion.g>

            {/* ── STEP 3: CYP27B1 converts 25(OH)D → Calcitriol ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                {/* Circulating 25(OH)D entering */}
                <motion.g
                    animate={{
                        x: [0, -40, -80],
                        y: [0, 20, 40],
                        opacity: [0, 0.8, 1],
                    }}
                    transition={{ duration: 3, delay: 2.5, repeat: Infinity, repeatDelay: 5 }}
                >
                    <circle cx="480" cy="140" r="14" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="1.5" />
                    <text x="480" y="138" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E40AF" fontFamily="Inter">25</text>
                    <text x="480" y="148" textAnchor="middle" fontSize="8" fill="#3B82F6" fontFamily="Inter">(OH)D</text>
                </motion.g>

                {/* CYP27B1 enzyme (inside cell) */}
                <motion.g
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ transformOrigin: '390px 210px' }}
                >
                    <rect x="370" y="198" width="55" height="24" rx="12" fill="#8B5CF6" />
                    <text x="397" y="214" textAnchor="middle" fontSize="10" fontWeight="600" fill="white" fontFamily="Inter">CYP27B1</text>
                </motion.g>

                <rect x="450" y="275" width="120" height="50" rx="8" fill="white" stroke="#C4B5FD" strokeWidth="1.5" />
                <text x="465" y="293" fontSize="11" fontWeight="700" fill="#7C3AED" fontFamily="Inter">③ Local Activation</text>
                <text x="465" y="305" fontSize="10" fill="#6B7280" fontFamily="Inter">25(OH)D → 1,25(OH)₂D</text>
                <text x="465" y="315" fontSize="10" fill="#6B7280" fontFamily="Inter">inside the macrophage</text>
            </motion.g>

            {/* ── STEP 4: Calcitriol → VDR → Cathelicidin ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
                {/* Active calcitriol pulse */}
                <motion.circle
                    cx="360" cy="260" r="10"
                    fill="#16A34A"
                    animate={{ r: [8, 12, 8], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 3.5 }}
                />
                <text x="360" y="263" textAnchor="middle" fontSize="8" fontWeight="700" fill="white" fontFamily="Inter">1,25D</text>

                {/* Arrow to cathelicidin output */}
                <motion.path
                    d="M370,270 Q400,310 430,330 Q460,345 500,350"
                    stroke="#D97706"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#goldArrow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 4, duration: 1.5 }}
                />

                {/* Cathelicidin output */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 5, duration: 0.6 }}
                    style={{ transformOrigin: '560px 370px' }}
                >
                    <rect x="500" y="340" width="130" height="55" rx="10" fill="#FEF3C7" stroke="#FDB813" strokeWidth="2" />
                    <text x="565" y="358" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E" fontFamily="Inter">④ Cathelicidin!</text>
                    <text x="565" y="372" textAnchor="middle" fontSize="10" fill="#B45309" fontFamily="Inter">LL-37 produced →</text>
                    <text x="565" y="385" textAnchor="middle" fontSize="10" fill="#B45309" fontFamily="Inter">pathogen killed 🎯</text>
                </motion.g>
            </motion.g>

            {/* ── KEY INSIGHT CALLOUT ── */}
            <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <rect x="440" y="60" width="195" height="55" rx="10" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1.5" />
                <text x="455" y="80" fontSize="11" fontWeight="700" fill="#991B1B" fontFamily="Inter">🔑 Key Insight</text>
                <text x="455" y="93" fontSize="10" fill="#DC2626" fontFamily="Inter">Macrophages need circulating</text>
                <text x="455" y="104" fontSize="10" fill="#DC2626" fontFamily="Inter">25(OH)D as substrate — this is why</text>
                <text x="455" y="114" fontSize="10" fontWeight="600" fill="#991B1B" fontFamily="Inter">serum levels predict immune function</text>
            </motion.g>

            {/* Circular arrow indicating autocrine */}
            <motion.path
                d="M340,300 Q310,340 340,360 Q380,380 400,340 Q410,310 380,295"
                stroke="#6366F1"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="5 5"
                opacity="0.4"
            />
            <text x="350" y="370" textAnchor="middle" fontSize="10" fill="#6366F1" fontFamily="Inter" fontWeight="600" opacity="0.5">autocrine</text>
        </svg>
    );
};

const MacrophageLoop = () => {
    return (
        <section id="macrophage" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-indigo-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Critical Mechanism</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        The Macrophage Autocrine Loop
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        The pivotal discovery: macrophages don't wait for the kidney. When they detect a pathogen,
                        they activate vitamin D locally, on-demand, producing their own cathelicidin. This autocrine loop
                        is the strongest mechanistic link between vitamin D status and infection defense.
                        <CitationBadge refId="liu2006" claim="Macrophages express CYP27B1 and locally convert 25(OH)D to calcitriol, inducing cathelicidin to kill intracellular bacteria" />
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <MacrophageDiagram />
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h4 className="font-bold mb-3 text-lg">
                        Liu et al. (2006) — The Landmark Paper
                        <CitationBadge refId="liu2006" claim="TLR2/1 activation upregulates VDR and CYP27B1; local calcitriol induces cathelicidin to kill M. tuberculosis" />
                    </h4>
                    <p className="text-blue-100 text-sm leading-relaxed mb-3">
                        Published in <em>Science</em>, this study demonstrated that TLR2/1 activation of human macrophages
                        by <em>M. tuberculosis</em> upregulated both VDR and CYP27B1 expression. When sufficient 25(OH)D
                        was available, the macrophages converted it to calcitriol locally, induced cathelicidin, and
                        killed the intracellular bacteria.
                    </p>
                    <p className="text-blue-200 text-sm leading-relaxed">
                        Critically, when the researchers used serum from African-American donors (who had lower 25(OH)D
                        levels), the macrophages could <strong>not</strong> generate enough cathelicidin to kill TB —
                        directly linking serum vitamin D status to innate antimicrobial capacity.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default MacrophageLoop;
