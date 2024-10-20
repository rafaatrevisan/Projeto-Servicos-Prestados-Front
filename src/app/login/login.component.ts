import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuario';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  nome: string;
  email: string;
  senha: string;
  cadastrando: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit(){
    this.authService
           .tentarLogar(this.email, this.senha)
           .subscribe(response => {
              const access_token = JSON.stringify(response)
              localStorage.setItem('access_token', access_token)
              this.router.navigate(['/home'])
           }, errorResponse => {
            Swal.fire({
              icon: "error",
              title: "Erro ao tentar efetuar login!",
              text: "E-mail e/ou senha incorreto(s).",
              showConfirmButton: true,
              confirmButtonColor: "#f27474"
            });
           })
  }

  preparaCadastro(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(event){
    event.preventDefault();
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.nome = this.nome;
    usuario.email = this.email;
    usuario.senha = this.senha;

    this.authService
    .salvar(usuario)
    .subscribe(response => {
      Swal.fire({
        icon: "success",
        title: "Usuário cadastrado com sucesso!",
        text: "Por favor, efetue o login.",
        showConfirmButton: false,
        timer: 1750
      });
      this.cadastrando = false;
      this.nome = '';
      this.email = '';
      this.senha = '';
    }, errorResponse => {
      let errors = errorResponse.error.errors.join('<br>');
      
      Swal.fire({
        icon: "error",
        title: "Erro ao tentar cadastrar usuário!",
        html: errors,
        showConfirmButton: true,
        confirmButtonColor: "#f27474"
      });
    })
  }

}
