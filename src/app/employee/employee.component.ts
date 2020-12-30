import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee } from '../shared/employee.model';
import { EmployeeService } from '../shared/employee.service';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {
  
  username:string="";
  email:string="";
  password:string="";
  
 editMode:boolean = false;
 editId:string="";
 
 Emp:any = [];
  public PostEmp:Employee;
 
   constructor(
     public EmpServices :EmployeeService,
      public fb:FormBuilder
    ) { 
     this.PostEmp = new Employee()
      
  }
async show(event:any){}
  ngOnInit(): void {
      this.EmpServices.getUser().subscribe((data:any)=>{
          this.Emp = data;
          console.log(data)
        });
  }
// createForm(){
//   this.signUp = this.fb.group({
//     username : ['', Validators.required],
//     email:['',Validators.required],
//     password :['',[Validators.required,Validators.email]]
//   })
// }
onSubmit(form:NgForm){
  if(this.editMode){
    this.EmpServices.updateUser(form.value,this.editId).subscribe(
      (data:any)=>{console.log(`update success${data}`)},
      (err)=>{console.log(err)}

    )
  }
else{
     this.EmpServices.postUser(form.value).subscribe(
       (data:any)=>{console.log('Add data'+data)},
       (err)=>{console.log(err)}
       )
//  console.log(form.value)

     }
}
delete(use:any){
  this.EmpServices.deleteUser(use._id).subscribe((data)=>{
      window.location.reload()
  });
}

@ViewChild('username')uname:any;
@ViewChild('email')em:any;
@ViewChild('password')pass:any;

update(i:any,index:any){
  this.Emp
  console.log(this.Emp[index])
  this.uname.nativeElement.value = this.Emp[index].username
  this.em.nativeElement.value = this.Emp[index].email
  this.pass.nativeElement.value = this.Emp[index].password

  this.editMode =true;
  this.editId= this.Emp[index]._id;
}
}