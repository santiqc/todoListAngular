import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoListService } from '../service/todo-list.service';
import { Tarea } from '../model/Tarea';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  prioritys: any[] = [
    { value: 'ALTA', viewValue: 'ALTA' },
    { value: 'MEDIA', viewValue: 'MEDIA' },
    { value: 'BAJA', viewValue: 'BAJA' },
  ];

  form: FormGroup;

  constructor(private service: TodoListService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(250)]],
      prioridad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.obtenerListaTareas();
  }

  obtenerListaTareas() {
    this.service.obtenerListaTareas().subscribe(
      {
        next: (value) => {
          console.log(value);

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
      },
    });

  }

  limpiarCampos(): void {
    this.form.reset();
  }

}
