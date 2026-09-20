import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IconComponent } from "./icon.component";
import { UiStateComponent } from "./ui-state.component";
import { PortalShellComponent } from "./portal-shell.component";
import { AuthPageComponent } from "./auth-page.component";
@NgModule({
  declarations: [
    IconComponent,
    UiStateComponent,
    PortalShellComponent,
    AuthPageComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    IconComponent,
    UiStateComponent,
    PortalShellComponent,
    AuthPageComponent,
  ],
})
export class UiModule {}
