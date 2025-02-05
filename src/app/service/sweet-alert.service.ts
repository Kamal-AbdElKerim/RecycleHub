import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() {}

  // 🔹 Confirmation Dialog
  confirmDialog(title: string, text: string, confirmCallback: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, confirm!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  }

  // 🔹 Success Alert
  successAlert(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#28a745'
    });
  }

  // 🔹 Error Alert
  errorAlert(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33'
    });
  }

  // 🔹 Info Alert
  infoAlert(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      confirmButtonText: 'Got it!',
      confirmButtonColor: '#17a2b8'
    });
  }
}
