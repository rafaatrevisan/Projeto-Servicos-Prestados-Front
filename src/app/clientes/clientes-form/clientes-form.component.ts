import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.cliente = new Cliente();
   }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
    if(params && params["id"]){
      this.id = params["id"];
      this.service.
      getClienteById(this.id)
      .subscribe(
        response => this.cliente = response,
        errorResponse => this.cliente = new Cliente()
      )
    }
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes'])
  }

  onSubmit(){
    if(this.id){
      
      this.service
      .atualizar(this.cliente)
      .subscribe(response =>{
        Swal.fire({
          icon: "success",
          title: "Cliente atualizado com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
      }, errorResponse => {
        
        Swal.fire({
          icon: "error",
          title: "Erro ao tentar atualizar cliente!",
          showConfirmButton: true,
          confirmButtonColor: "#f27474"
        });
      })

    } else {

      this.service
      .salvar(this.cliente)
      .subscribe(response => {
        Swal.fire({
          icon: "success",
          title: "Cliente salvo com sucesso!",
          showConfirmButton: false,
          timer: 1500
        });
        this.cliente = response;
      }, errorResponse => {
        let errors = errorResponse.error.errors.join('<br>');
        
        Swal.fire({
          icon: "error",
          title: "Erro ao tentar salvar cliente!",
          html: errors,
          showConfirmButton: true,
          confirmButtonColor: "#f27474"
        });
      })

    }
  }
}
