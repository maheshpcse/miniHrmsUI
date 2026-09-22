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
  title: 'Exit & handover',
  description:
    'A considered transition, with accountable clearance and a clear last working day.',
  icon: 'logout',
  tabs: [
    {
      key: 'exit',
      title: 'Resignation & exit cases',
      endpoint: 'exit',
      columns: [
        'employee_id',
        'resignation_date',
        'requested_lwd',
        'approved_lwd',
        'status',
      ],
      fields: [
        f('requested_lwd', 'Requested Last Working Day', 'date'),
        reason,
      ],
      action: 'exit',
    },
  ],
};
