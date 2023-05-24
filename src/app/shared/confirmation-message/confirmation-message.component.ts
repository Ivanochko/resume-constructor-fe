import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss']
})
export class ConfirmationMessageComponent implements OnInit {

  dialogConfig = new MatDialogConfig();

  constructor(private dialog: MatDialog,
              private dialogRef: MatDialogRef<ConfirmationMessageComponent>) {
  }

  ngOnInit(): void {
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }

  onRemoveClick() {
    this.dialogRef.close(true);
  }

}
