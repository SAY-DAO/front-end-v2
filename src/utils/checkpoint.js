export const CheckPointType = {
  FEATURE: 'feature',
  BUG_FIX: 'bug-fix',
  HOTFIX: 'hotfix',
  DEPLOY: 'deploy',
  ROLLBACK: 'rollback',
  DB_MIGRATION: 'db-migration',
  CODE_REVIEW: 'code-review',
  PERFORMANCE: 'performance',

  ROADMAP: 'roadmap',
  USER_RESEARCH: 'research',
  TESTING: 'testing',

  DESIGN: 'design',
  CONTENT: 'content',
  MARKETING_CAMPAIGN: 'campaign',
  GROWTH_EXPERIMENT: 'experiment',

  CUSTOMER_SUPPORT: 'support',
  ONBOARDING: 'onboarding',
  PARTNERSHIPS: 'partners',

  INCIDENT_RESPONSE: 'incident',
  MONITORING: 'monitor',
  BACKUP: 'backup',
  SECURITY: 'security',
  CONFIG_CHANGE: 'config',
  AUTOMATION: 'automation',

  LEGAL: 'legal',
  FINANCE: 'finance',
  HR: 'hr',
  MEETING: 'meeting',
  TRAINING: 'training',

  CHILD_JOINED: 'registered',
  CHILD_LEFT: 'left',
  NGO_JOINED: 'joined',
  MONTHLY_REPORT: 'report',
};

export const CheckPointTypeLabel = {
  [CheckPointType.FEATURE]: 'Feature',
  [CheckPointType.BUG_FIX]: 'Bug',
  [CheckPointType.HOTFIX]: 'Hotfix',
  [CheckPointType.DEPLOY]: 'Deploy',
  [CheckPointType.ROLLBACK]: 'Rollback',
  [CheckPointType.DB_MIGRATION]: 'Migration',
  [CheckPointType.CODE_REVIEW]: 'Review',
  [CheckPointType.PERFORMANCE]: 'Perf',

  [CheckPointType.ROADMAP]: 'Roadmap',
  [CheckPointType.USER_RESEARCH]: 'Research',
  [CheckPointType.TESTING]: 'Testing',

  [CheckPointType.DESIGN]: 'Design',
  [CheckPointType.CONTENT]: 'Content',
  [CheckPointType.MARKETING_CAMPAIGN]: 'Campaign',
  [CheckPointType.GROWTH_EXPERIMENT]: 'Experiment',

  [CheckPointType.CUSTOMER_SUPPORT]: 'Support',
  [CheckPointType.ONBOARDING]: 'Onboarding',
  [CheckPointType.PARTNERSHIPS]: 'Partners',

  [CheckPointType.INCIDENT_RESPONSE]: 'Incident',
  [CheckPointType.MONITORING]: 'Monitor',
  [CheckPointType.BACKUP]: 'Backup',
  [CheckPointType.SECURITY]: 'Security',
  [CheckPointType.CONFIG_CHANGE]: 'Config',
  [CheckPointType.AUTOMATION]: 'Automation',

  [CheckPointType.LEGAL]: 'Legal',
  [CheckPointType.FINANCE]: 'Finance',
  [CheckPointType.HR]: 'HR',
  [CheckPointType.MEETING]: 'Meeting',
  [CheckPointType.TRAINING]: 'Training',

  [CheckPointType.CHILD_JOINED]: 'Joined',
  [CheckPointType.CHILD_LEFT]: 'Left',
  [CheckPointType.NGO_JOINED]: 'Joined (NGO)',
  [CheckPointType.MONTHLY_REPORT]: 'Report',
};
