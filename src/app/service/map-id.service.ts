import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MapIdService {

	constructor(private http: HttpClient) { }

	getMapId() {
		return this.http.get("mapid.info");
	}
}
