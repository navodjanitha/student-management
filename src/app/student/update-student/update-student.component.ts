import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/shared/models/Student';
import { StudentDataService } from 'src/app/shared/services/student-data.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  studentForm: FormGroup;
  id: any;
  student: Student = {
    id: 0,
    name: '',
    email: '',
    mobileNo: '',
    address: '',
    dob: ''
  }
  date: any;

  constructor(private studentDataService: StudentDataService,
    public datepipe: DatePipe,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.patchValues();
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

  patchValues() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.studentDataService.getStudentById(this.id).subscribe((p) => {
        this.student = p;
        this.studentForm.controls['name'].setValue(this.student.name);
        this.studentForm.controls['email'].setValue(this.student.email);
        this.studentForm.controls['mobileNo'].setValue(this.student.mobileNo);
        this.studentForm.controls['address'].setValue(this.student.address);
        this.studentForm.controls['dateOfBirth'].setValue(this.datepipe.transform(this.student.dob, 'dd/MM/yyyy'));
      });
  }

  updateStudent() {
    this.student.id = this.id;
    this.student.name = this.studentForm.value.name;
    this.student.email = this.studentForm.value.email;
    this.student.mobileNo = this.studentForm.value.mobileNo;
    this.student.address = this.studentForm.value.address;
    this.student.dob = this.datepipe.transform(this.studentForm.value.dateOfBirth, 'yyyy-MM-dd')!;


    Swal.fire({
      title: 'Are you sure you want to update the student?',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.studentDataService.updateStudent(this.student).subscribe((response) => {
          Swal.fire('Student was updated Successfully!', 'success');
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
