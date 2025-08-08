import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.fullscreen';
import { EquipoDashboardDTO } from '../../../models/DTO/EquipoDashboardDTO';

// Declarar extensión para markerClusterGroup
declare module 'leaflet' {
  function markerClusterGroup(options?: any): L.MarkerClusterGroup;
}

@Component({
  selector: 'mapa',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {
  private map: L.Map | undefined;
  private overlayControl: L.Control.Layers | undefined;
  private baseMaps: Record<string, L.TileLayer> = {};

  @Input() equiposDTO: EquipoDashboardDTO[] = [];

  ngOnInit(): void {
    this.cargarMapasBase();
    console.log('Leaflet:', L);
    console.log('markerClusterGroup:', (L as any).markerClusterGroup);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && this.equiposDTO && this.equiposDTO.length > 0) {
      this.cargarEquiposAlMapa();
    }
  }

  private cargarMapasBase(): void {
    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    });

    const IDEuy = L.tileLayer.wms('https://mapas.ide.uy/geoserver-raster/ortofotos/wms', {
      layers: 'ortofoto_nacional',
      format: 'image/png',
      version: '1.1.1',
      attribution: '&copy; IDEuy',
    });

    const IGM = L.tileLayer.wms('https://wms.igm.gub.uy/geoserver/PCN50KHD_COMPLETO/wms', {
      layers: ['Bloque_SE', 'Bloque_SO', 'Bloque_NE', 'Bloque_NO'].join(),
      attribution: '&copy; Instituto Geográfico Militar',
    });

    const IGM250 = L.tileLayer.wms('https://wms.igm.gub.uy/geoserver/PCN250/wms', {
      layers: [
        '21H-10_Mercedes', '21H-11_Durazno', '21H-12_Treinta_y_Tres',
        '21H-14_Colonia', '21H-15_Montevideo', '21H-16_Punta_del_este',
        '21H-6_Paysandú', '21H-7_Paso_de_los_Toros', '21H-8_Melo',
        '21J-1_Bella_Unión', '21J-2_Rivera', '21J-3_Salto', '21J-4_Tacuarembo',
        '21J-5_Vichadero', '22H-13_Chuy', '22H-17_Castillos', '22H-9_Rio_Branco',
      ].join(),
      attribution: '&copy; Instituto Geográfico Militar',
    });

    this.map = L.map('map', {
      center: [-32.82, -56.4],
      zoom: 7,
      minZoom: 7,
      maxZoom: 18,
      layers: [osm],
    });

    this.baseMaps = {
      'OpenStreetMap': osm,
      'IDEuy': IDEuy,
      'PCN50': IGM,
      'PCN250': IGM250,
    };

    this.overlayControl = L.control.layers(this.baseMaps).addTo(this.map);
  }

  private cargarEquiposAlMapa(): void {
    if (!this.map || !this.overlayControl) return;

    const overlayGroups: Record<string, L.MarkerClusterGroup> = {};
    const unidadColores: Record<string, string> = {};
    const colores = ['red', 'blue', 'green', 'orange', 'purple', 'brown', 'darkred', 'cadetblue'];
    let colorIndex = 0;

    // Eliminar capas anteriores
    this.overlayControl.remove();
    this.overlayControl = L.control.layers(this.baseMaps).addTo(this.map);

    this.equiposDTO.forEach((equipo: EquipoDashboardDTO) => {
      if (!equipo.latitud || !equipo.longitud || !equipo.unidad) return;

      if (!unidadColores[equipo.unidad]) {
        unidadColores[equipo.unidad] = colores[colorIndex % colores.length];
        if (colorIndex < colores.length - 1) colorIndex++;
      }

      const color = unidadColores[equipo.unidad];

      if (!overlayGroups[equipo.unidad]) {
        overlayGroups[equipo.unidad] = (L as any).markerClusterGroup();
      }

      const icon = L.divIcon({
        html: `<div style="background-color:${color}; width:16px; height:16px; border-radius:50%; border:2px solid white;"></div>`,
        className: '',
        iconSize: [16, 16],
      });

      const marker = L.marker([equipo.latitud, equipo.longitud], { icon }).bindPopup(
        `<strong>${equipo.tipoEquipo ?? ''} - ${equipo.matricula ?? ''}</strong><br/>Unidad: ${equipo.unidad}`
      );

      overlayGroups[equipo.unidad].addLayer(marker);
    });

    Object.entries(overlayGroups).forEach(([unidad, group]) => {
      group.addTo(this.map!);
      this.overlayControl!.addOverlay(group, unidad);
    });
  }
}