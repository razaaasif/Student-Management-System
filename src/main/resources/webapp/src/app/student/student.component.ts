import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import {
  Student,
  StudentModel,
  StudentPersistModel,
} from '../shared/model/student.component.model';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import {
  deepCopy,
  isNullOrEmptyArray,
  isNullOrEmptyString,
} from '../shared/utils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditStudentComponent } from './edit-student.component/edit-student.component';
import { SpinnerService } from '../shared/services/spinner.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styles: [
    `
      footer {
        background-color: #f5f5f5;
        padding: 10px;
        text-align: center;
        font-size: 14px;
        color: #888;
      }

      footer a {
        color: #888;
        text-decoration: none;
        margin: 0 5px;
      }

      footer a:hover {
        text-decoration: underline;
      }
    `,
  ],
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
    private dialog: DialogService,
    private spinner: SpinnerService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.spinner.show();
    this.deletedStudent = new Array<string>();
    this.selectedStudents = new Array<StudentModel>();
    this.isChanged = false;
    this.isDeleted = false;
    this.hasNewItem = false;
    this.http.getStudents().subscribe(
      (data) => {
        console.log('Students data RESPONSE ->' + JSON.stringify(data));
        this.students = data.map((student) => {
          const st = new StudentModel(student);
          student.rollNumber = student.rollNumber;
          return st;
        });
        this.studentLength = isNullOrEmptyArray(this.students)
          ? '0'
          : this.students.length + '';
        this.originalStudents = deepCopy(this.students);
        console.log('students after map : ' + JSON.stringify(this.students));
        console.log(
          'originalStudents : ' + JSON.stringify(this.originalStudents)
        );
        this.spinner.hide();
      },
      (erro) => {
        this.spinner.hide();
        this.students = [];
        this.originalStudents = [];
        console.log('Error -> ' + JSON.stringify(erro));
      }
    );
  }

  showMessage(): void {
    this.message.add({
      summary: 'Opeartion performed successfully.',
      severity: 'success',
    });
  }

  onFilter(filter: any): void {
    console.log('onFilter : ' + JSON.stringify(filter.filteredValue));
    if (isNullOrEmptyString(this.filterText)) {
      return;
    }
    const lenth = isNullOrEmptyArray(this.students)
      ? '0'
      : this.students.length + '';
    const filterlength = isNullOrEmptyArray(filter.filteredValue)
      ? '0'
      : filter.filteredValue.length + '';
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
    this.spinner.show();
    const toSave = new StudentPersistModel();
    toSave.saveData = this.students.filter(
      (student) => student.isNew || student.isUpdated
    );
    toSave.deleteData.push(...this.deletedStudent);
    console.log('toSave : ' + JSON.stringify(toSave));

    this.http.persistStudents(toSave).subscribe((response) => {
      console.log('Response : ' + JSON.stringify(response));
      this.showMessage();
      this.isDeleted = false;
      this.hasNewItem = false;
      this.spinner.hide();
      this.loadData();
    });
  }

  addNewStudent(student: StudentModel = null): void {
    console.log('Edit Student Start' + JSON.stringify(student));
    const config = EditStudentComponent.DILAOG_CONFIG;
    const studentModel = new StudentModel(student);
    const editMode = student != null;
    config.data = {
      editMode,
      pageName: editMode ? 'Add new Student' : 'Edit Student',
      studentModel,
    };
    const ref: DynamicDialogRef = this.dialog.open(
      EditStudentComponent,
      EditStudentComponent.DILAOG_CONFIG
    );
    ref.onClose.subscribe((data) => {
      if (data) {
        this.showMessage();
        this.loadData();
      }
    });
  }
}
