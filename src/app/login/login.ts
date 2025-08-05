import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {  
  userForm!: FormGroup;

  private formBuilder = inject(FormBuilder);
  ngOnInit() {
    this.userForm = this.formBuilder.group({ // 3. Использование fb
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      questionType: [''],
      text: ['', Validators.required]
    });
  }
  submit() {
    console.log(this.userForm.value);
  }
}
