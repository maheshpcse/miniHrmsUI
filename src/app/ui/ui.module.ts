import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IconComponent } from './icon.component';
import { UiStateComponent } from './ui-state.component';
import { PortalShellComponent } from './portal-shell.component';
import { AuthPageComponent } from './auth-page.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';
import { SelectComponent } from './select.component';
import { FeedbackComponent } from './feedback.component';
@NgModule({
  declarations: [
    SelectComponent,
    FeedbackComponent,
    IconComponent,
    UiStateComponent,
    PortalShellComponent,
    AuthPageComponent,
  ],
  imports: [OverlayModule, A11yModule, CommonModule, FormsModule, RouterModule],
  exports: [
    SelectComponent,
    FeedbackComponent,
    IconComponent,
    UiStateComponent,
    PortalShellComponent,
    AuthPageComponent,
  ],
})
export class UiModule {}
