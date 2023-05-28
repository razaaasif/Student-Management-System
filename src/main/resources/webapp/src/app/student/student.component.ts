import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import { Student } from '../shared/model/student.component.model';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { isNullOrEmptyArray, isNullOrEmptyString } from '../shared/utils';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  providers: [MessageService, ConfirmationService],
})
export class StudentComponent implements OnInit {
  @ViewChild('dt') dt: Table;

  students: Student[];
  selectedStudents: Student[];
  filterText: string;
  studentLength: string;
  constructor(
    private http: StudentService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.http.getStudents().subscribe((data) => {
      this.students = data;
      this.studentLength = isNullOrEmptyArray(this.students)
        ? '0'
        : this.students.length + '';
      console.log('students : ' + JSON.stringify(this.students));
    });
  }

  openNew(): void {}
  deleteSelectedProducts(): void {}

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
}
