import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { ApiService } from '../service/api.service';

@Injectable({
    providedIn: 'root',
})
export class DialogModals {

    constructor(private dialog: MatDialog) { }

    public error(message: string, secondMessage?: string, callback?: Function): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "warning",
                message: message,
                secondMessage: secondMessage,
                confirmationText: "Ok",
                title: "Atenção",
                type: "warning",
                showCancel: false
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(callback){
                    callback();
                }
            }
        });
    }

    public succes(message: string, secondMessage?: string, callback?: Function): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            data: {
                icon: "check",
                message: message,
                secondMessage: secondMessage,
                confirmationText: "Ok",
                title: "Atenção",
                type: "success",
                showCancel: false
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                if(callback){
                    callback();
                }
            }
        });
    }
}