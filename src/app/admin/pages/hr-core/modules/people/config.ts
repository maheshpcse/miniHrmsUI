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
  title: 'People operations',
  description:
    'Employment history, onboarding and the details that support your people.',
  icon: 'people',
  tabs: [
    {
      key: 'assignments',
      title: 'Employment & reporting',
      endpoint: 'assignments',
      columns: [
        'employee_id',
        'department',
        'designation',
        'manager_id',
        'effective_from',
      ],
      manage: true,
      fields: [
        employee,
        {
          ...f('manager_id', 'Reporting Manager', 'select', 'people'),
          required: false,
        },
        f('department', 'Department'),
        f('designation', 'Designation'),
        f('location', 'Location'),
        select('employment_type', 'Employment Type', [
          'Permanent',
          'Contract',
          'Intern',
        ]),
        f('effective_from', 'Effective From', 'date'),
      ],
    },
    {
      key: 'onboarding',
      title: 'Onboarding',
      endpoint: 'onboarding',
      columns: ['employee_id', 'area', 'title', 'due_date', 'status'],
      fields: [
        employee,
        select('area', 'Readiness Area', [
          'Identity',
          'Job',
          'Access',
          'Attendance',
          'Leave',
          'Payroll',
          'Tax',
          'Documents',
          'Notifications',
        ]),
        title,
        f('due_date', 'Due Date', 'date'),
      ],
      create: 'manage',
      action: 'complete',
    },
    {
      key: 'details',
      title: 'Employee details',
      endpoint: 'employee-details',
      columns: ['employee_id', 'kind', 'title', 'detail', 'effective_from'],
      fields: [
        employee,
        select('kind', 'Detail Type', [
          'Emergency Contact',
          'Skill',
          'Qualification',
          'Asset',
          'Status Change',
        ]),
        title,
        f('detail', 'Details', 'textarea'),
        f('effective_from', 'Effective From', 'date'),
      ],
    },
  ],
};
