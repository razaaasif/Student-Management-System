import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import {
  StudentModel,
  StudentPersistModel,
} from '../shared/model/student.component.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { SMSMessageService } from '../shared/services/component-services/sms-message-service';
import {
  deepCopy,
  isNullOrEmptyArray,
  isNullOrEmptyString,
} from '../shared/utils';
import { MessageResponseTypes } from '../shared/model/message/messsage-response.model';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { EditStudentComponent } from './edit-student.component/edit-student.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [MessageService],
})
export class StudentComponent implements OnInit {
  @ViewChild('dt') dt: Table;

  students: StudentModel[];
  originalStudents: StudentModel[];
  selectedStudents: StudentModel[];
  filterText: string;
  studentLength: string = '0';
  isChanged: boolean;
  isDeleted: boolean;
  deletedStudent: Array<string> = new Array<string>();
  hasNewItem: boolean = false;
  constructor(
    private http: StudentService,
    private message: MessageService,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.deletedStudent = new Array<string>();
    this.selectedStudents = new Array<StudentModel>();
    this.isChanged = false;
    this.isDeleted = false;
    this.hasNewItem = false;
    this.http.getStudents().subscribe(
      (data) => {
        console.log('Students data RESPONSE ->' + JSON.stringify(data));
        this.students = data;
        this.studentLength = isNullOrEmptyArray(this.students)
          ? '0'
          : this.students.length + '';
        this.originalStudents = deepCopy(this.students);
        console.log('students : ' + JSON.stringify(this.students));
        console.log(
          'originalStudents : ' + JSON.stringify(this.originalStudents)
        );
      },
      (erro) => {
        this.students = [];
        this.originalStudents = [];
        console.log('Error -> ' + JSON.stringify(erro));
      }
    );
  }

  addNewStudent(): void {
    const ref: DynamicDialogRef = this.dialog.open(
      EditStudentComponent,
      EditStudentComponent.DILAOG_CONFIG
    );
    ref.onClose.subscribe((data) => {
      if (data) {
        this.loadData();
      }
    });
  }

  onFilter(filter: any): void {
    if (isNullOrEmptyString(this.filterText)) {
      return;
    }
    const lenth = isNullOrEmptyArray(this.students)
      ? '0'
      : this.students.length + '';
    const filterlength = isNullOrEmptyArray(filter.filteValue)
      ? '0'
      : filter.filteValue.length + '';
    this.studentLength = filterlength + '/' + lenth;
    console.log('onFilter studentLength : ' + this.studentLength);
  }

  onChange(): void {
    console.log('onChange : ' + this.filterText);
    if (isNullOrEmptyString(this.filterText)) {
      this.studentLength = isNullOrEmptyArray(this.students)
        ? '0'
        : this.students.length + '';
    }
  }

  deleteSelectedStudents(): void {
    this.isDeleted = true;
    this.selectedStudents?.forEach((student, idx) => {
      this.delete(student.rollNumber, idx);
      this.students = this.students.filter(
        (st) => st.rollNumber !== student.rollNumber
      );
    });
    this.selectedStudents = [];
    this.updateStudentCount();
  }

  delete(rollNumber: string, index: number): void {
    this.isDeleted = true;
    this.isChanged = true;
    this.deletedStudent.push(rollNumber);
    console.log('RollNumber : ' + rollNumber + ' , index: ' + index);
    this.students?.splice(index, 1);
    console.log('students ' + JSON.stringify(this.students));
    this.updateStudentCount();
  }
  updateStudentCount(): void {
    this.students = deepCopy(this.students);
    this.studentLength = isNullOrEmptyArray(this.students)
      ? '0'
      : this.students.length + '';
  }
  public cancel(): void {
    if (this.isChanged) {
      this.students = deepCopy(this.originalStudents);
      this.updateStudentCount();
      this.isChanged = false;
    }
  }

  save(): void {
    const toSave = new StudentPersistModel();
    toSave.saveData = this.students.filter(
      (student) => student.isNew || student.isUpdated
    );
    toSave.deleteData.push(...this.deletedStudent);
    console.log('toSave : ' + JSON.stringify(toSave));

    this.http.persistStudents(toSave).subscribe((response) => {
      console.log('Response : ' + JSON.stringify(response));
      this.message.add({
        summary: response.message,
        severity:
          response.messageType === MessageResponseTypes.GENERIC_ERROR
            ? 'error'
            : 'success',
      });
      this.isDeleted = false;
      this.hasNewItem = false;
    });
  }
}
