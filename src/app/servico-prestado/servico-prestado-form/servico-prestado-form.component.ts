import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../clientes/cliente';
import { ClientesService } from '../../clientes.service'; 
import { ServicoPrestado } from '../servico-prestado';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;

  constructor(
    private clientesService: ClientesService,
    private service: ServicoPrestadoService
  ) {
    this.servico = new ServicoPrestado();
   }

  ngOnInit(): void {
    this.clientesService
    .getClientes()
    .subscribe(response => this.clientes = response);
  }

  formatarData(data: string): string {
    const [ano, mes, dia] = data.split('-'); 
    return `${dia}/${mes}/${ano}`;
  }

  onSubmit(){
    //Verificando data e a formatando para o padrão que a API espera receber
    if (this.servico.data && /^\d{4}-\d{2}-\d{2}$/.test(this.servico.data)) {
      this.servico.data = this.formatarData(this.servico.data);
    } else {
      this.servico.data = '';
    }

    //Validação para caso o usuário envie o select com a opção "Selecione..."
    if (this.servico.idCliente === null) {
      Swal.fire({
        icon: "error",
        title: "Erro ao tentar salvar serviço prestado!",
        text: "Selecione um cliente válido.",
        showConfirmButton: true,
        confirmButtonColor: "#f27474"
      });
      return; 
    }

    this.service
    .salvar(this.servico)
    .subscribe(response =>{
      Swal.fire({
        icon: "success",
        title: "Serviço prestado salvo com sucesso!",
        showConfirmButton: false,
        timer: 1500
      });
      this.servico = new ServicoPrestado();
    }, errorResponse => {
      let errors = errorResponse.error.errors.join('<br>');
      
      Swal.fire({
        icon: "error",
        title: "Erro ao tentar salvar serviço prestado!",
        html: errors,
        showConfirmButton: true,
        confirmButtonColor: "#f27474"
      });
    })
  }

}
