import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class FeedbackService {
  readonly messages = new Subject<string>();
  saved(message = 'Your changes have been saved.') {
    this.messages.next(message);
  }
}
