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
  title: 'Time & attendance',
  description:
    'Record your workday. Keep original punches and reviewed corrections separate.',
  icon: 'clock',
  tabs: [
    {
      key: 'daily',
      title: 'Daily attendance',
      endpoint: 'attendance',
      columns: [
        'employee_id',
        'attendance_date',
        'worked_minutes',
        'break_minutes',
        'status',
      ],
    },
    {
      key: 'regularizations',
      title: 'Regularization',
      endpoint: 'regularizations',
      columns: [
        'employee_id',
        'attendance_date',
        'minutes',
        'reason',
        'status',
      ],
      fields: [date, f('minutes', 'Correct Worked Minutes', 'number'), reason],
    },
    {
      key: 'overtime',
      title: 'Overtime',
      endpoint: 'overtime',
      columns: [
        'employee_id',
        'attendance_date',
        'minutes',
        'reason',
        'status',
      ],
      fields: [date, f('minutes', 'Overtime Minutes', 'number'), reason],
    },
    {
      key: 'inputs',
      title: 'Locked payroll inputs',
      endpoint: 'payroll-inputs',
      columns: [
        'employee_id',
        'period',
        'worked_minutes',
        'overtime_minutes',
        'paid_leave_days',
        'unpaid_leave_days',
      ],
      manage: true,
      fields: [f('period', 'Completed Month', 'month')],
      create: 'payroll-inputs/lock',
    },
  ],
};
