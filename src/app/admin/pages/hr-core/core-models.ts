export interface CoreField {
  key: string;
  label: string;
  type?: string;
  options?: any[];
  source?: string;
  required?: boolean;
}
export interface CoreTab {
  key: string;
  title: string;
  endpoint: string;
  columns: string[];
  fields?: CoreField[];
  manage?: boolean;
  payroll?: boolean;
  create?: string;
  action?: string;
}
export interface CoreModule {
  title: string;
  description: string;
  icon: string;
  tabs: CoreTab[];
}
export const f = (
  key: string,
  label: string,
  type = 'text',
  source?: string
): CoreField => ({ key, label, type, source, required: true });
export const select = (
  key: string,
  label: string,
  values: string[]
): CoreField => ({
  key,
  label,
  type: 'select',
  options: values.map((value) => ({ value, label: value })),
  required: true,
});
export const employee = f('employee_id', 'Employee', 'select', 'people'),
  reason = f('reason', 'Reason', 'textarea'),
  title = f('title', 'Title'),
  date = f('attendance_date', 'Attendance Date', 'date');
