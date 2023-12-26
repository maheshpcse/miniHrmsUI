import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './admin/pages/not-found-page/not-found-page.component';
import { DynamicOrgChartComponent } from './admin/pages/dynamic-org-chart/dynamic-org-chart.component';

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
		component: DynamicOrgChartComponent
	},

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
