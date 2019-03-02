import { Component, OnInit } from '@angular/core';
import { circle, CRS, Layer, MapOptions, polygon, tileLayer, GridLayer, GridLayerOptions } from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-rising-map',
	templateUrl: './rising-map.component.html',
	styleUrls: ['./rising-map.component.scss']
})
export class RisingMapComponent implements OnInit {

	public options: MapOptions = null;

	public layersControl = null;

	public get gridOverlay() {

		const Grid: any = GridLayer.extend({
			createTile: (coords) => {
				var tile = document.createElement('div');
				var label = document.createElement('span');
				label.className = "coords";
				label.innerHTML = [coords.x, coords.y, coords.z].join(', ');
				tile.appendChild(label);
				tile.style.outline = '1px solid rgba(0, 0, 0,0.9)';
				return tile;
			}
		});

		const opt: GridLayerOptions = {
			opacity: 0.75,
			className: "gridOverlay"
		}

		return new Grid(opt);
	}

	public get fileOverlay() {

		const Grid: any = GridLayer.extend({
			createTile: (coords) => {
				var tile = document.createElement('div');
				var label = document.createElement('span');
				label.innerHTML = `mt_${coords.x * -1}_${coords.y * -1}`;
				tile.appendChild(label);
				tile.style.outline = '1px solid rgba(0, 0, 0,0.9)';
				return tile;
			}
		});

		const opt: GridLayerOptions = {
			maxZoom: 4,
			minZoom: 4
		}

		return new Grid(opt);
	}

	constructor() { }


	ngOnInit() {
		this.options = {
			layers: [
				tileLayer(environment.mapTileUrl, { maxZoom: 4, attribution: "RisingMap by Devidian" })
			],
			zoom: 2,

			crs: CRS.Simple,
			center: [0, 0]
		};

		this.layersControl = {
			overlays: {
				// 'File Names': this.fileOverlay,
				'Tile Grid': this.gridOverlay
			}
		};
	}

}
