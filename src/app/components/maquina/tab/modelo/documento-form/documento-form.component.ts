import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'documento-form',
  imports: [],
  templateUrl: './documento-form.component.html',
  styleUrl: './documento-form.component.css'
})
export class DocumentoFormComponent implements OnInit {
  @Input() modeloId: number | null=0;//todo el 0 puede dar problemas
  documentos: string[] = [];
  selectedFile: File | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDocumentos();
  }

  cargarDocumentos() {
    this.http.get<string[]>(`/api/modelos-equipos/${this.modeloId}/documentos`)
      .subscribe({
        next: data => this.documentos = data,
        error: err => console.error('Error al cargar documentos', err)
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  subirDocumento() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('documento', this.selectedFile);

    this.http.post(`/api/modelos-equipos/${this.modeloId}/documentos`, formData)
      .subscribe({
        next: () => {
          this.selectedFile = null;
          this.cargarDocumentos();
        },
        error: err => console.error('Error al subir documento', err)
      });
  }

  getDocumentoUrl(nombre: string): string {
    return `/uploads/documentos-modelo/${nombre}`;
  }
}