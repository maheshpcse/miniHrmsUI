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
  title: 'Leave & time away',
  description:
    'Plan time away with clear balances, approvals and an auditable leave ledger.',
  icon: 'calendar',
  tabs: [
    {
      key: 'requests',
      title: 'Leave requests',
      endpoint: 'leave',
      columns: [
        'employee_id',
        'leave_type_id',
        'start_date',
        'end_date',
        'requested_units',
        'status',
      ],
      fields: [
        f('leave_type_id', 'Leave Type', 'select', 'leaveTypes'),
        f('start_date', 'Start Date', 'date'),
        f('end_date', 'End Date', 'date'),
        reason,
      ],
      action: 'cancel',
    },
    {
      key: 'balances',
      title: 'Balances',
      endpoint: 'leave/balances',
      columns: ['employee_id', 'name', 'leave_year', 'available', 'reserved'],
      fields: [
        employee,
        f('leave_type_id', 'Leave Type', 'select', 'leaveTypes'),
        f('leave_year', 'Leave Year', 'number'),
        f('quantity', 'Adjustment Days', 'number'),
        f('reference', 'Adjustment Reason', 'textarea'),
      ],
      create: 'leave/adjustments',
    },
    {
      key: 'holidays',
      title: 'Holiday calendar',
      endpoint: 'holidays',
      columns: ['name', 'holiday_date'],
      fields: [f('name', 'Holiday Name'), f('holiday_date', 'Date', 'date')],
      create: 'manage',
    },
    {
      key: 'types',
      title: 'Leave types',
      endpoint: 'leave/types',
      columns: ['name', 'paid', 'allow_negative'],
      manage: true,
      fields: [
        f('name', 'Leave Name'),
        f('paid', 'Paid Leave', 'checkbox'),
        f('allow_negative', 'Allow Negative Balance', 'checkbox'),
      ],
    },
  ],
};
