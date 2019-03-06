import { Component, OnInit } from '@angular/core';
import { Control, CRS, GridLayer, GridLayerOptions, Map, MapOptions, tileLayer, LeafletEvent } from 'leaflet';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-rising-map',
	templateUrl: './rising-map.component.html',
	styleUrls: ['./rising-map.component.scss']
})
export class RisingMapComponent implements OnInit {

	public options: MapOptions = null;

	public layersControl = null;

	/**
	 *
	 *
	 * @readonly
	 * @memberof RisingMapComponent
	 */
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

		const opt: GridLayerOptions & any = {
			opacity: 0.75,
			className: "gridOverlay",
			maxZoom: 6,
			minZoom: 0,
			maxNativeZoom: 4,
			minNativeZoom: 0
		}

		return new Grid(opt);
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof RisingMapComponent
	 */
	public get chunkOverlay() {

		const Grid: any = GridLayer.extend({
			createTile: (coords) => {
				var tile = document.createElement('div');
				tile.style.outline = '1px solid rgba(200, 200, 200, 0.9)';
				return tile;
			}
		});

		const opt: GridLayerOptions & any = {
			opacity: 0.75,
			className: "chunkOverlay",
			tileSize: 256 / 3,
			maxZoom: 4,
			minZoom: 4,
			maxNativeZoom: 4,
			minNativeZoom: 4
		}

		return new Grid(opt);
	}

	/**
	 *
	 *
	 * @readonly
	 * @type {GridLayer}
	 * @memberof RisingMapComponent
	 */
	public get fileOverlay(): GridLayer {

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

		const opt: GridLayerOptions & any = {
			maxZoom: 6,
			minZoom: 2,
			maxNativeZoom: 4,
			minNativeZoom: 4
		}

		return new Grid(opt);
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof RisingMapComponent
	 */
	public get bottomLeftControl() {
		const blc: any = Control.extend({
			onAdd: (map: Map) => {
				const container = document.createElement("div");
				container.className = "control-coordinates";

				map.on("mousemove", (event: any) => {
					const real = {
						x: Math.floor((event.latlng.lng-16)*3)+1,
						y: Math.floor((event.latlng.lat+16)*3)+1
					};
					const xText = Math.abs(real.x) + (real.x > 0 ? "O" : "W");
					const yText = Math.abs(real.y) + (real.y < 0 ? "S" : "N");
					container.innerHTML = `${xText}, ${yText}`;
				})
				return container;
			}
		});

		return new blc({ position: "bottomleft" });
	}

	constructor() { }

	/**
	 *
	 *
	 * @param {Map} map
	 * @memberof RisingMapComponent
	 */
	public onMapReady(map: Map) {
		map.addControl(this.bottomLeftControl);
	}

	/**
	 *
	 *
	 * @memberof RisingMapComponent
	 */
	public ngOnInit() {
		this.options = {
			layers: [
				tileLayer(environment.mapTileUrl, { tileSize: 256, minZoom: 0, maxNativeZoom: 4, minNativeZoom: 0, maxZoom: 6, attribution: "RisingMap by Devidian" })
			],
			zoom: 2,

			maxZoom: 6,
			minZoom: 0,
			crs: CRS.Simple,
			center: [0, 0]
		};

		this.layersControl = {
			overlays: {
				// 'File Names': this.fileOverlay,
				'Tile Grid': this.gridOverlay,
				// 'Chunks': this.chunkOverlay
			}
		};
	}

}
