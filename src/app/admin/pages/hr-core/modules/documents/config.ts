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
  title: 'Document center',
  description:
    'Protected documents, clear version history and acknowledgements in one place.',
  icon: 'request',
  tabs: [
    {
      key: 'documents',
      title: 'Documents',
      endpoint: 'documents',
      columns: ['title', 'category', 'employee_id', 'visibility', 'expires_on'],
      fields: [
        employee,
        title,
        f('category', 'Category'),
        select('visibility', 'Visibility', ['private', 'company']),
        { ...f('expires_on', 'Expires On', 'date'), required: false },
        f('ack_required', 'Require Acknowledgement', 'checkbox'),
        f('file', 'Document (PDF, PNG, JPEG; up to 10 MB)', 'file'),
      ],
      action: 'document',
    },
  ],
};
