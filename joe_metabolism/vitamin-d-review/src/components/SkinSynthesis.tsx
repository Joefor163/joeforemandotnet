import { motion } from 'framer-motion';

/* ── Animated Cross-Section of Epidermis ── */
const SkinCrossSection = () => {
    return (
        <svg viewBox="0 0 500 400" className="w-full h-auto rounded-2xl shadow-lg">
            <defs>
                <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EDE9FE" />
                    <stop offset="100%" stopColor="#FEF3C7" />
                </linearGradient>
                <linearGradient id="scGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4A97D" />
                    <stop offset="50%" stopColor="#D4B896" />
                    <stop offset="100%" stopColor="#C9A876" />
                </linearGradient>
                <linearGradient id="epiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FECDD3" />
                    <stop offset="100%" stopColor="#FBB6C0" />
                </linearGradient>
                <linearGradient id="dermGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FBB6C0" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#F87171" stopOpacity="0.25" />
                </linearGradient>
                <radialGradient id="cellBody" cx="45%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#FFE4E6" />
                    <stop offset="60%" stopColor="#FECDD3" />
                    <stop offset="100%" stopColor="#FDA4AF" />
                </radialGradient>
                <radialGradient id="basalCell" cx="45%" cy="40%" r="55%">
                    <stop offset="0%" stopColor="#FFD6D9" />
                    <stop offset="60%" stopColor="#FCA5A5" />
                    <stop offset="100%" stopColor="#F87171" />
                </radialGradient>
                <radialGradient id="nucleusGrad" cx="40%" cy="35%" r="50%">
                    <stop offset="0%" stopColor="#BE185D" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#9F1239" stopOpacity="0.7" />
                </radialGradient>
                <radialGradient id="uvGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#A78BFA" stopOpacity="1" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="d3Glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDB813" stopOpacity="1" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FDB813" stopOpacity="0" />
                </radialGradient>
                <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="uvBeamGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="dropShadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.12" />
                </filter>
                <clipPath id="svgClip">
                    <rect width="500" height="400" rx="12" />
                </clipPath>
            </defs>

            <g clipPath="url(#svgClip)">
                {/* ── SKY / EXTERIOR ── */}
                <rect width="500" height="400" fill="url(#skyGrad)" />

                {/* Sun rays */}
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <motion.line
                        key={`ray-${i}`}
                        x1={i * 72 + 20} y1={0}
                        x2={i * 72 + 36} y2={57}
                        stroke="#C4B5FD" strokeWidth="1.5" opacity="0.25"
                        animate={{ opacity: [0.15, 0.35, 0.15] }}
                        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                    />
                ))}

                {/* Label: UVB */}
                <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                    <rect x="155" y="5" width="190" height="30" rx="15" fill="#7C3AED" opacity="0.15" />
                    <text x="250" y="26" fontSize="16" fontWeight="800" fill="#6D28D9" fontFamily="Inter" textAnchor="middle">
                        ☀️ UVB 290–315 nm
                    </text>
                </motion.g>

                {/* ── UVB PHOTON BEAMS ── */}
                {[0, 1, 2, 3].map(i => (
                    <motion.g key={`uvb-${i}`}>
                        <motion.line
                            x1={70 + i * 110} y1={30}
                            x2={80 + i * 108} y2={185}
                            stroke="#8B5CF6" strokeWidth="1.5" opacity="0"
                            animate={{ opacity: [0, 0.4, 0.4, 0] }}
                            transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity }}
                        />
                        <motion.circle
                            r="6"
                            fill="url(#uvGlow)"
                            filter="url(#uvBeamGlow)"
                            animate={{
                                cx: [70 + i * 110, 75 + i * 109, 80 + i * 108],
                                cy: [15, 100, 185],
                                opacity: [0, 1, 1, 0],
                                r: [6, 5, 4],
                            }}
                            transition={{ duration: 2.5, delay: i * 0.6, repeat: Infinity, ease: "easeIn" }}
                        />
                        <motion.circle
                            r="2"
                            fill="#C4B5FD"
                            animate={{
                                cx: [70 + i * 110, 75 + i * 109],
                                cy: [15, 100],
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{ duration: 2.5, delay: i * 0.6 + 0.3, repeat: Infinity }}
                        />
                    </motion.g>
                ))}

                {/* ── STRATUM CORNEUM ── */}
                <rect x="0" y="57" width="500" height="37" fill="url(#scGrad)" />
                {Array.from({ length: 12 }, (_, i) => (
                    <g key={`sc-${i}`}>
                        <rect x={i * 44 + 2} y={60} width="40" height="7" rx="3" fill="#BFA56E" opacity="0.6" stroke="#A38A5A" strokeWidth="0.5" />
                        <rect x={i * 44 + 22} y={69} width="40" height="7" rx="3" fill="#C4A97D" opacity="0.5" stroke="#A38A5A" strokeWidth="0.5" />
                        <rect x={i * 44 + 8} y={78} width="40" height="7" rx="3" fill="#BFA56E" opacity="0.55" stroke="#A38A5A" strokeWidth="0.5" />
                    </g>
                ))}
                {/* Stratum corneum label */}
                <rect x="8" y="61" width="155" height="20" rx="5" fill="#92400E" opacity="0.12" />
                <text x="14" y="75" fontSize="13" fill="#78350F" fontWeight="700" fontFamily="Inter" opacity="0.9">STRATUM CORNEUM</text>

                {/* ── EPIDERMIS (viable) ── */}
                <rect x="0" y="94" width="500" height="93" fill="url(#epiGrad)" />

                {/* Suprabasal keratinocytes - row 1 */}
                {Array.from({ length: 7 }, (_, i) => (
                    <g key={`kc1-${i}`}>
                        <ellipse cx={i * 70 + 35} cy={114} rx="28" ry="16" fill="url(#cellBody)" stroke="#F9A8D4" strokeWidth="1" />
                        <ellipse cx={i * 70 + 33} cy={112} rx="8" ry="5" fill="url(#nucleusGrad)" />
                        <circle cx={i * 70 + 46} cy={118} r="1.5" fill="#FDA4AF" opacity="0.4" />
                    </g>
                ))}

                {/* Basal keratinocytes - row 2 (where 7-DHC lives) */}
                {Array.from({ length: 7 }, (_, i) => {
                    const isTarget = i === 3;
                    return (
                        <g key={`bl-${i}`}>
                            <ellipse cx={i * 70 + 35} cy={155} rx="28" ry="18"
                                fill={isTarget ? '#FEF3C7' : 'url(#basalCell)'}
                                stroke={isTarget ? '#F59E0B' : '#EF4444'}
                                strokeWidth={isTarget ? 2 : 1} />
                            <ellipse cx={i * 70 + 33} cy={153} rx="8" ry="5" fill="url(#nucleusGrad)" />
                        </g>
                    );
                })}

                {/* Epidermis label */}
                <rect x="8" y="97" width="82" height="18" rx="5" fill="#9F1239" opacity="0.1" />
                <text x="14" y="110" fontSize="13" fill="#9F1239" fontWeight="700" fontFamily="Inter" opacity="0.9">EPIDERMIS</text>

                {/* ── KEY REACTION: 7-DHC → Pre-D₃ ── */}
                <motion.ellipse
                    cx="245" cy="155" rx="34" ry="24"
                    fill="none" stroke="#FDB813" strokeWidth="2.5"
                    animate={{ strokeOpacity: [0.2, 0.9, 0.2], rx: [34, 36, 34], ry: [24, 26, 24] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    filter="url(#softGlow)"
                />
                <motion.ellipse
                    cx="245" cy="155" rx="40" ry="29"
                    fill="none" stroke="#FDB813" strokeWidth="1"
                    animate={{ strokeOpacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />

                {/* 7-DHC label */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <rect x="212" y="143" width="66" height="25" rx="5" fill="white" opacity="0.92" />
                    <text x="245" y="156" fontSize="13" fontWeight="800" fill="#92400E" fontFamily="Inter" textAnchor="middle">7-DHC</text>
                    <text x="245" y="165" fontSize="11" fill="#B45309" fontFamily="Inter" textAnchor="middle">→ pre-D₃</text>
                </motion.g>

                {/* Photolysis flash */}
                <motion.circle
                    cx="245" cy="155" r="10"
                    fill="#FDB813" opacity="0"
                    animate={{ opacity: [0, 0.5, 0], r: [4, 20, 24] }}
                    transition={{ duration: 1.5, delay: 2.5, repeat: Infinity, repeatDelay: 4 }}
                />

                {/* ── BASEMENT MEMBRANE ── */}
                <line x1="0" y1="187" x2="500" y2="187" stroke="#E11D48" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.3" />

                {/* ── DERMIS ── */}
                <rect x="0" y="187" width="500" height="213" fill="url(#dermGrad)" />
                <rect x="8" y="193" width="64" height="20" rx="5" fill="#991B1B" opacity="0.1" />
                <text x="14" y="207" fontSize="13" fill="#991B1B" fontWeight="700" fontFamily="Inter" opacity="0.8">DERMIS</text>

                {/* Collagen fibers */}
                {[0, 1, 2].map(i => (
                    <motion.path
                        key={`col-${i}`}
                        d={`M${i * 170},${230 + i * 10} Q${i * 170 + 85},${215 + i * 12} ${i * 170 + 170},${232 + i * 9}`}
                        stroke="#F9A8D4" strokeWidth="1" fill="none" opacity="0.2"
                    />
                ))}

                {/* ── BLOOD VESSEL ── */}
                <path d="M30,330 Q120,300 240,312 Q360,325 470,298 Q490,294 500,298"
                    stroke="#DC2626" strokeWidth="24" fill="none" opacity="0.12" strokeLinecap="round" />
                <path d="M30,330 Q120,300 240,312 Q360,325 470,298 Q490,294 500,298"
                    stroke="#DC2626" strokeWidth="2.5" fill="none" opacity="0.25" strokeLinecap="round" />
                <path d="M30,330 Q120,300 240,312 Q360,325 470,298 Q490,294 500,298"
                    stroke="#FCA5A5" strokeWidth="12" fill="none" opacity="0.15" strokeLinecap="round" />

                {/* Red blood cells flowing */}
                {[0, 1, 2, 3, 4].map(i => (
                    <motion.g key={`rbc-${i}`}>
                        <motion.ellipse
                            rx="6" ry="4"
                            fill="#DC2626" opacity="0.4"
                            animate={{
                                cx: [30 + i * 25, 500],
                                cy: [330 - i * 2, 298 + (i % 3) * 4],
                            }}
                            transition={{ duration: 5 + i * 0.5, delay: i * 1, repeat: Infinity, ease: "linear" }}
                        />
                    </motion.g>
                ))}

                {/* ── D₃ MOLECULE traveling to capillary ── */}
                <motion.g
                    animate={{
                        x: [0, 14, 32, 42],
                        y: [0, 44, 110, 175],
                        scale: [1, 1.1, 1, 0.9],
                    }}
                    transition={{ duration: 5, delay: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                >
                    <circle cx="245" cy="155" r="8" fill="url(#d3Glow)" />
                    <circle cx="245" cy="155" r="4" fill="#FDB813" />
                    <text x="256" y="159" fontSize="13" fontWeight="700" fill="#92400E" fontFamily="Inter">D₃</text>
                </motion.g>

                {/* Arrow from cell to capillary */}
                <motion.path
                    d="M262,172 C274,220 278,278 282,314"
                    stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeDasharray="5 3"
                    animate={{ strokeDashoffset: [50, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    opacity="0.55"
                />

                {/* ── CALLOUT CARDS ── */}
                {/* UVB Card — top right */}
                <motion.g
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    filter="url(#dropShadow)"
                >
                    <rect x="318" y="94" width="174" height="86" rx="10" fill="white" />
                    <rect x="318" y="94" width="174" height="86" rx="10" fill="none" stroke="#C4B5FD" strokeWidth="1.5" />
                    <circle cx="334" cy="112" r="8" fill="#EDE9FE" />
                    <text x="334" y="116" textAnchor="middle" fontSize="11">💜</text>
                    <text x="348" y="116" fontSize="14" fontWeight="700" fill="#5B21B6" fontFamily="Inter">UVB Photons</text>
                    <text x="326" y="133" fontSize="12" fill="#6B7280" fontFamily="Inter">Penetrate past dead</text>
                    <text x="326" y="148" fontSize="12" fill="#6B7280" fontFamily="Inter">corneocytes to basal layer</text>
                    <text x="326" y="163" fontSize="11" fill="#A78BFA" fontFamily="Inter" fontWeight="600">λ = 290–315 nm optimal</text>
                </motion.g>

                {/* Capillary Card — bottom right */}
                <motion.g
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    filter="url(#dropShadow)"
                >
                    <rect x="310" y="270" width="182" height="95" rx="10" fill="white" />
                    <rect x="310" y="270" width="182" height="95" rx="10" fill="none" stroke="#FCA5A5" strokeWidth="1.5" />
                    <circle cx="328" cy="289" r="8" fill="#FEE2E2" />
                    <text x="328" y="293" textAnchor="middle" fontSize="11">🩸</text>
                    <text x="342" y="293" fontSize="14" fontWeight="700" fill="#DC2626" fontFamily="Inter">Dermal Capillary</text>
                    <text x="318" y="311" fontSize="12" fill="#6B7280" fontFamily="Inter">D₃ enters blood, bound</text>
                    <text x="318" y="326" fontSize="12" fill="#6B7280" fontFamily="Inter">to vitamin D-binding</text>
                    <text x="318" y="341" fontSize="12" fill="#6B7280" fontFamily="Inter">protein (DBP)</text>
                    <text x="318" y="357" fontSize="11" fill="#EF4444" fontFamily="Inter" fontWeight="600">→ To liver for Step 2</text>
                </motion.g>

                {/* Reaction Callout — bottom left */}
                <motion.g
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.8 }}
                    filter="url(#dropShadow)"
                >
                    <rect x="10" y="210" width="238" height="70" rx="10" fill="white" />
                    <rect x="10" y="210" width="238" height="70" rx="10" fill="none" stroke="#FDE68A" strokeWidth="1.5" />
                    <text x="24" y="232" fontSize="14" fontWeight="700" fill="#92400E" fontFamily="Inter">⚡ Photolysis Reaction</text>
                    <text x="24" y="251" fontSize="13" fill="#6B7280" fontFamily="Inter">7-DHC + UVB → pre-D₃ → D₃</text>
                    <text x="24" y="268" fontSize="11" fill="#B45309" fontFamily="Inter">(thermal isomerization, ~3 days)</text>
                </motion.g>

            </g>
        </svg>
    );
};

const SkinSynthesis = () => {
    return (
        <section id="synthesis" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Step 1</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                        Photolysis in the Skin
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        Vitamin D₃ production begins when UVB radiation cleaves the B-ring of 7-dehydrocholesterol
                        in basal keratinocytes — a reaction that has powered vertebrate immunity for 500 million years.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto mb-16"
                >
                    <SkinCrossSection />
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <motion.div
                        className="bg-gradient-to-br from-violet-50 to-violet-100/50 p-6 rounded-2xl border border-violet-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="text-2xl mb-3">🌍</div>
                        <h4 className="font-bold text-slate-800 mb-2">Latitude Matters</h4>
                        <p className="text-sm text-slate-600">
                            Above ~35°N latitude, UVB intensity drops below the threshold for D₃ synthesis during winter months.
                            This creates a seasonal "vitamin D winter" lasting 4-6 months at high latitudes.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-2xl border border-amber-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="text-2xl mb-3">🧬</div>
                        <h4 className="font-bold text-slate-800 mb-2">Melanin as Filter</h4>
                        <p className="text-sm text-slate-600">
                            Melanin competes with 7-DHC for UVB photons. Individuals with darker skin (Fitzpatrick V-VI)
                            require 3-5× longer sun exposure to produce equivalent D₃ — a major factor in health disparities.
                        </p>
                    </motion.div>

                    <motion.div
                        className="bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 rounded-2xl border border-orange-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="text-2xl mb-3">🍽️</div>
                        <h4 className="font-bold text-slate-800 mb-2">Dietary Limits</h4>
                        <p className="text-sm text-slate-600">
                            Few foods naturally contain D₃ (fatty fish, egg yolks, liver). Even with fortification,
                            dietary intake rarely exceeds 200-400 IU/day — far below the ~3,000 IU a fair-skinned person
                            generates with 20 minutes of midday summer sun.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SkinSynthesis;
