import { Component, OnInit } from '@angular/core';
import { ServicoPrestadoBusca } from './servicoPrestadoBusca';
import { ServicoPrestadoService } from '../../servico-prestado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-servico-prestado-lista',
  templateUrl: './servico-prestado-lista.component.html',
  styleUrls: ['./servico-prestado-lista.component.css']
})
export class ServicoPrestadoListaComponent implements OnInit {

  nome: string  = '';
  mes: number;
  meses: number[];
  lista: ServicoPrestadoBusca[]

  constructor(
    private service: ServicoPrestadoService
  ) {
    this.meses = [1,2,3,4,5,6,7,8,9,10,11,12]
   }

  ngOnInit(): void {
  }
  
  consultar() {
    if ((!this.nome || this.nome.trim() === '') && !this.mes) {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Você deve informar pelo menos o nome ou o mês para realizar a consulta.",
        showConfirmButton: true,
        confirmButtonColor: "#f27474"
      });
      return;
    }
  
    this.service.buscar(this.nome, this.mes).subscribe(response => {
      this.lista = response;
      
      if (this.lista.length <= 0) {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Nenhum registro encontrado.",
          showConfirmButton: true,
          confirmButtonColor: "#f27474"
        });
      }
    });
  }
}
