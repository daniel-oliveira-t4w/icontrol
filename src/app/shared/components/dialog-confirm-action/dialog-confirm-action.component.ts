import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogDataModel } from '../../models/dialog.data.model';


@Component({
  selector: 'app-dialog-confirm-action',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './dialog-confirm-action.component.html',
  styleUrl: './dialog-confirm-action.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogConfirmActionComponent {
  readonly data = inject<DialogDataModel>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DialogConfirmActionComponent>);
}
