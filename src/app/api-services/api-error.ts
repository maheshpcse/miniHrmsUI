/** Only display plain API messages; never Angular transport diagnostics or proxy HTML. */
export function apiErrorMessage(error: any): string {
  const candidate = error && error.error && error.error.message;
  const clean = (value: any) => typeof value === 'string' && value.trim().length > 0 && value.length <= 500 && !/(https?:\/\/|Http failure|<[^>]+>|ECONN|stack trace)/i.test(value);
  if (clean(candidate)) { return candidate.trim(); }
  if (error && clean(error.userMessage)) { return error.userMessage.trim(); }
  const status = error && error.status;
  if (status === 0 || status === 502 || status === 503 || status === 504) { return 'We cannot reach the service right now. Please try again shortly.'; }
  if (status === 401) { return 'Please sign in again to continue.'; }
  if (status === 403) { return 'You do not have permission to perform this action.'; }
  if (status === 429) { return 'Too many attempts. Please try again shortly.'; }
  return 'We could not complete your request. Please try again.';
}
