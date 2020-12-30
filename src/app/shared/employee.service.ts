import { Injectable } from '@angular/core';
import {HttpClientModule,HttpClient,HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Employee} from './employee.model';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
BaseUrl:string = `http://localhost:3300/user`;
  constructor(private http:HttpClient) {
   }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  
   
  public getUser():Observable<Employee>{
    return this.http.get<Employee>(`http://localhost:3300/user`)
    .pipe(
      retry(1)  
    );
  }
  postUser(emp:Employee){
    return this.http.post(`http://localhost:3300/user/add`,emp)
    
  }
deleteUser(id:any):Observable<Employee>{
  return this.http.delete<Employee>(this.BaseUrl+`/delete/${id}`)
}
updateUser(emp:any,id:any):Observable<Employee>{
  return this.http.post<Employee>(this.BaseUrl+`/update/${id}`,emp)
}

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}

// username:emp.username,
//       email:emp.email,
//       password:emp.password,
//       role:emp.role,
//       contact:emp.contact,
//       picture:emp.picture  
