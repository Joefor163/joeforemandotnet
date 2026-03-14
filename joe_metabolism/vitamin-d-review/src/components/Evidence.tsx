import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { CheckCircle2, XCircle, Search, TrendingUp } from 'lucide-react';
import CitationBadge from './CitationBadge';

const baselineData = [
  { name: 'Severe (<10 ng/mL)', reduction: 70 },
  { name: 'Deficient (10-20)', reduction: 25 },
  { name: 'Insufficient (20-30)', reduction: 8 },
  { name: 'Sufficient (>30)', reduction: 2 },
];

const dosingData = [
  { name: 'Bolus\nMonthly', daily: 0, weekly: 0, bolus: 8 },
  { name: 'Weekly\n10,000 IU', daily: 0, weekly: 19, bolus: 0 },
  { name: 'Daily\n800 IU', daily: 15, weekly: 0, bolus: 0 },
  { name: 'Daily\n1,000 IU', daily: 19, weekly: 0, bolus: 0 },
  { name: 'Daily\n2,000 IU', daily: 25, weekly: 0, bolus: 0 },
  { name: 'Daily\n4,000 IU', daily: 30, weekly: 0, bolus: 0 },
];

const timelineStudies = [
  { year: 2007, name: 'Laaksi et al.', result: 'positive', detail: 'Finnish military recruits: 36% fewer respiratory infections with D supplementation' },
  { year: 2012, name: 'Bergman et al. (Meta)', result: 'positive', detail: 'Meta-analysis: OR 0.58 for respiratory infections with Vit D supplementation' },
  { year: 2017, name: 'Martineau et al.', result: 'positive', detail: 'IPD meta-analysis (25 RCTs, n=11,321): 12% overall reduction, 70% in severely deficient' },
  { year: 2019, name: 'VITAL (Manson)', result: 'negative', detail: 'n=25,871 healthy adults: No significant reduction in cancer/CVD. Subgroup immune benefit' },
  { year: 2021, name: 'Jolliffe et al.', result: 'positive', detail: 'Updated meta-analysis: confirmed daily/weekly dosing protective; bolus dosing NOT protective' },
  { year: 2022, name: 'CORONAVIT', result: 'mixed', detail: 'UK trial: offered Vit D to deficient adults. 6% nonsignificant reduction in COVID infection' },
  { year: 2022, name: 'VITAL (Autoimmune)', result: 'positive', detail: '5.3yr follow-up: 22% reduction in autoimmune disease incidence with Vit D' },
];

