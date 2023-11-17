import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  hide = true;
  //Muestra el boton del ojo en contraseña
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

}
