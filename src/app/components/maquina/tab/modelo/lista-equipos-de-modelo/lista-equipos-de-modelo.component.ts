import { Component, Input, OnInit } from '@angular/core';
import { Equipo } from '../../../../../models/equipo';
import Swal from 'sweetalert2';

import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { modeloService } from '../../../../../services/modelo.service';

@Component({
  selector: 'lista-equipos-de-modelo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './lista-equipos-de-modelo.component.html',
  styleUrls: ['./lista-equipos-de-modelo.component.css'],
})
export class ListaEquiposDeModeloComponent implements OnInit {
  dataSource!: MatTableDataSource<Equipo>;
  maquinas: Equipo[] = [];
  isLoadingMaquinas = false;
  displayedColumns: string[] = [
    'unidad',
    'tipoMaquina',
    'matricula',
    'marca',
    'modelo',
    'estado',
    'capacidad',
    'tiempoDeTrabajo',
  ];

  @Input() idModelo: number | null = null;

  constructor(private service: modeloService) {}

  ngOnInit() {
    this.isLoadingMaquinas = true;
    this.service.cargarEquipos(this.idModelo ?? 0).subscribe((data) => {
      this.maquinas = [...data];
      this.dataSource = new MatTableDataSource(this.maquinas);
      this.isLoadingMaquinas = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
