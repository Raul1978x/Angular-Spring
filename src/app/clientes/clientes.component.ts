import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[] | undefined ;

  constructor(private ClienteService: ClienteService){}
  
  ngOnInit(): void {
    this.clientes = this.ClienteService.getClientes();
  }



}
