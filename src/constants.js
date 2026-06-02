export const STAGES = ['New', 'Contacted', 'Qualified', 'Proposal', 'Closed Won', 'Closed Lost']

export const STAGE_META = {
  'New':         { dot: 'bg-blue-500',   badge: 'bg-blue-500/10 text-blue-400',    color: '#3B82F6' },
  'Contacted':   { dot: 'bg-violet-500', badge: 'bg-violet-500/10 text-violet-400', color: '#8B5CF6' },
  'Qualified':   { dot: 'bg-yellow-400', badge: 'bg-yellow-400/10 text-yellow-400', color: '#F5C842' },
  'Proposal':    { dot: 'bg-orange-500', badge: 'bg-orange-500/10 text-orange-400', color: '#F97316' },
  'Closed Won':  { dot: 'bg-green-500',  badge: 'bg-green-500/10 text-green-400',  color: '#22C55E' },
  'Closed Lost': { dot: 'bg-red-500',    badge: 'bg-red-500/10 text-red-400',      color: '#EF4444' },
}

export const STORAGE_KEY = 'vantacrew_leads_v1'

export const SEED_DATA = [
  { id: 'seed1', name: 'Sophie Martin',  company: 'Atelier Nord',  email: 'sophie@ateliernord.fr', stage: 'Qualified',   value: 12000, notes: 'Interested in full automation stack', date: '2026-05-10' },
  { id: 'seed2', name: 'Luca Ferreira',  company: 'Bloom Studios', email: 'luca@bloom.io',         stage: 'Proposal',    value: 8500,  notes: 'Sent deck on Monday',               date: '2026-05-14' },
  { id: 'seed3', name: 'Ana García',     company: 'Velo Agency',   email: 'ana@velo.es',           stage: 'New',         value: 0,     notes: '',                                  date: '2026-05-20' },
  { id: 'seed4', name: 'Kenji Watanabe', company: 'Sync Labs',     email: 'k@synclabs.jp',         stage: 'Contacted',   value: 4200,  notes: 'Follow up next week',               date: '2026-05-22' },
  { id: 'seed5', name: 'Mia Okonkwo',   company: 'Crest Digital', email: 'mia@crest.ng',          stage: 'Closed Won',  value: 22000, notes: 'Contract signed',                   date: '2026-05-02' },
]
