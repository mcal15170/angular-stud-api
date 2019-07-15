import { Injectable } from '@angular/core';
import { Student } from '../shchema/student';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  serverURl = 'http://localhost:2000/';

  httpOption = {
    headers: new HttpHeaders({ 'Content-Type': 'application/Json' })
  };

  constructor(private http: HttpClient) { }
  // =====================================================
  //create new record
  // =====================================================
  createStud(stud: Student) {
    // parameter
    // (1)url  (2)form data (3)header meta data
    return this.http.post<Student>(this.serverURl + 'api/add', stud, this.httpOption);

  }

  // =====================================================
  //get stud collection
  // =====================================================
  getCollection(): Observable<Student[]> {
    return this.http.get<Student[]>(this.serverURl + 'api/getdata', this.httpOption);
  }

  // =====================================================
  //delete by id
  // =====================================================
  deleteStudbyID(id: number) {
    return this.http.delete<number>(this.serverURl + 'api/remove/' + id);

  }

  // =====================================================
  //get single student by id
  // =====================================================
  getStudById(id: number) {
    return this.http.get<Student>(this.serverURl + 'api/singal/' + id, this.httpOption);
  }

  // =====================================================
  // update student by id
  // =====================================================
  update(id: number, stud: Student) {
   return this.http.put<Student>(this.serverURl + 'api/update/' + id, stud, this.httpOption);

  }





}
