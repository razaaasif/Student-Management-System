import { Component } from '@angular/core';
import {
  Student,
  StudentModel,
} from '../../shared/model/student.component.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  templateUrl: './edit-student.component.html',
})
export class EditStudentComponent {
  public static DILAOG_CONFIG: DynamicDialogConfig = {
    width: '30%',
    height: '60%',
    closable: true,
    showHeader: false,
    modal: false,
    contentStyle: { height: '100%', overflow: 'auto' },
    baseZIndex: 10000,
  };
  public student: StudentModel = null;
  constructor(private dynamicDialog: DynamicDialogRef) {}
  onClose(): void {
    this.dynamicDialog.close();
  }
}
