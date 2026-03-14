import { motion } from 'framer-motion';
import CitationBadge from './CitationBadge';

/* ── VDR Nuclear Receptor Signaling ── */
const NuclearSignalingDiagram = () => {
    return (
        <svg viewBox="0 0 650 440" className="w-full h-auto">
            <defs>
                <radialGradient id="cytoGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0.1" />
                </radialGradient>
                <radialGradient id="nucGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.2" />
                </radialGradient>
                <filter id="nucGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <marker id="sigArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#6366F1" />
                </marker>
                <marker id="greenArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#16A34A" />
                </marker>
            </defs>

            <rect width="650" height="440" fill="#FAFBFF" rx="16" />

            {/* ── CELL MEMBRANE ── */}
            <motion.g>
                {/* Phospholipid bilayer (top of cell) */}
                <rect x="30" y="60" width="590" height="12" rx="6" fill="#86EFAC" opacity="0.5" />
                {/* Lipid head groups */}
                {Array.from({ length: 30 }, (_, i) => (
                    <circle key={`lip-${i}`} cx={45 + i * 20} cy={60} r="4" fill="#4ADE80" opacity="0.6" />
                ))}
                {Array.from({ length: 30 }, (_, i) => (
                    <circle key={`lip2-${i}`} cx={45 + i * 20} cy={72} r="4" fill="#4ADE80" opacity="0.6" />
                ))}
                <text x="580" y="55" textAnchor="end" fontSize="11" fill="#166534" fontWeight="600" fontFamily="Inter" opacity="0.6">
                    PLASMA MEMBRANE
                </text>
            </motion.g>

            {/* ── CYTOPLASM ── */}
            <rect x="30" y="72" width="590" height="368" rx="0 0 16 16" fill="url(#cytoGrad)" />
            <text x="50" y="95" fontSize="11" fill="#92400E" fontWeight="600" fontFamily="Inter" opacity="0.4">CYTOPLASM</text>

            {/* ── NUCLEUS ── */}
            <ellipse cx="420" cy="310" rx="180" ry="100" fill="url(#nucGrad)" stroke="#60A5FA" strokeWidth="2" strokeDasharray="6 4" />
            <text x="420" y="235" textAnchor="middle" fontSize="12" fill="#1E40AF" fontWeight="700" fontFamily="Inter" opacity="0.5">NUCLEUS</text>

            {/* Nuclear envelope pore */}
            <motion.g>
                <rect x="300" y="208" width="30" height="14" rx="7" fill="#60A5FA" opacity="0.3" />
                <text x="315" y="218" textAnchor="middle" fontSize="8" fill="#1E40AF" fontFamily="Inter">NPC</text>
            </motion.g>

            {/* ── STEP 1: Calcitriol enters cell ── */}
            <motion.g
                animate={{
                    x: [0, 60, 120],
                    y: [0, 30, 50],
                    opacity: [0, 1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 8 }}
            >
                <circle cx="80" cy="45" r="10" fill="#16A34A" opacity="0.8" />
                <text x="80" y="49" textAnchor="middle" fontSize="9" fontWeight="700" fill="white" fontFamily="Inter">1,25D</text>
            </motion.g>

            {/* Step 1 label */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <rect x="40" y="105" width="130" height="30" rx="6" fill="white" stroke="#E5E7EB" />
                <text x="55" y="118" fontSize="11" fill="#6366F1" fontWeight="700" fontFamily="Inter">① Calcitriol diffuses</text>
                <text x="55" y="128" fontSize="10" fill="#6B7280" fontFamily="Inter">through membrane (lipophilic)</text>
            </motion.g>

            {/* ── STEP 2: VDR binding ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                {/* VDR receptor */}
                <motion.g
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ transformOrigin: '210px 160px' }}
                >
                    <rect x="185" y="140" width="50" height="35" rx="8" fill="#8B5CF6" />
                    <text x="210" y="158" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Inter">VDR</text>
                    <text x="210" y="170" textAnchor="middle" fontSize="9" fill="#DDD6FE" fontFamily="Inter">receptor</text>
                </motion.g>

                {/* Calcitriol binding to VDR */}
                <motion.circle
                    cx="195" cy="145" r="8"
                    fill="#16A34A"
                    animate={{ cx: [180, 195], cy: [120, 145], opacity: [0, 1] }}
                    transition={{ duration: 1.5, delay: 2, repeat: Infinity, repeatDelay: 9 }}
                />

                <rect x="185" y="185" width="100" height="25" rx="6" fill="white" stroke="#E5E7EB" />
                <text x="195" y="198" fontSize="11" fill="#6366F1" fontWeight="700" fontFamily="Inter">② Binds VDR</text>
                <text x="195" y="206" fontSize="9" fill="#6B7280" fontFamily="Inter">conformational change</text>
            </motion.g>

            {/* ── STEP 3: VDR-RXR heterodimerization ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                {/* RXR receptor */}
                <motion.rect
                    x="255" y="140" width="40" height="35" rx="8" fill="#EC4899"
                    animate={{ x: [290, 255] }}
                    transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 9 }}
                />
                <motion.text
                    x="275" y="158" textAnchor="middle" fontSize="12" fontWeight="700" fill="white" fontFamily="Inter"
                    animate={{ x: [310, 275] }}
                    transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 9 }}
                >RXR</motion.text>
                <motion.text
                    x="275" y="170" textAnchor="middle" fontSize="9" fill="#FBCFE8" fontFamily="Inter"
                    animate={{ x: [310, 275] }}
                    transition={{ duration: 1.5, delay: 3, repeat: Infinity, repeatDelay: 9 }}
                >co-receptor</motion.text>

                {/* Dimerization bracket */}
                <motion.path
                    d="M182,175 L182,180 L298,180 L298,175"
                    stroke="#6366F1"
                    strokeWidth="1.5"
                    fill="none"
                    animate={{ opacity: [0, 0, 1] }}
                    transition={{ duration: 4, delay: 3, repeat: Infinity, repeatDelay: 7 }}
                />

                <rect x="320" y="150" width="95" height="25" rx="6" fill="white" stroke="#E5E7EB" />
                <text x="330" y="163" fontSize="11" fill="#6366F1" fontWeight="700" fontFamily="Inter">③ VDR + RXR</text>
                <text x="330" y="172" fontSize="9" fill="#6B7280" fontFamily="Inter">heterodimer forms</text>
            </motion.g>

            {/* ── Arrow into nucleus ── */}
            <motion.line
                x1="240" y1="185" x2="315" y2="215"
                stroke="#6366F1" strokeWidth="2"
                strokeDasharray="4 4"
                markerEnd="url(#sigArrow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
            />

            {/* ── STEP 4: DNA binding ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
                {/* DNA double helix (simplified) */}
                <motion.path
                    d="M320,310 Q340,290 360,310 Q380,330 400,310 Q420,290 440,310 Q460,330 480,310 Q500,290 520,310"
                    stroke="#60A5FA"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 3, duration: 2 }}
                />
                <motion.path
                    d="M320,320 Q340,340 360,320 Q380,300 400,320 Q420,340 440,320 Q460,300 480,320 Q500,340 520,320"
                    stroke="#93C5FD"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 3.2, duration: 2 }}
                />

                {/* VDRE binding site highlight */}
                <motion.rect
                    x="385" y="295" width="55" height="40" rx="6"
                    fill="#FEF08A" opacity="0.4"
                    stroke="#F59E0B" strokeWidth="1.5"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 4 }}
                />
                <text x="412" y="290" textAnchor="middle" fontSize="10" fontWeight="700" fill="#92400E" fontFamily="Inter">VDRE</text>

                {/* VDR-RXR complex on DNA */}
                <motion.g
                    animate={{ y: [0, 0, 0] }}
                    transition={{ delay: 4 }}
                >
                    <rect x="388" y="270" width="48" height="18" rx="4" fill="#8B5CF6" opacity="0.9" />
                    <text x="412" y="282" textAnchor="middle" fontSize="9" fontWeight="600" fill="white" fontFamily="Inter">VDR-RXR</text>
                </motion.g>

                <rect x="335" y="355" width="95" height="25" rx="6" fill="white" stroke="#E5E7EB" />
                <text x="345" y="368" fontSize="11" fill="#6366F1" fontWeight="700" fontFamily="Inter">④ Binds VDRE</text>
                <text x="345" y="377" fontSize="9" fill="#6B7280" fontFamily="Inter">on target genes</text>
            </motion.g>

            {/* ── STEP 5: Gene products ── */}
            <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5 }}>
                {/* mRNA emerging */}
                <motion.path
                    d="M465,310 L530,310 L530,250 L570,250"
                    stroke="#16A34A" strokeWidth="2" fill="none"
                    strokeDasharray="4 3"
                    markerEnd="url(#greenArrow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 4, duration: 1.5 }}
                />
                <text x="540" y="240" fontSize="10" fill="#166534" fontWeight="600" fontFamily="Inter">mRNA →</text>

                {/* Gene targets */}
                <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5 }}
                >
                    <rect x="520" y="99" width="110" height="95" rx="10" fill="white" stroke="#86EFAC" strokeWidth="1.5" />
                    <text x="575" y="117" textAnchor="middle" fontSize="11" fontWeight="700" fill="#166534" fontFamily="Inter">⑤ Gene Products</text>

                    <circle cx="540" cy="135" r="3" fill="#FDB813" />
                    <text x="548" y="138" fontSize="10" fill="#374151" fontFamily="Inter">Cathelicidin (CAMP)</text>

                    <circle cx="540" cy="153" r="3" fill="#3B82F6" />
                    <text x="548" y="156" fontSize="10" fill="#374151" fontFamily="Inter">β-Defensin 2 (DEFB4)</text>

                    <circle cx="540" cy="171" r="3" fill="#EF4444" />
                    <text x="548" y="174" fontSize="10" fill="#374151" fontFamily="Inter">CYP24A1 (feedback)</text>

                    <circle cx="540" cy="186" r="3" fill="#8B5CF6" />
                    <text x="548" y="189" fontSize="10" fill="#374151" fontFamily="Inter">IL-10 (anti-inflam.)</text>
                </motion.g>
            </motion.g>
        </svg>
    );
};

