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
  title: 'Approvals',
  description:
    'Review assigned requests with the context and accountability they deserve.',
  icon: 'request',
  tabs: [
    {
      key: 'approvals',
      title: 'Pending review',
      endpoint: 'approvals',
      columns: ['employee_id', 'module', 'status', 'created_at'],
      action: 'review',
    },
  ],
};
