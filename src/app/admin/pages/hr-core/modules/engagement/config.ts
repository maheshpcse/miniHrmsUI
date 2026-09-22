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
  title: 'Employee engagement',
  description:
    'Listen, recognize and improve without turning participation into performance scores.',
  icon: 'heart',
  tabs: [
    {
      key: 'surveys',
      title: 'Pulse surveys & polls',
      endpoint: 'surveys',
      columns: ['title', 'question', 'closes_at', 'responses'],
      create: 'manage',
      fields: [
        title,
        f('question', 'Question', 'textarea'),
        f('options', 'Answer Options (one per line)', 'textarea'),
        f('anonymous', 'Anonymous Responses', 'checkbox'),
        f('privacy_threshold', 'Minimum Responses for Results', 'number'),
        f('closes_at', 'Closes At', 'datetime-local'),
      ],
      action: 'survey',
    },
    {
      key: 'recognition',
      title: 'Recognition',
      endpoint: 'recognition',
      columns: ['employee_id', 'category', 'message', 'created_at'],
      fields: [
        employee,
        f('category', 'Recognition Category'),
        f('message', 'Message', 'textarea'),
      ],
    },
    {
      key: 'feedback',
      title: 'Feedback & ideas',
      endpoint: 'feedback',
      columns: ['kind', 'title', 'description', 'status'],
      fields: [
        select('kind', 'Type', ['Feedback', 'Idea']),
        title,
        f('description', 'Details', 'textarea'),
      ],
    },
  ],
};
