import { motion } from 'framer-motion';

const Mechanism = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mechanism of Action</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Vitamin D is not just a nutrient; it's a pro-hormone. Its active form, Calcitriol, 
            acts as a key that unlocks immune defense genes.
          </p>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 shadow-inner border border-slate-200 overflow-hidden relative">
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1: Source */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-2xl">☀️</div>
              <h3 className="font-bold text-slate-800 mb-2">1. Synthesis & Intake</h3>
              <p className="text-sm text-slate-500">
                UVB rays hit the skin (synthesizing D3) or intake via diet/supplements.
              </p>
            </div>

            {/* Step 2: Activation */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center relative">
               <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"
                animate={{ y: [0, 50, 0] }} // abstract flow
                transition={{ duration: 2, repeat: Infinity }}
               />
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-2xl">⚙️</div>
              <h3 className="font-bold text-slate-800 mb-2">2. Activation</h3>
              <p className="text-sm text-slate-500">
                Hydroxylation in Liver (25-OHD) &rarr; Kidney (1,25-OHD). <br/>
                <span className="font-semibold text-blue-600">Crucially:</span> Immune cells can also activate D3 locally!
              </p>
            </div>

            {/* Step 3: Action */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-2xl">🛡️</div>
              <h3 className="font-bold text-slate-800 mb-2">3. Immune Defense</h3>
              <p className="text-sm text-slate-500">
                Binds to VDR receptor. Triggers production of <span className="font-semibold">Cathelicidin & Defensins</span> (natural antibiotics).
                Suppresses Cytokine Storm.
              </p>
            </div>
          </div>

          {/* Connecting Lines (Desktop) */}
          <svg className="absolute top-1/2 left-0 w-full h-20 -translate-y-1/2 hidden md:block z-0 pointer-events-none">
             <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#E2E8F0" strokeWidth="4" strokeDasharray="10 10" />
             <motion.circle 
               r="6" 
               fill="#3B82F6"
               animate={{ cx: ["16%", "50%", "84%"], cy: "50%" }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             />
          </svg>
        </div>
        
        <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-bold text-blue-900 mb-2">Innate Immunity (First Line)</h4>
                <ul className="list-disc list-inside text-blue-800 text-sm space-y-1">
                    <li>Induces antimicrobial peptides (Cathelicidin).</li>
                    <li>Enhances barrier function of epithelial cells.</li>
                    <li>Promotes chemotaxis (movement) of immune cells.</li>
                </ul>
            </div>
             <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-900 mb-2">Adaptive Immunity (Specialized)</h4>
                <ul className="list-disc list-inside text-amber-800 text-sm space-y-1">
                    <li>Reduces "Cytokine Storm" (anti-inflammatory).</li>
                    <li>Promotes Tregs (Regulatory T Cells).</li>
                    <li>Shifts balance from Th1 (inflammatory) to Th2.</li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Mechanism;
