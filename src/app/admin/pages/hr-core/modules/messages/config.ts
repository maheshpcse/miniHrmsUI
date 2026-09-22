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
  title: 'Notice board & messages',
  description:
    'Reach the right people and keep delivery, reading and acknowledgement distinct.',
  icon: 'mail',
  tabs: [
    {
      key: 'deliveries',
      title: 'Email & SMS delivery',
      endpoint: 'deliveries',
      manage: true,
      columns: ['channel', 'status', 'attempts', 'error_code', 'created_at'],
    },
    {
      key: 'inbox',
      title: 'Inbox & notices',
      endpoint: 'notices',
      columns: ['title', 'body', 'audience', 'publish_at', 'acknowledged_at'],
      fields: [
        title,
        f('body', 'Message', 'textarea'),
        select('audience', 'Audience', ['personal', 'team', 'company']),
        {
          ...f('recipient_id', 'Recipient', 'select', 'people'),
          required: false,
        },
        {
          ...f('publish_at', 'Publish At', 'datetime-local'),
          required: false,
        },
        {
          ...f('expires_at', 'Expires At', 'datetime-local'),
          required: false,
        },
        f('ack_required', 'Require Acknowledgement', 'checkbox'),
      ],
      action: 'notice',
    },
    {
      key: 'sent',
      title: 'Sent & scheduled',
      endpoint: 'notices/sent',
      columns: ['title', 'audience', 'publish_at', 'expires_at'],
    },
  ],
};
