import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ice-locator-dialog',
  templateUrl: './ice-locator-dialog.component.html',
  styleUrls: ['./ice-locator-dialog.component.css']
})
export class IceLocatorDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<IceLocatorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onApply() {
    this._dialogRef.close(this.data);
  }

}
