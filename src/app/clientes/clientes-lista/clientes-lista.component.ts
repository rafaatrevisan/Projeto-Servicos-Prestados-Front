import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;

  constructor(
    private service: ClientesService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service
    .getClientes()
    .subscribe(response => {
      this.clientes = response
    });
  }

  novoCadastro(){
   this.router.navigate(['/clientes/form'])
  }

  preparaDelecao(cliente: Cliente){
    this.clienteSelecionado = cliente;
  }

  deletarCliente(){
    this.service
    .deletar(this.clienteSelecionado)
    .subscribe(response => {
      Swal.fire({
        icon: "success",
        title: "Cliente excluído com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.ngOnInit();
    }, errorResponse => {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro ao tentar excluir cliente.",
          showConfirmButton: true,
          confirmButtonColor: "#f27474"
        });
      })
    };
}
