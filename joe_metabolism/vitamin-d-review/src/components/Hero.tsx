import { motion } from 'framer-motion';
import { ShieldCheck, BookOpen, FlaskConical } from 'lucide-react';

/* ── Animated Vitamin D₃ Molecule ── */
const VitaminD3Molecule = () => {
  // Secosteroid A/B/C/D ring skeleton (simplified structural formula)
  const ringPath = "M60,120 L75,100 L95,100 L110,115 L100,135 L80,135 Z"; // C ring
  const dRingPath = "M110,115 L130,108 L140,120 L130,135 L100,135 Z"; // D ring
  const sideChain = "M140,120 L155,110 L170,115 L185,105 L200,110"; // side chain
  const brokenBRing = "M75,100 L65,82 M60,120 L45,130 L35,115 L45,100"; // broken B-ring (seco)

  return (
    <svg viewBox="0 0 300 260" className="w-full h-auto">
      <defs>
        <radialGradient id="molGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FDB813" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FDB813" stopOpacity="0" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="uvGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background glow */}
      <motion.circle
        cx="120" cy="130" r="90"
        fill="url(#molGlow)"
        animate={{ r: [85, 95, 85] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* UV Photon particles falling */}
      {[0, 1, 2, 3, 4].map(i => (
        <motion.circle
          key={i}
          r="3"
          fill="#A78BFA"
          filter="url(#glow)"
          initial={{ cx: 50 + i * 55, cy: -10, opacity: 0 }}
          animate={{
            cy: [-10, 260],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.7,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Molecule structure group */}
      <motion.g
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{ transformOrigin: '120px 130px' }}
      >
        {/* Broken B-ring (the "seco" in secosteroid) */}
        <motion.path
          d={brokenBRing}
          stroke="#F59E0B"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        />

        {/* C ring */}
        <motion.path
          d={ringPath}
          stroke="#F59E0B"
          strokeWidth="3"
          fill="rgba(253,184,19,0.08)"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
        />

        {/* D ring */}
        <motion.path
          d={dRingPath}
          stroke="#E8A317"
          strokeWidth="3"
          fill="rgba(232,163,23,0.08)"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />

        {/* Side chain */}
        <motion.path
          d={sideChain}
          stroke="#D97706"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
        />

        {/* Hydroxyl groups (-OH) */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          {/* 3-OH */}
          <circle cx="35" cy="115" r="8" fill="#EF4444" opacity="0.15" />
          <circle cx="35" cy="115" r="4" fill="#EF4444" />
          <text x="18" y="110" fontSize="10" fill="#DC2626" fontWeight="600">OH</text>

          {/* 25-OH (on side chain) */}
          <circle cx="200" cy="110" r="8" fill="#EF4444" opacity="0.15" />
          <circle cx="200" cy="110" r="4" fill="#EF4444" />
          <text x="207" y="108" fontSize="10" fill="#DC2626" fontWeight="600">OH</text>
        </motion.g>

        {/* Carbon nodes */}
        {[
          [60, 120], [75, 100], [95, 100], [110, 115], [100, 135], [80, 135],
          [130, 108], [140, 120], [130, 135],
          [155, 110], [170, 115], [185, 105], [200, 110],
          [65, 82], [45, 130], [35, 115], [45, 100],
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="2.5"
            fill="#92400E"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + i * 0.08 }}
          />
        ))}
      </motion.g>

      {/* Labels */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <text x="70" y="170" fontSize="14" fontWeight="700" fill="#92400E" fontFamily="Inter">
          Cholecalciferol
        </text>
        <text x="85" y="183" fontSize="12" fill="#B45309" fontFamily="Inter">
          Vitamin D₃
        </text>
        <text x="35" y="40" fontSize="11" fill="#7C3AED" fontFamily="Inter" opacity="0.7">
          UVB (290-315 nm)
        </text>
        {/* Arrow from UV label */}
        <motion.line
          x1="60" y1="43" x2="60" y2="70"
          stroke="#A78BFA"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        />
      </motion.g>
    </svg>
  );
};

const Hero = () => {
  return (
    <section id="overview" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/40 z-0" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-100/30 to-transparent z-0" />

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center py-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
              <ShieldCheck size={14} /> Critical Review
            </span>
            <span className="text-slate-400 text-xs">February 2026</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-[1.1] mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
            Vitamin D &<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              Infection Susceptibility
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
            A mechanistic deep-dive into the "Sunshine Vitamin" as immunomodulator.
            From photolysis in the skin to cathelicidin in the macrophage — does correcting
            deficiency truly reduce infection risk? We trace every step of the biology and
            weigh the clinical evidence.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600">
                <FlaskConical size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">8 Mechanisms</p>
                <p className="font-semibold text-slate-800 text-sm">Illustrated</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                <BookOpen size={22} />
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Evidence-Based</p>
                <p className="font-semibold text-slate-800 text-sm">Meta-Analyses</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <VitaminD3Molecule />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
