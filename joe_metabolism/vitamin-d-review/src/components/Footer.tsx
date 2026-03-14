import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
              Summary for Joe
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">①</span>
                <span><strong className="text-slate-200">Get tested.</strong> Know your 25(OH)D level. Below 20 ng/mL means your macrophage autocrine loop is substrate-limited — cathelicidin production is impaired.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">②</span>
                <span><strong className="text-slate-200">Daily dosing, not bolus.</strong> 1,000–4,000 IU/day maintains stable levels. Monthly mega-doses are wasteful — CYP24A1 degrades the spike.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">③</span>
                <span><strong className="text-slate-200">Set realistic expectations.</strong> If deficient, supplementation substantially reduces infection risk (40-70%). If already sufficient, don't expect miracles — the system is already fueled.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-400 flex-shrink-0">④</span>
                <span><strong className="text-slate-200">Beyond infections.</strong> The VITAL trial showed a 22% reduction in autoimmune disease over 5 years. Treg promotion and barrier integrity matter beyond respiratory infections.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-5" style={{ fontFamily: 'var(--font-serif)' }}>
              Key References
            </h3>
            <ol className="space-y-3 text-xs font-mono list-decimal list-inside">
              <li className="leading-relaxed">
                Martineau AR, et al. Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis of individual participant data. <em className="text-slate-300">BMJ</em>. 2017;356:i6583. <a href="https://doi.org/10.1136/bmj.i6583" className="text-blue-400 hover:text-blue-300">doi:10.1136/bmj.i6583</a>
              </li>
              <li className="leading-relaxed">
                Jolliffe DA, et al. Vitamin D supplementation to prevent acute respiratory infections: a systematic review and meta-analysis of aggregate data from RCTs. <em className="text-slate-300">Lancet Diabetes Endocrinol</em>. 2021;9(5):276-292. <a href="https://doi.org/10.1016/S2213-8587(21)00051-6" className="text-blue-400 hover:text-blue-300">doi:10.1016/S2213-8587(21)00051-6</a>
              </li>
              <li className="leading-relaxed">
                Liu PT, et al. Toll-like receptor triggering of a vitamin D-mediated human antimicrobial response. <em className="text-slate-300">Science</em>. 2006;311(5768):1770-1773. <a href="https://doi.org/10.1126/science.1123933" className="text-blue-400 hover:text-blue-300">doi:10.1126/science.1123933</a>
              </li>
              <li className="leading-relaxed">
                Manson JE, et al. (VITAL Research Group). Vitamin D Supplements and Prevention of Cancer and Cardiovascular Disease. <em className="text-slate-300">NEJM</em>. 2019;380(1):33-44. <a href="https://doi.org/10.1056/NEJMoa1809944" className="text-blue-400 hover:text-blue-300">doi:10.1056/NEJMoa1809944</a>
              </li>
              <li className="leading-relaxed">
                Hahn J, et al. Vitamin D and marine omega 3 fatty acid supplementation and incident autoimmune disease: VITAL randomized controlled trial. <em className="text-slate-300">BMJ</em>. 2022;376:e066452. <a href="https://doi.org/10.1136/bmj-2021-066452" className="text-blue-400 hover:text-blue-300">doi:10.1136/bmj-2021-066452</a>
              </li>
              <li className="leading-relaxed">
                Aranow C. Vitamin D and the immune system. <em className="text-slate-300">J Investig Med</em>. 2011;59(6):881-886. <a href="https://doi.org/10.2310/JIM.0b013e31821b8755" className="text-blue-400 hover:text-blue-300">doi:10.2310/JIM.0b013e31821b8755</a>
              </li>
              <li className="leading-relaxed">
                Adams JS, Hewison M. Unexpected actions of vitamin D: new perspectives on the regulation of innate and adaptive immunity. <em className="text-slate-300">Nat Clin Pract Endocrinol Metab</em>. 2008;4(2):80-90.
              </li>
              <li className="leading-relaxed">
                Jolliffe DA, et al. (CORONAVIT). Effect of a test-and-treat approach to vitamin D supplementation on risk of all cause acute respiratory tract infection and COVID-19. <em className="text-slate-300">BMJ</em>. 2022;378:e071230.
              </li>
            </ol>
          </motion.div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              This is a narrative literature review for educational purposes. Not medical advice. Consult a healthcare provider for personal guidance.
            </p>
            <p className="text-xs text-slate-500">
              Prepared for Joe • February 2026 • Evidence-Based Review
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
