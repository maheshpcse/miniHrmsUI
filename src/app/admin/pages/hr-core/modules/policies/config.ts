import { CoreModule, f, select } from '../../core-models';
export const config: CoreModule = {
  title: 'HR policies',
  description:
    'Effective-dated settings. New versions guide future transactions without rewriting history.',
  icon: 'settings',
  tabs: [
    {
      key: 'policies',
      title: 'Policy versions',
      endpoint: 'policies',
      manage: true,
      columns: ['module', 'name', 'effective_from'],
      fields: [
        select('module', 'Policy Module', ['Attendance', 'Leave', 'Exit']),
        f('name', 'Policy Name'),
        f('effective_from', 'Effective From', 'date'),
        f('timezone', 'Timezone'),
        f('full_day_minutes', 'Full Day Minutes', 'number'),
        f('half_day_minutes', 'Half Day Minutes', 'number'),
        select('weekend_policy', 'Weekly Off Days', [
          'Saturday & Sunday',
          'Sunday',
          'No weekly offs',
        ]),
        f('notice_days', 'Notice Days', 'number'),
      ],
    },
  ],
};
