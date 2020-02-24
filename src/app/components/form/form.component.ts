import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente.model';
import { Region } from '../../models/region.model';
import { ClienteService } from '../../services/cliente.service';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  regiones: Region[];
  titulo: string = "Crear Cliente";

  errores: string[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  create(): void {
    console.log(this.cliente);
    this.clienteService.create(this.cliente)
      .subscribe(
        cliente => {
          //this.router.navigate(['/clientes']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }

  update(): void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente)
      .subscribe(
        json => {
         // this.router.navigate(['/clientes']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

}
