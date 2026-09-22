export { CoreField, CoreTab, CoreModule } from './core-models';
import { CoreModule } from './core-models';
import { config as people } from './modules/people/config';
import { config as attendance } from './modules/attendance/config';
import { config as leave } from './modules/leave/config';
import { config as documents } from './modules/documents/config';
import { config as messages } from './modules/messages/config';
import { config as events } from './modules/events/config';
import { config as engagement } from './modules/engagement/config';
import { config as exit } from './modules/exit/config';
import { config as salary } from './modules/salary/config';
import { config as approvals } from './modules/approvals/config';
import { config as audit } from './modules/audit/config';
import { config as policies } from './modules/policies/config';
export const CORE_MODULES: { [key: string]: CoreModule } = {
  people,
  attendance,
  leave,
  documents,
  messages,
  events,
  engagement,
  exit,
  salary,
  approvals,
  audit,
  policies,
};
