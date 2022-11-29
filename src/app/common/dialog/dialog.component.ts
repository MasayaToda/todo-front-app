import { Component, Inject} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
  ) {}
}