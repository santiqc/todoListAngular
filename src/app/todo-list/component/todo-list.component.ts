import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../service/todo-list.service';
import { Tarea } from '../model/Tarea';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from '../service/alertService';


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
  actualizar: boolean = false;
  tarea!: Tarea | null;
  constructor(private service: TodoListService,
    private alertService: AlertService,
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
          this.dataSource.paginator = this.paginator
        }
      }
    )
  }

  crearActualizarTarea(): void {
    if (this.actualizar) {
      this.actualizarTarea(this.tarea!)
      return;
    }

    this.crearTarea();
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
        this.alertService.mensajeExito(value.mensaje);
        console.log(value);
        this.limpiarCampos();
        this.obtenerListaTareas();
      },
    });

  }

  limpiarCampos(): void {
    this.actualizar = false;
    this.tarea = null;
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

  previoActualizarTarea(element: Tarea): void {
    this.actualizar = true;
    this.tarea = element;
    this.form.get('nombre')?.setValue(element.nameTark);
    this.form.get('descripcion')?.setValue(element.description);
    this.form.get('prioridad')?.setValue(element.priority);
  }

  actualizarTarea(element: Tarea): void {
    // Lógica para actualizar la tarea
    const formValues = this.form.getRawValue();
    const data: Tarea = {
      id: element.id,
      nameTark: formValues.nombre,
      description: formValues.descripcion,
      priority: formValues.prioridad
    };

    this.service.actualizarTarea(data).subscribe({
      next: (value) => {
        this.alertService.mensajeExito(value.mensaje);
        console.log(value);
        this.limpiarCampos();
        this.obtenerListaTareas();
      },
    });
  }

  eliminarTarea(element: any): void {
    this.alertService.mensajeConfirmacion('Estas seguro de eliminar la tarea?')
      .then((result) => {
        if (result.isConfirmed) {
          this.service.eliminarTarea(element.id).subscribe(
            {
              next: (value) => {
                this.alertService.mensajeExito(value.mensaje);
                console.log(value);
                this.limpiarCampos();
                this.obtenerListaTareas();
              },
            }
          )
        }
      });


  }

  ponerEnCurso(element: Tarea) {

  }

}
