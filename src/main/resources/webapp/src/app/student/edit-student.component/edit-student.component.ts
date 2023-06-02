import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Student,
  StudentModel,
  StudentValidatorModel,
} from '../../shared/model/student.component.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentService } from '../../shared/services/student.service';
import { KeyValueModel } from 'src/app/shared/model/name-value.model';
import { trimString } from 'src/app/shared/utils';
import { MessageService } from 'primeng/api';
import { MessageResponseTypes } from 'src/app/shared/model/message/messsage-response.model';
import { Subscription } from 'rxjs';
import { unSubscribeAll } from '../../shared/utils';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
@Component({
  templateUrl: './edit-student.component.html',
  styles: [
    `
      html,
      body {
        height: 100%;
        margin: 0;
      }

      .container {
        display: grid;
        grid-template-rows: 1fr auto; /* The footer occupies the last row */
        min-height: 100%;
      }
    `,
  ],
})
export class EditStudentComponent implements OnInit , OnDestroy {
  public static DILAOG_CONFIG: DynamicDialogConfig = {
    width: '30%',
    height: '65%',
    closable: true,
    showHeader: false,
    modal: true,
    contentStyle: {
      height: '110%',
      overflow: 'auto',
      margin: '0',
      padding: '0',
    },
    baseZIndex: 10000,
  };
  public student: StudentModel = new StudentModel();
  branchs: Array<KeyValueModel> = new Array<KeyValueModel>();
  public readonly trimString = trimString;
  isChanged = false;
  inValid = true;
  subcription: Array<Subscription> = new Array<Subscription>();
  constructor(
    private dynamicDialog: DynamicDialogRef,
    private studentService: StudentService,
    private spinner: SpinnerService
  ) {}
  ngOnDestroy(): void {
    unSubscribeAll(this.subcription);
  }

  ngOnInit(): void {
    this.spinner.show();
    this.subcription.push( this.studentService.getBranchs().subscribe((branch) => {
      console.log('branch : ' + JSON.stringify(branch));
      this.branchs = branch;
      this.spinner.hide();
    }));
  }
  onClose(): void {
    this.dynamicDialog.close();
  }
  onChange(): void {
    this.isChanged = true;
    this.student.validator = new StudentValidatorModel();
    const validator = this.student.validator;
    validator.firstName = trimString(this.student.firstName) === null;
    validator.lastName = trimString(this.student.lastName) === null;
    validator.branch = trimString(this.student.branch) === null;
    this.inValid =
      validator.firstName || validator.lastName || validator.branch;
  }
  save(): void {
    if (this.inValid) {
      return;
    }
    this.spinner.show();
   // tslint:disable-next-line:align
   this.subcription.push( this.studentService.putNewStudent(new Student(this.student)).subscribe((response) => {
     console.log('Student : ' + JSON.stringify(response));
     this.spinner.hide();
     this.dynamicDialog.close(true);
    }));
  }

  onCancel(): void {
    this.dynamicDialog.close(false);
  }

}
