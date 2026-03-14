export interface Reference {
  id: string;
  number: number;
  authors: string;
  year: number;
  title: string;
  journal: string;
  citation: string;
  doi?: string;
  summary: string;
  keyFindings: string[];
  studyType: string;
  tag: 'positive' | 'negative' | 'mixed' | 'mechanistic';
}

export const REFERENCES: Reference[] = [
  {
    id: 'martineau2017',
    number: 1,
    authors: 'Martineau AR, et al.',
    year: 2017,
    title: 'Vitamin D supplementation to prevent acute respiratory tract infections: systematic review and meta-analysis of individual participant data',
    journal: 'BMJ',
    citation: 'BMJ. 2017;356:i6583',
    doi: 'https://doi.org/10.1136/bmj.i6583',
    studyType: 'IPD Meta-analysis (25 RCTs, n=11,321)',
    tag: 'positive',
    summary: 'The most rigorous analysis of vitamin D and respiratory infections. By pooling individual participant data (IPD) from 25 RCTs, this study could stratify effects by baseline vitamin D status and dosing regimen — revealing dramatic heterogeneity hidden in aggregate analyses.',
    keyFindings: [
      '12% overall reduction in acute respiratory tract infections (OR 0.88)',
      '70% reduction in patients with severe deficiency (<25 nmol/L at baseline)',
      'Daily/weekly dosing was protective; bolus dosing was not',
      'No adverse effects at doses used in included trials',
      'Effect strongest in those NOT already sufficient at baseline',
    ],
  },
  {
    id: 'jolliffe2021',
    number: 2,
    authors: 'Jolliffe DA, et al.',
    year: 2021,
    title: 'Vitamin D supplementation to prevent acute respiratory infections: a systematic review and meta-analysis of aggregate data from RCTs',
    journal: 'Lancet Diabetes Endocrinol',
    citation: 'Lancet Diabetes Endocrinol. 2021;9(5):276-292',
    doi: 'https://doi.org/10.1016/S2213-8587(21)00051-6',
    studyType: 'Aggregate RCT Meta-analysis',
    tag: 'positive',
    summary: 'An updated meta-analysis incorporating newer trials, confirming the dosing-regimen finding as one of the most robust and reproducible results in the entire vitamin D literature. Bolus dosing consistently failed across multiple trials, while daily/weekly dosing consistently showed benefit.',
    keyFindings: [
      'Confirmed daily/weekly dosing is protective against respiratory infections',
      'Bolus (infrequent large-dose) dosing is NOT protective — this is consistent across all analyses',
      'Proposed mechanism: bolus dosing triggers rapid CYP24A1-mediated degradation, preventing stable 25(OH)D elevation',
      'Protective effect strongest in vitamin D deficient populations',
      'Updated analysis incorporated CORONAVIT-era data',
    ],
  },
  {
    id: 'liu2006',
    number: 3,
    authors: 'Liu PT, et al.',
    year: 2006,
    title: 'Toll-like receptor triggering of a vitamin D-mediated human antimicrobial response',
    journal: 'Science',
    citation: 'Science. 2006;311(5768):1770-1773',
    doi: 'https://doi.org/10.1126/science.1123933',
    studyType: 'In vitro mechanistic study',
    tag: 'mechanistic',
    summary: 'The landmark molecular biology paper that explained heliotherapy\'s centuries-old effectiveness against tuberculosis. Published in Science, it demonstrated the macrophage autocrine vitamin D loop — showing that macrophages can locally activate vitamin D and use it to kill intracellular bacteria.',
    keyFindings: [
      'TLR2/1 activation by M. tuberculosis upregulates VDR and CYP27B1 in human macrophages',
      'Macrophages convert circulating 25(OH)D to active calcitriol locally — bypassing the kidney',
      'Local calcitriol induces cathelicidin (CAMP gene), which kills intracellular M. tuberculosis',
      'African-American donor serum (lower 25(OH)D) failed to support cathelicidin-mediated killing',
      'Adding 25(OH)D to deficient serum restored antimicrobial activity — directly linking serum level to innate capacity',
    ],
  },
  {
    id: 'manson2019',
    number: 4,
    authors: 'Manson JE, et al. (VITAL)',
    year: 2019,
    title: 'Vitamin D Supplements and Prevention of Cancer and Cardiovascular Disease',
    journal: 'NEJM',
    citation: 'NEJM. 2019;380(1):33-44',
    doi: 'https://doi.org/10.1056/NEJMoa1809944',
    studyType: 'Large RCT (n=25,871, 5.3 years)',
    tag: 'negative',
    summary: 'The largest vitamin D RCT ever conducted, enrolling 25,871 generally healthy adults 50+ years old. Primary endpoints (cancer, CVD) were negative, but crucial subgroup and extended follow-up analyses produced some of the most important positive findings in the field — particularly for autoimmune disease.',
    keyFindings: [
      'No significant reduction in primary endpoints (cancer incidence or CVD events) in the overall population',
      'Most participants were vitamin D sufficient at baseline — already-sufficient people cannot "boost" immune function further',
      'Important subgroup: cancer mortality reduced 25% in those who had taken supplement for ≥2 years',
      'Sets up the key principle: you cannot replicate deficiency-correction benefits in sufficient individuals',
      'Led to 5-year autoimmune disease follow-up analysis (Hahn 2022)',
    ],
  },
  {
    id: 'hahn2022',
    number: 5,
    authors: 'Hahn J, et al. (VITAL autoimmune)',
    year: 2022,
    title: 'Vitamin D and marine omega 3 fatty acid supplementation and incident autoimmune disease: VITAL randomized controlled trial',
    journal: 'BMJ',
    citation: 'BMJ. 2022;376:e066452',
    doi: 'https://doi.org/10.1136/bmj-2021-066452',
    studyType: 'RCT extended follow-up (n=25,871, 5.3 years)',
    tag: 'positive',
    summary: 'The 5.3-year extended follow-up of the VITAL cohort, now examining autoimmune disease incidence. This produced one of the most compelling positive findings in vitamin D research — a 22% reduction in confirmed autoimmune disease diagnoses, providing strong mechanistic validation of vitamin D\'s Treg-promoting, tolerogenic effects.',
    keyFindings: [
      '22% reduction in confirmed autoimmune disease incidence with 2,000 IU/day vitamin D',
      'Effect size grew with duration of follow-up, suggesting a preventive (not just symptomatic) mechanism',
      'Included rheumatoid arthritis, psoriasis, polymyalgia rheumatica, and autoimmune thyroid disease',
      'Mechanistically consistent with vitamin D promoting Tregs and tolerogenic dendritic cells',
      'One of the strongest and most clinically significant positive findings in the entire vitamin D RCT literature',
    ],
  },
  {
    id: 'aranow2011',
    number: 6,
    authors: 'Aranow C.',
    year: 2011,
    title: 'Vitamin D and the immune system',
    journal: 'J Investig Med',
    citation: 'J Investig Med. 2011;59(6):881-886',
    doi: 'https://doi.org/10.2310/JIM.0b013e31821b8755',
    studyType: 'Review article',
    tag: 'mechanistic',
    summary: 'A comprehensive mechanistic review establishing the immunological framework for vitamin D\'s role. Covers VDR expression across immune cell types, the genome-wide scope of VDRE binding sites, and the pleiotropic effects of vitamin D on both innate and adaptive immunity.',
    keyFindings: [
      'VDR is expressed in virtually all immune cells: monocytes, macrophages, dendritic cells, T and B lymphocytes',
      '2,776 VDR binding sites (VDREs) identified genome-wide, influencing ~229 genes',
      'Vitamin D promotes tolerogenic dendritic cells, shifting T-cell differentiation toward Treg and away from Th1/Th17',
      'Innate immunity: induces cathelicidin, β-defensins, enhances phagocytosis and autophagy',
      'Adaptive immunity: suppresses IFN-γ (Th1) and IL-17 (Th17), promotes IL-10 (anti-inflammatory)',
    ],
  },
  {
    id: 'adams2008',
    number: 7,
    authors: 'Adams JS, Hewison M.',
    year: 2008,
    title: 'Unexpected actions of vitamin D: new perspectives on the regulation of innate and adaptive immunity',
    journal: 'Nat Clin Pract Endocrinol Metab',
    citation: 'Nat Clin Pract Endocrinol Metab. 2008;4(2):80-90',
    studyType: 'Review article',
    tag: 'mechanistic',
    summary: 'A pivotal review that consolidated the paradigm shift in vitamin D biology — from a calcium-regulating hormone to a pleiotropic immunomodulator. Emphasizes the "extrarenal" activation of vitamin D by immune cells, the tight junction regulation, and the clinical implications of linking serum 25(OH)D levels to immune competence.',
    keyFindings: [
      'Established that immune cells express CYP27B1, enabling local vitamin D activation independent of renal regulation',
      'First comprehensive synthesis of VDR signaling in both innate and adaptive immune arms',
      'Vitamin D upregulates tight junction proteins (occludin, claudin) in epithelial barriers',
      'Explains the seasonal/latitude pattern of respiratory infections through the "vitamin D winter" hypothesis',
      'Identifies the VDR-VDRE transcriptional axis as the core molecular mechanism linking sunshine to infection resistance',
    ],
  },
  {
    id: 'coronavit2022',
    number: 8,
    authors: 'Jolliffe DA, et al. (CORONAVIT)',
    year: 2022,
    title: 'Effect of a test-and-treat approach to vitamin D supplementation on risk of all cause acute respiratory tract infection and COVID-19',
    journal: 'BMJ',
    citation: 'BMJ. 2022;378:e071230',
    studyType: 'RCT (COVID-19 era, UK)',
    tag: 'mixed',
    summary: 'A pragmatic UK trial during the COVID-19 pandemic, offering vitamin D supplementation to deficient adults using a "test-and-treat" approach. Results were mixed — a 6% nonsignificant reduction in infection — but the trial design was pragmatic rather than placebo-controlled and suffered from high crossover, making interpretation challenging.',
    keyFindings: [
      '6% nonsignificant reduction in acute respiratory tract infections including COVID-19',
      'Pragmatic design (test-and-treat, no placebo control) limits causal inference',
      'High crossover: many control participants self-supplemented with vitamin D',
      'Significant reduction in COVID-19 severity among those who did test positive',
      'Reinforces that deficiency correction (not supplementation in sufficient individuals) is the key target',
    ],
  },
];

export type RefId = typeof REFERENCES[number]['id'];
