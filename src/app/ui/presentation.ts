export function fieldLabel(key: string): string {
  const names: any = {
    empId: 'Employee ID',
    userName: 'Username',
    roleName: 'Role',
    email: 'Email Address',
    ipAddress: 'IP Address',
    dateOfBirth: 'Date Of Birth',
    dob: 'Date Of Birth',
    logOnTime: 'Start Time',
    logOffTime: 'End Time',
    lastLoginTime: 'Signed In',
    lastLogoutTime: 'Signed Out',
    sessionTime: 'Session Duration',
    empBasicInfo: 'Personal Details',
    empBankInfo: 'Bank Details',
    empOnboardingInfo: 'Onboarding Details',
  };
  return (
    names[key] ||
    key
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_-]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace(/\bId\b/g, 'ID')
  );
}
export function titleValue(value: any): string {
  const names: any = {
    hr: 'HR',
    rm: 'Reporting Manager',
    pm: 'Project Manager',
    fm: 'Finance Manager',
    ceo: 'CEO',
    admin: 'Administrator',
  };
  return names[String(value).toLowerCase()] || fieldLabel(String(value));
}
export function displayValue(value: any, key = ''): string {
  if (value === null || value === undefined || value === '')
    return 'Not Provided';
  if (key === 'status')
    return (
      (
        {
          '0': 'Inactive',
          '1': 'Active',
          '2': 'Pending Approval',
          '3': 'Notice Period',
        } as any
      )[String(value)] || titleValue(value)
    );
  if (['roleName', 'kind', 'audience', 'paid', 'attendanceType'].includes(key))
    return titleValue(value);
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (
    /date|time|At$/i.test(key) &&
    !['sessionTime', 'logOnTime', 'logOffTime'].includes(key) &&
    typeof value === 'string' &&
    /^\d{4}-\d{2}-\d{2}/.test(value)
  ) {
    const date = new Date(value);
    if (!isNaN(date.getTime()))
      return /^\d{4}-\d{2}-\d{2}$/.test(value)
        ? new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(date)
        : new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }).format(date);
  }
  return String(value);
}
export function detailRows(
  value: any,
  prefix = ''
): { label: string; value: string }[] {
  if (!value || typeof value !== 'object') return [];
  return Object.keys(value).reduce((rows, key) => {
    const normalized = key.replace(/[_-]/g, '').toLowerCase();
    if (
      [
        'id',
        'userid',
        'createdby',
        'updatedby',
        'approvedby',
        'rejectedby',
        'recipientid',
        'profile',
        'avatardataurl',
      ].includes(normalized) ||
      (/id$/.test(normalized) &&
        !['empid', 'employeeid'].includes(normalized)) ||
      /password|secret|token|encryptkey|atmcard|personalbanks/i.test(key)
    )
      return rows;
    let item = value[key];
    if (typeof item === 'string' && /^[\[{]/.test(item.trim())) {
      try {
        item = JSON.parse(item);
      } catch (_) {}
    }
    const label =
      prefix +
      (Array.isArray(value) ? 'Item ' + (Number(key) + 1) : fieldLabel(key));
    if (item && typeof item === 'object')
      rows.push(...detailRows(item, label + ' / '));
    else rows.push({ label, value: displayValue(item, key) });
    return rows;
  }, [] as { label: string; value: string }[]);
}
export function revealDetails(id: string) {
  setTimeout(() => {
    const element = document.getElementById(id);
    if (element) {
      element.focus({ preventScroll: true });
      element.scrollIntoView({
        block: 'start',
        behavior:
          matchMedia('(prefers-reduced-motion: reduce)').matches ||
          document.documentElement.getAttribute('data-motion') === 'reduced'
            ? 'auto'
            : 'smooth',
      });
    }
  });
}
