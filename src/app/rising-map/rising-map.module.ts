import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RisingMapComponent } from './rising-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RisingMapRoutingModule } from './rising-map-routing.module';
// import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [RisingMapComponent],
	imports: [
		CommonModule,
		LeafletModule,
		// HttpClientModule,
		RisingMapRoutingModule
	],
	exports: [RisingMapComponent]
})
export class RisingMapModule { }
