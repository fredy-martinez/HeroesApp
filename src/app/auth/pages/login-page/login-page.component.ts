import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor( 
    private authSerice: AuthService,
    private router:     Router
  ){}


  hide = true;
  //Muestra el boton del ojo en contraseña
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }


  onLogin(): void {

    this.authSerice.login('fernando@gmail.com', '123456')
    .subscribe(user => {
      this.router.navigate(['/'])
    })

  }

}
