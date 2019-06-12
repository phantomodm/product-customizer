import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'youth-glove-confirm',
  templateUrl: './youth-glove-confirm.component.html',
  styleUrls: ['./youth-glove-confirm.component.css']
})
export class YouthGloveConfirmComponent {

  youthGlove={};

  constructor(public dialogRef: MatDialogRef<YouthGloveConfirmComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: MatDialog) {
      _.assignIn(this.youthGlove, data)
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
