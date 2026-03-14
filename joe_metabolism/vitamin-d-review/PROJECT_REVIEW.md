# Vitamin D & Infection Susceptibility — Project Review

**Reviewed:** February 2026
**Project type:** Interactive single-page React web application
**Stack:** React 19, TypeScript, Vite 7, Tailwind CSS 4, Framer Motion, Recharts, Lucide icons

---

## What This Is

This is a polished, animated literature review built as a scrollable web page. It walks the reader through the biology of how vitamin D modulates the immune system and then weighs the clinical trial evidence for whether supplementation actually reduces infection risk. It's personalized for you (Joe) — the footer includes a "Summary for Joe" section with four actionable takeaways.

## Content Sections (9 total)

The app is organized as a long-scroll narrative with a sticky navigation bar at the top. Each section is a separate React component with its own custom SVG diagram and animations:

1. **Hero / Overview** — Title screen with an animated SVG of the cholecalciferol (vitamin D₃) molecular structure, UV photon particles, and a tagline framing the review as a "mechanistic deep-dive."

2. **Skin Synthesis** — Animated cross-section of the epidermis showing UVB photons hitting 7-dehydrocholesterol in keratinocytes to produce previtamin D₃. Custom SVG with skin layers, cell bodies, and nuclei.

3. **Activation Pathway** — Two-step hydroxylation cascade diagram: D₃ → 25(OH)D in the liver (via CYP2R1) → 1,25(OH)₂D in the kidney (via CYP27B1). Shows the liver and kidney as organ illustrations with animated molecule flow.

4. **VDR Signaling** — Nuclear receptor signaling diagram showing calcitriol crossing the cell membrane, binding VDR, heterodimerizing with RXR, and binding vitamin D response elements (VDREs) on DNA to drive gene transcription. Animated phospholipid bilayer and nuclear envelope.

5. **Antimicrobial Peptides (Innate Defense)** — Covers how VDR activation upregulates cathelicidin (LL-37) and β-defensin 2, the antimicrobial peptides that are the effector arm of vitamin D's innate immune function.

6. **Macrophage Autocrine Loop** — Detailed SVG of a macrophage cell showing the TLR-triggered autocrine loop: pathogen detection → CYP27B1 upregulation → local calcitriol production → cathelicidin release. This is the key mechanism explaining why deficient individuals have impaired innate immunity.

7. **T-Cell Modulation** — Interactive diagram with a toggle showing how vitamin D shifts the Th1/Th17 vs. Treg balance. When sufficient, it promotes regulatory T cells and dampens inflammatory Th17 responses. When deficient, the balance tips toward inflammation.

8. **Epithelial Barrier Integrity** — Interactive diagram (also with a toggle) showing how vitamin D upregulates tight junction proteins (claudins, occludin) in epithelial cells. Fortified vs. compromised barrier states are visualized with mucus layer and goblet cells.

9. **Clinical Evidence** — Two Recharts visualizations: (a) a horizontal bar chart showing risk reduction by baseline vitamin D status (70% for severely deficient, 2% for already sufficient), and (b) a line chart comparing daily vs. weekly vs. bolus dosing strategies. Below these: four summary cards (respiratory infections, healthy populations, COVID-19, autoimmune disease) and a timeline of 7 key studies from 2007–2022 (Laaksi, Bergman, Martineau, VITAL, Jolliffe, CORONAVIT, VITAL Autoimmune). Ends with a "Critical Takeaway" banner.

10. **Footer** — "Summary for Joe" with four numbered recommendations (get tested, daily dosing not bolus, set realistic expectations, consider autoimmune benefits). Plus 8 key references with DOI links to BMJ, Lancet, Science, and NEJM papers.

## Technical Quality

- **Clean architecture:** Each section is its own component file. No shared state needed between sections — each stands alone.
- **Custom SVG illustrations:** Every biological diagram is hand-coded SVG with Framer Motion animations. These aren't stock images — they're detailed, labeled biological diagrams (cell membranes, nuclear envelopes, molecular structures, organ cross-sections).
- **Responsive:** Tailwind grid layouts with mobile breakpoints. The navigation has a mobile hamburger menu.
- **Smooth UX:** Scroll-spy navigation highlights the current section. Smooth scroll anchoring between sections.
- **Interactive elements:** The T-Cell and Epithelial Barrier sections have toggles to switch between "sufficient" and "deficient" states, changing the diagram in real time.
- **Data visualization:** Recharts bar and line charts in the Evidence section with tooltips.
- **Typography:** Inter for body text, Playfair Display for headings. Custom color palette (vitamin D gold, medical blue, pathogen red, etc.).

## Pre-built Output

A production build already exists in `dist/` — the app has been compiled and is ready to serve as static files.

## Key Takeaways from the Content

The review concludes that correcting vitamin D deficiency is high-yield for infection prevention (40–70% reduction in respiratory infections for the severely deficient), but supplementing people who already have sufficient levels produces near-zero benefit. Daily or weekly dosing works; large monthly bolus doses do not. The strongest result in the literature is a 22% reduction in autoimmune disease over 5 years from the VITAL trial.
