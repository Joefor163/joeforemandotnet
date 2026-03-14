import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { REFERENCES } from '../data/references';
import type { Reference } from '../data/references';
import { ChevronDown, ExternalLink, FlaskConical, BookOpen } from 'lucide-react';

const tagColors = {
  positive: 'bg-green-100 text-green-700 border-green-200',
  negative: 'bg-red-100 text-red-700 border-red-200',
  mixed: 'bg-amber-100 text-amber-700 border-amber-200',
  mechanistic: 'bg-violet-100 text-violet-700 border-violet-200',
};

const tagLabels = {
  positive: '✓ Positive',
  negative: '✗ Null Result',
  mixed: '~ Mixed',
  mechanistic: '⚗ Mechanistic',
};

function ReferenceCard({ ref, index }: { ref: Reference; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Header row */}
      <button
        className="w-full text-left px-6 py-5 flex gap-4 items-start hover:bg-slate-50 transition-colors"
        onClick={() => setExpanded(v => !v)}
      >
        {/* Number badge */}
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center mt-0.5">
          {ref.number}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-1.5 items-center">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagColors[ref.tag]}`}>
              {tagLabels[ref.tag]}
            </span>
            <span className="text-xs text-slate-400">{ref.year} · {ref.studyType}</span>
          </div>
          <p className="font-semibold text-slate-800 text-sm leading-snug mb-1">{ref.title}</p>
          <p className="text-xs text-slate-500">
            <span className="font-medium text-slate-600">{ref.authors}</span>
            {' · '}
            <em>{ref.citation}</em>
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`flex-shrink-0 text-slate-400 mt-1 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expandable body */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 border-t border-slate-100">
              {/* Summary */}
              <div className="flex gap-3 mt-4 mb-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BookOpen size={14} className="text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Overview</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{ref.summary}</p>
                </div>
              </div>

              {/* Key findings */}
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
                    <FlaskConical size={14} className="text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Key Findings</p>
                  <ul className="space-y-1.5">
                    {ref.keyFindings.map((finding, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-700 leading-snug">
                        <span className="text-blue-400 flex-shrink-0 font-bold mt-px">›</span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* DOI link */}
              {ref.doi && (
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <ExternalLink size={12} className="text-slate-400" />
                  <a
                    href={ref.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-700 font-mono hover:underline"
                  >
                    {ref.doi.replace('https://doi.org/', 'doi:')}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ReferencesSection() {
  return (
    <section id="references" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-slate-500 text-sm font-semibold tracking-widest uppercase mb-3 block">Primary Literature</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Key References
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Every claim in this review is grounded in peer-reviewed literature. Click any reference to read a detailed
            summary of its design, findings, and limitations.
          </p>
          <p className="text-slate-400 text-sm mt-3">
            Numbered badges <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200 mx-1">1</span> throughout the page open the supporting evidence for each specific claim.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {REFERENCES.map((ref, i) => (
            <ReferenceCard key={ref.id} ref={ref} index={i} />
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="max-w-3xl mx-auto mt-10 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Result Classification</p>
          <div className="flex flex-wrap gap-3">
            {(Object.keys(tagColors) as Array<keyof typeof tagColors>).map(tag => (
              <span key={tag} className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[tag]}`}>
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
