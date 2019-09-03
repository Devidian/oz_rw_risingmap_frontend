import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Control, CRS, GridLayer, GridLayerOptions, LocationEvent, Map, MapOptions, tileLayer, TileLayerOptions } from 'leaflet';
import { environment } from 'src/environments/environment';
import { MapIdService } from '../service/map-id.service';

@Component({
	selector: 'app-rising-map',
	templateUrl: './rising-map.component.html',
	styleUrls: ['./rising-map.component.scss']
})
export class RisingMapComponent implements OnInit {

	public options: MapOptions = null;

	public layersControl = null;

	protected mapLayer: GridLayer = null;
	protected cacheBuster: string = "";
	protected Map: Map = null;
	public mapInitialized = false;

	/**
	 *
	 *
	 * @readonly
	 * @memberof RisingMapComponent
	 */
	public get gridOverlay() {

		const Grid: any = GridLayer.extend({
			createTile: (coords: { x: any; y: any; z: any; }) => {
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
						x: Math.floor((event.latlng.lng - 16) * 3) + 1,
						y: Math.floor((event.latlng.lat + 16) * 3) + 1
					};
					const xText = Math.abs(real.x) + (real.x > 0 ? "O" : "W");
					const yText = Math.abs(real.y) + (real.y < 0 ? "S" : "N");
					container.innerHTML = `Mouse position: ${xText}, ${yText}`;
				})
				return container;
			}
		});

		return new blc({ position: "bottomleft" });
	}

	/**
	 *
	 *
	 * @readonly
	 * @memberof RisingMapComponent
	 */
	public get bottomLeftControlRefreshButton() {
		const blc: any = Control.extend({
			onAdd: (map: Map) => {
				const container = document.createElement("div");
				container.className = "control-refresh";

				const button = document.createElement("button");
				button.innerHTML = "refresh map"
				button.onclick = () => {
					this.cacheBuster = new Date().getTime() + ''
					this.mapLayer.redraw();
				};
				container.appendChild(button);

				//auto refresh checkbox and number-input
				const refreshCheck = document.createElement("input");
				refreshCheck.type = "checkbox";

				const refreshValue = document.createElement("input");
				refreshValue.type = "number";
				refreshValue.min = "30";
				refreshValue.value = "30";

				const rf = () => {
					refreshCheck.checked ? this.cacheBuster = new Date().getTime() + '' : null;
					refreshCheck.checked ? this.mapLayer.redraw() : null;
					let rfTime = Number(refreshValue.value);
					rfTime = rfTime < 30 ? 30000 : rfTime * 1000;
					setTimeout(() => {
						rf();
					}, rfTime);
				};
				rf();
				container.appendChild(refreshCheck);
				container.appendChild(refreshValue);
				return container;
			}
		});

		return new blc({ position: "bottomleft" });
	}

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private zone: NgZone,
		private mid: MapIdService
	) {

	}

	/**
	 *
	 *
	 * @param {Map} map
	 * @memberof RisingMapComponent
	 */
	public onMapReady(map: Map) {
		map.addControl(this.bottomLeftControl);
		map.addControl(this.bottomLeftControlRefreshButton);
		map.on('moveend', (event: LocationEvent) => {
			const real = {
				x: Math.floor((map.getCenter().lng - 16) * 3) + 1,
				y: Math.floor((map.getCenter().lat + 16) * 3) + 1
			};
			this.navigateTo(real.x, real.y, map.getZoom());
		});
	}

	/**
	 *
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} [z=2]
	 * @memberof RisingMapComponent
	 */
	public navigateTo(x: number, y: number, z: number = 2): void {
		this.zone.run(() => {
			this.router.navigate([x, y, z], { replaceUrl: true });
		});
	}

	/**
	 *
	 *
	 * @param {number} x
	 * @param {number} y
	 * @memberof RisingMapComponent
	 */
	public moveTo(x: number, y: number): void {

	}

	/**
	 *
	 *
	 * @protected
	 * @param {string} url
	 * @memberof RisingMapComponent
	 */
	protected initMap(mapId: string) {
		// console.log(`Initializing map ${mapId}`);
		let url = environment.mapTileUrl;
		const tlo: any & TileLayerOptions = { mapId: mapId, nocache: () => this.cacheBuster, subdomains: environment.mapTileSubdomains, tileSize: 256, minZoom: 0, maxNativeZoom: 4, minNativeZoom: 0, maxZoom: 6, attribution: "RisingMap by Devidian" };
		this.mapLayer = tileLayer(!mapId ? url.replace("{mapId}/", "") : url + "?t={nocache}", tlo);

		const posX = this.route.snapshot.params['posX'] || 0;
		const posY = this.route.snapshot.params['posY'] || 0;
		const zoom = this.route.snapshot.params['zoom'] || 2;

		const lng = posX != 0 ? ((posX - 1) / 3) + 16 : 0;
		const lat = posY != 0 ? ((posY - 1) / 3) - 16 : 0;

		this.options = {
			layers: [
				this.mapLayer
			],
			zoom: zoom,

			maxZoom: 6,
			minZoom: 0,
			crs: CRS.Simple,
			center: [lat, lng]
		};

		this.layersControl = {
			overlays: {
				// 'File Names': this.fileOverlay,
				'Tile Grid': this.gridOverlay,
				// 'Chunks': this.chunkOverlay
			}
		};
		this.mapInitialized = true;
	}

	/**
	 *
	 *
	 * @memberof RisingMapComponent
	 */
	public ngOnInit() {

		if (!environment.mapTileUrl.includes("{mapId}")) {
			this.initMap(null);
		} else {

			this.mid.getMapId().subscribe({
				next: ({ id }: { id: string }) => {
					this.initMap(id);
				}, error: (err) => {
					this.initMap(null);
				}
			})
		}
	}

}
