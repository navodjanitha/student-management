import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './student/add-student/add-student.component';
import { StudentsListComponent } from './student/students-list/students-list.component';
import { UpdateStudentComponent } from './student/update-student/update-student.component';

const routes: Routes = [
  { path: '', component: StudentsListComponent },

  {
    path: 'add-student',
    component: AddStudentComponent,
  },

  {
    path: 'students-list',
    component: StudentsListComponent,
  },

  {
    path: 'update-student/:id',
    component: UpdateStudentComponent,
  }
];

@NgModule({
  imports: [FormsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
