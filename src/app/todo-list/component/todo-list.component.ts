import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../service/todo-list.service';
import { Tarea } from '../model/Tarea';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
const ELEMENT_DATA: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, AfterViewInit {
  prioritys: any[] = [
    { value: 'ALTA', viewValue: 'ALTA' },
    { value: 'MEDIA', viewValue: 'MEDIA' },
    { value: 'BAJA', viewValue: 'BAJA' },
  ];

  form: FormGroup;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'description', 'created', 'lastModifiedDate', 'priority', 'action'];
  dataSource: any;


  constructor(private service: TodoListService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      prioridad: ['', [Validators.required]]
    });

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.obtenerListaTareas();
  }

  obtenerListaTareas() {
    this.service.obtenerListaTareas().subscribe(
      {
        next: (value: Tarea[]) => {
          console.log(value);
          value.forEach((elementAt: Tarea) => elementAt.status == 'CREADA');
          const sortedTareas = value.sort((a, b) => {
            const priorityOrder = ['ALTA', 'MEDIA', 'BAJA'];
            return priorityOrder.indexOf(a.priority!) - priorityOrder.indexOf(b.priority!);
          });

          this.dataSource = new MatTableDataSource<Tarea>(sortedTareas);
        }
      }
    )
  }

  crearTarea() {
    const formValues = this.form.getRawValue();
    console.log(this.form);
    const data: Tarea = {
      nameTark: formValues.nombre,
      description: formValues.descripcion,
      priority: formValues.prioridad
    };

    this.service.crearTarea(data).subscribe({
      next: (value) => {
        console.log(value);
        this.limpiarCampos();
        this.obtenerListaTareas();
      },
    });

  }

  limpiarCampos(): void {
    this.form.reset();
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'ALTA':
        return 'alta-class';
      case 'MEDIA':
        return 'media-class';
      case 'BAJA':
        return 'baja-class';
      default:
        return '';
    }
  }

  actualizarTarea(element: Tarea): void {
    // Lógica para actualizar la tarea
    console.log('Actualizar tarea:', element);
  }

  eliminarTarea(element: any): void {
    // Lógica para eliminar la tarea
    console.log('Eliminar tarea:', element);
  }

}
