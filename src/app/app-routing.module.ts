import { environment } from '../environments/environment';
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
		path: 'user-hierarchy',
		// component: UserHierarchyComponent
		redirectTo: '/admin/dashboard', pathMatch: 'full'
	},

	{
		path: '**',
		component: NotFoundPageComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
