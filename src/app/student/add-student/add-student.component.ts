
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/models/Student';
import { StudentDataService } from 'src/app/shared/services/student-data.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  studentForm: FormGroup;

  student: Student = {
    id: 0,
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    dob: ''
  }

  date: any;

  constructor(private studentDataService: StudentDataService, public datepipe: DatePipe, public router: Router) { }

  ngOnInit(): void {
    this.studentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
      mobileNo: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      address: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null)
    });
  }

  addStudent() {
    this.student.name = this.studentForm.value.name;
    this.student.email = this.studentForm.value.email;
    this.student.mobileNo = this.studentForm.value.mobileNo;
    this.student.address = this.studentForm.value.address;
    this.student.dob = this.datepipe.transform(this.studentForm.value.dateOfBirth, 'yyyy-MM-dd')!;

    
    Swal.fire({
      title: 'Are you sure you want to add the student?',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.studentDataService
          .addStudent(this.student)
          .subscribe((response) => {
            Swal.fire('Student was added Successfully!', 'success');
            this.navigatebackToHome();
          });

        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The operation was cancelled', 'error');
        this.navigatebackToHome();
      }
    });
  }

  navigatebackToHome() {
    this.router.navigate(['students-list']);
  }

}
