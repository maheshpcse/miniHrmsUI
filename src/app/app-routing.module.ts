import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './admin/pages/not-found-page/not-found-page.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'admin',
		pathMatch: 'full'
	},

	// *********** Admin Routes ******************
	{
		path: 'admin',
		loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
	},

	// *********** Employee Routes ***************

	{
		path: '**',
		component: NotFoundPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