const Evidence = () => {
  return (
    <section id="evidence" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3 block">Clinical Evidence</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Theory Meets Practice
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            The mechanistic case is compelling. But does supplementation actually reduce infection rates
            in clinical trials? The answer is nuanced: it depends on <em>who</em> is being treated,
            <em>how</em> they're dosed, and <em>what</em> their baseline level is.
            <CitationBadge refId="martineau2017" claim="Effect of vitamin D on respiratory infections depends on baseline status and dosing regimen" />
            <CitationBadge refId="jolliffe2021" claim="Daily/weekly vs bolus dosing produces different outcomes" />
          </p>
        </motion.div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Baseline Status Chart */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-slate-800 mb-2 text-lg">Protection by Baseline Status</h3>
            <p className="text-sm text-slate-500 mb-6">
              Risk reduction is inversely proportional to starting 25(OH)D level. The severely deficient
              benefit enormously; the already-sufficient gain almost nothing.
              <CitationBadge refId="martineau2017" claim="70% risk reduction in severely deficient vs near-zero in sufficient individuals" />
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={baselineData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F1F5F9" />
                  <XAxis type="number" domain={[0, 80]} tick={{ fontSize: 11 }} unit="%" />
                  <YAxis dataKey="name" type="category" width={135} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  />
                  <Bar dataKey="reduction" name="% Risk Reduction" fill="#005EB8" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 mt-3 text-center italic">
              Based on Martineau et al. (2017) individual participant data meta‑analysis trends.
            </p>
          </motion.div>

          {/* Dosing Strategy Chart */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-slate-800 mb-2 text-lg">Dosing Strategy Matters</h3>
            <p className="text-sm text-slate-500 mb-6">
              Daily or weekly dosing is protective. Large infrequent bolus doses are consistently
              <strong> not protective</strong> — likely because they cause spikes followed by rapid
              CYP24A1-mediated degradation.
              <CitationBadge refId="jolliffe2021" claim="Bolus dosing consistently non-protective; daily/weekly dosing is protective across all meta-analyses" />
            </p>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dosingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} />
                  <YAxis domain={[0, 35]} tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px' }} />
                  <Legend />
                  <Line type="monotone" dataKey="daily" name="Daily" stroke="#16A34A" strokeWidth={2.5} dot={{ r: 5, fill: '#16A34A' }} />
                  <Line type="monotone" dataKey="weekly" name="Weekly" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 5, fill: '#3B82F6' }} />
                  <Line type="monotone" dataKey="bolus" name="Bolus" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 5, fill: '#DC2626' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 mt-3 text-center italic">
              Illustrative dose-response trends from Jolliffe et al. (2021) meta‑analysis.
            </p>
          </motion.div>
        </div>

        {/* Key Findings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-green-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-green-100 p-2 w-fit rounded-full text-green-700 mb-3">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Respiratory Infections</h4>
            <p className="text-slate-600 text-xs">
              Daily/weekly dosing reduces acute respiratory infections, especially in the severely deficient
              (OR 0.30 for &lt;25 nmol/L baseline).
              <CitationBadge refId="martineau2017" claim="OR 0.30 for respiratory infections in participants with 25(OH)D <25 nmol/L at baseline" />
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-red-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-red-100 p-2 w-fit rounded-full text-red-700 mb-3">
              <XCircle size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Healthy Populations</h4>
            <p className="text-slate-600 text-xs">
              Large trials on sufficient, healthy adults (VITAL, n=25,871) show no significant infection
              reduction. You can't boost above baseline.
              <CitationBadge refId="manson2019" claim="No significant reduction in primary endpoints in generally sufficient adults (VITAL, n=25,871)" />
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-amber-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-amber-100 p-2 w-fit rounded-full text-amber-700 mb-3">
              <Search size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">COVID-19 Severity</h4>
            <p className="text-slate-600 text-xs">
              Strong observational correlation: low vitamin D → higher ICU rates. Interventional RCTs
              suggestive but not yet definitive for prevention.
              <CitationBadge refId="coronavit2022" claim="CORONAVIT: 6% nonsignificant reduction in COVID-19 infection; reduced severity in those who did contract COVID" />
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-indigo-100 p-2 w-fit rounded-full text-indigo-700 mb-3">
              <TrendingUp size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Autoimmune Disease</h4>
            <p className="text-slate-600 text-xs">
              VITAL's 5.3-year follow-up: 22% reduction in autoimmune disease incidence with vitamin D.
              One of the strongest results in the entire literature.
              <CitationBadge refId="hahn2022" claim="22% reduction in confirmed autoimmune disease over 5.3 years with 2,000 IU/day vitamin D" />
            </p>
          </motion.div>
        </div>

        {/* Study Timeline */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="font-bold text-slate-800 mb-6 text-lg">Key Studies Timeline</h3>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />

            <div className="space-y-6">
              {timelineStudies.map((study, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 ml-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  {/* Dot */}
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 z-10 text-xs font-bold
                    ${study.result === 'positive' ? 'bg-green-100 text-green-700 border-2 border-green-300' :
                      study.result === 'negative' ? 'bg-red-100 text-red-700 border-2 border-red-300' :
                        'bg-amber-100 text-amber-700 border-2 border-amber-300'}`}>
                    {study.year.toString().slice(-2)}
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-800 text-sm">{study.name}</span>
                      <span className="text-xs text-slate-400">{study.year}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${study.result === 'positive' ? 'bg-green-50 text-green-700' :
                          study.result === 'negative' ? 'bg-red-50 text-red-700' :
                            'bg-amber-50 text-amber-700'}`}>
                        {study.result}
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{study.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Critical Takeaway */}
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-800/20 rounded-full -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-2xl font-bold mb-4 relative z-10" style={{ fontFamily: 'var(--font-serif)' }}>Critical Takeaway</h3>
          <p className="text-blue-100 max-w-3xl relative z-10 text-lg leading-relaxed mb-4">
            "Vitamin D is not a magic shield for everyone. It is a critical support system that fails when
            fuel is low. <strong className="text-white">Correcting deficiency is high-yield; boosting sufficiency is low-yield.</strong>"
          </p>
          <p className="text-blue-200 max-w-3xl relative z-10 text-sm">
            The pattern across all meta-analyses is remarkably consistent: daily dosing in deficient
            individuals reduces respiratory infections by 40-70%.
            <CitationBadge refId="martineau2017" claim="40-70% reduction in respiratory infections with daily/weekly dosing in deficient individuals" />
            <CitationBadge refId="jolliffe2021" claim="Consistent finding across updated meta-analyses: daily dosing in deficient patients is protective" />
            {' '}The same intervention in sufficient individuals produces near-zero benefit.
            <CitationBadge refId="manson2019" claim="No significant benefit in primarily sufficient healthy adult population (VITAL)" />
            {' '}The biology (macrophage autocrine loop, tight junction integrity) explains why.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Evidence;
