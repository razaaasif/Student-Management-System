export class Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  branch: string;
  constructor(
    student: StudentModel = null
  ) {
    if (student) {
      this.firstName = student.firstName;
      this.lastName = student.lastName;
      this.email = student.email;
      this.branch = student.branch;
      if (student.rollNumber) {
        this.id = student.rollNumber;
      }
    }
  }
}

export class StudentValidatorModel { 

   id: boolean = false;
  firstName: boolean = false;
  lastName: boolean = false;
  email: boolean = false;
  branch: boolean = false;
}
export class StudentModel extends Student {
  rollNumber: string;

  isNew: boolean = false;
  isUpdated: boolean;
  validator: StudentValidatorModel = new StudentValidatorModel();
}

export class StudentPersistModel {
  saveData: Array<Student> = new Array<Student>();
  deleteData: Array<string> = new Array<string>();
}
