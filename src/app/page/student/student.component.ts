import { Component, OnInit } from '@angular/core';
// service
import { StudentService } from 'src/app/services/student.service';
// schema
import { Student } from 'src/app/shchema/student';
// toast
import { ToastrService } from 'ngx-toastr';
// form
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';




@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
})
export class StudentComponent implements OnInit {
  registerForm: FormGroup;
  submitted: Boolean = false;
  allStud: Observable<Student[]>;
  btnName: string = 'save';
  studUpdateId: number = null;


  constructor(private service: StudentService, private toastr: ToastrService, private fb: FormBuilder) { }


  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      Address: ['', [Validators.required, Validators.minLength(8)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      lastname: ['', Validators.required],
      DateofBirth: ['', Validators.required],
    });
    this.getAllStudent();
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid && this.submitted) {
      this.toastr.error('Form Data Invalid Please Correct IT!', 'Form Error!');

    } else {
      // form data correct 
      this.insertStud(this.registerForm.value);
    }

  }

  insertStud(stud: Student) {
    if (this.studUpdateId == null) {
      // insert
      this.service.createStud(stud).subscribe(
        (data) => {
          // form submit false
          this.submitted = false;
          // display success message
          this.toastr.success("Save Form  Data SuccessFully", "Success!");
          // refresh list
          this.getAllStudent();
          // reset form
          this.registerForm.reset();
        }
      );
    } else {
      // updatate
      this.service.update(this.studUpdateId, stud).subscribe(
        (data) => {
          this.submitted = false;
          this.toastr.info('Update Data SuccessFully', 'Updated!');
          this.getAllStudent();
          this.studUpdateId = null;
          this.btnName = "save";
          this.registerForm.reset();
        }
      );

    }

  }

  //get object of form controls
  get f() {
    return this.registerForm.controls;
  }

  //get coolection of student
  getAllStudent() {
    this.service.getCollection().subscribe(
      (data: any) => {
        this.allStud = data
      }
    );
  }

  //update student
  fillForm(id: number) {
    this.service.getStudById(id).subscribe(
      stud => {
        this.studUpdateId = id;
        this.registerForm.controls['name'].setValue(stud.name);
        this.registerForm.controls['phoneNumber'].setValue(stud.phoneNumber);
        this.registerForm.controls['Address'].setValue(stud.Address);
        this.registerForm.controls['lastname'].setValue(stud.lastname);
        this.registerForm.controls['DateofBirth'].setValue(stud.DateofBirth);
        this.btnName = "update";
      }
    );
  }

  // delete student by id
  deleteStud(id: number) {
    if (confirm('are you sure to delete this record?')) {
      this.service.deleteStudbyID(id).subscribe(
        (data: any) => {
          this.toastr.success("Delete  Data SuccessFully", "Delete ID  : " + id + "!");
          this.getAllStudent();
        }
      )
    }
  }

  
  resetForm() {
    this.btnName = "save";
    this.registerForm.reset();
    this.submitted = false;
  }



}
