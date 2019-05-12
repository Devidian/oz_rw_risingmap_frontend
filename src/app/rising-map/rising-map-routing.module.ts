import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RisingMapComponent } from './rising-map.component';

const routes: Routes = [
	{ path: ':posX/:posY/:zoom', pathMatch: "full", component: RisingMapComponent },
	{ path: ':posX/:posY', pathMatch: "full", component: RisingMapComponent },
	{ path: '', pathMatch: "full", component: RisingMapComponent }
];


@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			// { enableTracing: true } // <-- debugging purposes only
		)
	],
	exports: [
		RouterModule
	]
})
export class RisingMapRoutingModule { }
