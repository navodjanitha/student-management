import { Injectable } from '@angular/core';
import { Student } from '../models/Student';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {


    constructor(private http: HttpClient) {}

    addStudent(student: Student): Observable<any> {
      return this.http.post(
        'http://localhost:8081/api/student',student);
    }

    getStudents():Observable<any>{
      return  this.http.get<any>("http://localhost:8081/api/student");
    }

    deleteStudent(sid: number): Observable<any> {
      return this.http.delete<any>("http://localhost:8081/api/student/" + sid);
    }

    getStudentById(sid: number):Observable<any>{
      return  this.http.get<any>("http://localhost:8081/api/student/"+ sid);
    }

    updateStudent(student: Student) {
      return this.http
        .put("http://localhost:8081/api/student/"+ student.id, student);
    }
}
