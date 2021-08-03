import { Component, OnInit } from '@angular/core';
import { StudentDataService } from 'src/app/shared/services/student-data.service';
import { Router } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})


export class StudentsListComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  studentsList: any;
  constructor(private studentDataService: StudentDataService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentsList();
  }

  getStudentsList() {
   this.studentDataService.getStudents().subscribe((studentList) => {
      this.studentsList = studentList;
    });
  }

  deleteStudent(sid: number) {

    Swal.fire({
      title: 'Are you sure you want to delete the student?',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.value) {
        this.studentDataService.deleteStudent(sid).subscribe((response) => {
          this.getStudentsList();
        });

        Swal.fire('Student was deleted Successfully!', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The operation was cancelled', 'error');
      }
    });
  }

  editStudent(sid: number) {
    this.router.navigate(['update-student/' + sid]);
  }

}
