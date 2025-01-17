import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/api/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; // Formulario reactivo
  errorMessage: string | null = null; // Para mostrar errores al usuario

  valCheck: string[] = ['remember'];

  password!: string;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Configuración del formulario reactivo
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor, complete correctamente el formulario.';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        // Usa el método `saveToken` de AuthService
        this.authService.saveToken(response.token);

        // Redirigir al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);

        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage =
            'Hubo un problema al iniciar sesión. Inténtelo nuevamente.';
        }
      },
    });
  }
}
