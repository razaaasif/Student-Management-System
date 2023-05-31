export class Student {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  constructor(id: string, lastName: string, email: string) {
    if (null != id) {
      this.id = id;
    }

    this.lastName = lastName;
    this.firstName = this.firstName;
    this.email = email;
  }
}
export class StudentModel extends Student {
  rollNumber: string;

  isNew: boolean = false;
  isUpdated: boolean;
}

export class StudentPersistModel {
  saveData: Array<Student> = new Array<Student>();
  deleteData: Array<string> = new Array<string>();
}
