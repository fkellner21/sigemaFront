import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'usuarios',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  displayedColumns: string[] = ['Grado', 'Nombre', 'Unidad', 'Rol'];
  dataSource = new MatTableDataSource();
  isLoading:boolean=false;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
