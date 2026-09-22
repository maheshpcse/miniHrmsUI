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
  title: 'Events & celebrations',
  description:
    'Make room for connection with shared events, invitations and planning.',
  icon: 'calendar',
  tabs: [
    {
      key: 'events',
      title: 'Events calendar',
      endpoint: 'events',
      columns: [
        'title',
        'starts_at',
        'venue',
        'capacity',
        'attending',
        'response',
      ],
      create: 'manage',
      fields: [
        title,
        f('description', 'Description', 'textarea'),
        f('starts_at', 'Starts At', 'datetime-local'),
        f('ends_at', 'Ends At', 'datetime-local'),
        f('timezone', 'Timezone'),
        f('venue', 'Venue'),
        f('capacity', 'Capacity', 'number'),
      ],
      action: 'rsvp',
    },
    {
      key: 'tasks',
      title: 'Planning checklist',
      endpoint: 'event-tasks',
      columns: ['event_id', 'title', 'owner_id', 'status'],
      create: 'manage',
      fields: [
        f('event_id', 'Event', 'select', 'events'),
        title,
        f('owner_id', 'Task Owner', 'select', 'people'),
      ],
      action: 'complete',
    },
  ],
};
