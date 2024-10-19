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
