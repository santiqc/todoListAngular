import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public loading(text: string): void {
    Swal.fire(
      {
        showConfirmButton: false,
        showCloseButton: false,
        showCancelButton: false,
        allowEscapeKey: false,
        footer: `<p>${text}</p>`,
        width: 312
      });
    Swal.showLoading();

  }

  public mensajeExito(text: string): void {
    Swal.fire({
      title: "Informacion",
      text: text,
      icon: "success",
      confirmButtonColor: "#62e462",
    });
  }

  public mensajeConfirmacion(text: string): Promise<any> {
    return Swal.fire({
      title: "Informacion",
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#62e462",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar!"
    }).then((result) => {
      return result;
    });
  }

  public close(): void {
    Swal.close();
  }
}
