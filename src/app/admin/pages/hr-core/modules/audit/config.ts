import {
  CoreModule,
  f,
  select,
  employee,
  reason,
  title,
  date,
} from '../../core-models';
export const config: CoreModule = {
  title: 'HR audit',
  description:
    'Trace changes without exposing personnel details in notification messages.',
  icon: 'shield',
  tabs: [
    {
      key: 'audit',
      title: 'Audit history',
      endpoint: 'audit',
      columns: ['actor_id', 'module', 'action', 'entity_id', 'created_at'],
      manage: true,
    },
  ],
};
