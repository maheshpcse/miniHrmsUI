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
  title: 'Salary & payslips',
  description:
    'Finalized payroll, published payslips and answers about your pay.',
  icon: 'shield',
  tabs: [
    {
      key: 'payslips',
      title: 'Payslips',
      endpoint: 'salary',
      columns: [
        'employee_id',
        'period',
        'currency',
        'gross',
        'deductions',
        'tax',
        'net',
        'published_at',
      ],
      action: 'salary',
    },
    {
      key: 'queries',
      title: 'Payroll queries',
      endpoint: 'salary-queries',
      columns: [
        'employee_id',
        'result_id',
        'subject',
        'description',
        'status',
        'reply',
      ],
      fields: [
        f('result_id', 'Published Payslip', 'select', 'payslips'),
        f('subject', 'Subject'),
        f('description', 'Question', 'textarea'),
      ],
      action: 'query',
    },
  ],
};
