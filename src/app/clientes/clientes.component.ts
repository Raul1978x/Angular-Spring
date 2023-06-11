import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] | undefined;

  constructor(private ClienteService: ClienteService) { }

  ngOnInit(): void {
    this.ClienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }

  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: 'Está Seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, elimínalo!',
      cancelButtonText: 'No, cancelar!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        if (typeof cliente.id !== 'undefined') { // Verificar si cliente.id es undefined
          this.ClienteService.delete(cliente.id).subscribe(
            response => {
              this.clientes = this.clientes?.filter(cli => cli !== cliente);
            }
          );
          swalWithBootstrapButtons.fire(
            'Eliminado!',
            `Cliente ${cliente.nombre} ${cliente.apellido} ha sido eliminado con éxito!!.`,
            'success'
          );
        }
      }
    });
  }
}  
