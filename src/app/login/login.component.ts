import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  name: string;
  email: string;
  password: string;
  loginError: boolean;
  cadastrando: boolean;

  constructor(
    private router: Router
  ) { }

  onSubmit(){
    this.router.navigate(['/home'])
  }

  preparaCadastro(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(event){
    event.preventDefault();
    this.cadastrando = false;
  }

}
