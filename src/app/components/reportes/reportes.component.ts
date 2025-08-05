import { Component } from '@angular/core';
import { MaquinaService } from '../../services/equipo.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'reportes',
    imports: [],
    templateUrl: './reportes.component.html',
    styleUrl: './reportes.component.css',
})
export class ReportesComponent {
    constructor(private maquinaService: MaquinaService) {}

    generarReporteIndicadoresGestion() {
        this.maquinaService.generarReporteIndicadoresGestion().subscribe({
            next: (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = url;
                link.download = 'INDICADORES_DE_GESTIÓN.xlsx';

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo generar el reporte. ' + err.error,
                    icon: 'error',
                });
            },
        });
    }

    generarReportePrevisiones() {
        this.maquinaService.generarReportePrevisiones().subscribe({
            next: (blob: Blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');

                link.href = url;
                link.download = 'PREVISIONES_AÑO_PROXIMO.xlsx';

                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            },
            error: (err) => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se pudo generar el reporte. ' + err.error,
                    icon: 'error',
                });
            },
        });
    }
}
