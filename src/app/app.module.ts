import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RisingMapModule } from './rising-map/rising-map.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		LeafletModule.forRoot(),
		AppRoutingModule,
		RisingMapModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
