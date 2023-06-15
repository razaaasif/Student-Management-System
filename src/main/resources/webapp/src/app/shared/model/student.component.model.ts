export class Student {
  rollNumber?: string;
  firstName: string = null;
  lastName: string = null;
  email: string = null;
  branch: string = null;
  constructor(student: StudentModel = null) {
    console.log('Student const : ' + JSON.stringify(student));
    if (student) {
      this.firstName = student.firstName;
      this.lastName = student.lastName;
      this.email = student.email;
      this.branch = student.branch;
      if (student.rollNumber !== null) {
        this.rollNumber = student.rollNumber;
      }
    }
  }
}

export class StudentValidatorModel {
  firstName: boolean = false;
  lastName: boolean = false;
  email: boolean = false;
  branch: boolean = false;
}
export class StudentModel extends Student {
  isNew: boolean = false;
  isUpdated: boolean;
  validator: StudentValidatorModel = new StudentValidatorModel();
  constructor(student: StudentModel = null) {
    super(student);
    if (student) {
      this.validator = new StudentValidatorModel();
    }
  }
}

export class StudentPersistModel {
  saveData: Array<Student> = new Array<Student>();
  deleteData: Array<string> = new Array<string>();
}
