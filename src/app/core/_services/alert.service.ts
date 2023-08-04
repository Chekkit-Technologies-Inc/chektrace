import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
// import Swal from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2'

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {

    }

    simpleAlert(msg){
        Swal.fire(msg);
    }

    showAlertNotification(title,msg,type){
        console.log(title)
        Swal.fire(title, msg, type)
    }

    alertConfirmation(title, message){
        Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            confirmButtonColor: 'red',
            showCancelButton: true,
            confirmButtonText: 'Yes, go ahead.',
            cancelButtonText: 'No, let me think again'
        }).then((result) => {
            if (result.value) {
            Swal.fire(
                'Done!',
                'Action performed successfully.',
                'success'
            )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
                'Cancelled',
                'Performed action record present in cloud and databstore.)',
                'error'
            )
            }
        })
    }
}
