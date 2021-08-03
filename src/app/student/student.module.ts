import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { StudentDataService } from '../shared/services/student-data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { StudentsListComponent } from './students-list/students-list.component';
import { UpdateStudentComponent } from './update-student/update-student.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AddStudentComponent,
    StudentsListComponent,
    UpdateStudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    NgbModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
    StudentDataService,
    DatePipe
  ],
})
export class StudentModule { }
