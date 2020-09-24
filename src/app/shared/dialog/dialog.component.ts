import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    width: number,
    height: number,
    type: string,
    icon: string,
    message: string,
    secondMessage: string,
    title: string,
    showCancel: boolean,
    showConfirmation: boolean,
    cancelText: string,
    confirmationText: string,
  }) {
  }

  ngOnInit(): void {
    this.data.width = this.data.width == undefined ? 700 : this.data.width;
    this.data.height = this.data.height == undefined ? 200 : this.data.height;
    this.data.showCancel = this.data.showCancel == undefined ? true : this.data.showCancel;
    this.data.showConfirmation = this.data.showConfirmation == undefined ? true : this.data.showConfirmation;
    this.data.cancelText = this.data.cancelText == undefined ? "Cancel" : this.data.cancelText;
    this.data.confirmationText = this.data.confirmationText == undefined ? "Ok" : this.data.confirmationText;
    this.data.type = this.data.type == undefined ? "bg-primary" : "bg-" + this.data.type;
  }

}