const VDRSignaling = () => {
    return (
        <section id="vdr-signaling" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-violet-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Step 3</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        VDR Nuclear Signaling
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Calcitriol is a nuclear hormone. It enters the cell, binds the Vitamin D Receptor (VDR),
                        recruits a co-receptor (RXR), and directly activates gene transcription —
                        including the genes for antimicrobial peptides.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <NuclearSignalingDiagram />
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto bg-gradient-to-r from-violet-50 to-indigo-50 p-8 rounded-2xl border border-violet-100"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h4 className="font-bold text-violet-900 mb-3 text-lg">Why This Matters: VDR Is Everywhere</h4>
                    <p className="text-violet-800 text-sm leading-relaxed mb-4">
                        The VDR is expressed in over <strong>30 different tissue types</strong>, including nearly every cell of the
                        immune system — monocytes, macrophages, dendritic cells, T cells, and B cells.
                        <CitationBadge refId="aranow2011" claim="VDR expressed in monocytes, macrophages, dendritic cells, T and B lymphocytes" />
                        {' '}Genome-wide studies have identified <strong>2,776 VDR binding sites</strong> (VDREs) across the human genome, influencing
                        the expression of ~229 genes.
                        <CitationBadge refId="aranow2011" claim="2,776 VDR binding sites identified genome-wide, influencing ~229 genes" />
                    </p>
                    <p className="text-violet-700 text-sm leading-relaxed">
                        This makes vitamin D one of the most pleiotropic hormones in human biology. Its effects extend far
                        beyond calcium homeostasis — immune regulation, cell differentiation, apoptosis, and barrier function
                        are all under direct VDR transcriptional control.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default VDRSignaling;
