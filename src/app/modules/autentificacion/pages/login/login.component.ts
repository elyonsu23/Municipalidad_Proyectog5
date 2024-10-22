import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/database.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { Observable } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private databaseService: DatabaseService, private router: Router) {
    this.loginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      console.log(credentials)
      this.databaseService.login(credentials).subscribe(
        (data: any) => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/inicio']);  // Redirigir después de iniciar sesión
        },
        (error) => {
          this.errorMessage = 'Error al iniciar sesión. Verifique sus credenciales';
          console.error('Login failed', error);
        }
      );
    }
  }
  
  
}
