import { useState, useRef, useEffect } from 'react';
import { REFERENCES } from '../data/references';
import type { RefId } from '../data/references';

interface CitationBadgeProps {
  refId: RefId;
  claim?: string; // optional short label for the specific claim supported
}

const tagColors = {
  positive: 'bg-green-100 text-green-800 border-green-200',
  negative: 'bg-red-100 text-red-800 border-red-200',
  mixed: 'bg-amber-100 text-amber-800 border-amber-200',
  mechanistic: 'bg-violet-100 text-violet-800 border-violet-200',
};

const tagLabels = {
  positive: 'Positive',
  negative: 'Null Result',
  mixed: 'Mixed',
  mechanistic: 'Mechanistic',
};

export default function CitationBadge({ refId, claim }: CitationBadgeProps) {
  const [open, setOpen] = useState(false);
  const [above, setAbove] = useState(false);
  const ref = REFERENCES.find(r => r.id === refId);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !badgeRef.current) return;
    const rect = badgeRef.current.getBoundingClientRect();
    // If badge is in the bottom half of viewport, show tooltip above
    setAbove(rect.top > window.innerHeight / 2);
  }, [open]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        badgeRef.current && !badgeRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!ref) return null;

  return (
    <span className="relative inline-block" ref={badgeRef}>
      <button
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors cursor-pointer align-super ml-0.5 leading-none"
        onClick={() => setOpen(v => !v)}
        aria-label={`Show reference ${ref.number}`}
      >
        {ref.number}
      </button>

      {open && (
        <div
          ref={tooltipRef}
          className={`absolute z-50 left-1/2 -translate-x-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 text-left overflow-hidden
            ${above ? 'bottom-full mb-2' : 'top-full mt-2'}`}
          style={{ minWidth: '18rem', maxWidth: '22rem' }}
        >
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-100 px-4 py-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tagColors[ref.tag]}`}>
                    {tagLabels[ref.tag]}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{ref.studyType}</span>
                </div>
                <p className="text-xs font-bold text-slate-800 leading-tight line-clamp-2">{ref.title}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-slate-600 flex-shrink-0 mt-0.5 text-sm leading-none"
                aria-label="Close"
              >✕</button>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              <span className="font-semibold text-slate-700">{ref.authors}</span> · <em>{ref.citation}</em>
            </p>
          </div>

          {/* Claim highlight */}
          {claim && (
            <div className="px-4 py-2 bg-blue-50 border-b border-blue-100">
              <p className="text-[11px] text-blue-800 font-medium">
                <span className="font-bold text-blue-900">Supporting this claim: </span>{claim}
              </p>
            </div>
          )}

          {/* Body */}
          <div className="px-4 py-3">
            <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">{ref.summary}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Key Findings</p>
            <ul className="space-y-1">
              {ref.keyFindings.map((f, i) => (
                <li key={i} className="flex gap-1.5 text-[11px] text-slate-700 leading-snug">
                  <span className="text-blue-400 flex-shrink-0 mt-px">·</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          {ref.doi && (
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50">
              <a
                href={ref.doi}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-blue-500 hover:text-blue-700 font-mono hover:underline"
              >
                {ref.doi.replace('https://doi.org/', 'doi:')}
              </a>
            </div>
          )}
        </div>
      )}
    </span>
  );
}
