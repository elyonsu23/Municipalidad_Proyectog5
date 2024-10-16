import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit  {
  grupoForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario
  grupos: any[] = [];  // Variable para almacenar los usuarios recuperados de la base de datos

  modificarGrupoForm: FormGroup; // Formulario para modificar usuario
  grupoSeleccionado: any = null; // Variable para almacenar el usuario seleccionado

  constructor(private databaseService: DatabaseService, private fb: FormBuilder) {
    // Inicializamos el formulario con tres campos: username, mail y password
    this.grupoForm = this.fb.group({
      descripcion: ['', Validators.required],  // Campo obligatorio
    });

     // Formulario de modificación de usuarios
    this.modificarGrupoForm = this.fb.group({
      descripcion: ['', Validators.required],
     
    });
  }
  
   // Método para seleccionar un usuario y poblar el formulario de modificación
   editarGrupo(grupo: any) {
    this.grupoSeleccionado = grupo;
    this.modificarGrupoForm.patchValue({
      descripcion: grupo.descripcion,
      
    });
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarGrupoForm.valid) {
      const grupoModificado = {
        ...this.grupoSeleccionado,
        ...this.modificarGrupoForm.value
      };
      this.databaseService.modificarGrupo(grupoModificado, grupoModificado.idGrupo).subscribe({
        next: (response) => {
          if (response && response['message'] === 'OK') {
            alert('Grupo modificado con éxito');
            this.grupoSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarGrupos(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar Grupo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar usuario');
          console.log(grupoModificado)
          console.error('Error:', error);
        },
      });
    }
  }


  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarGrupos();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
  }

  // Método para manejar el envío del formulario
  submitForm() {
    // Solo continúa si el formulario es válido
    if (this.grupoForm.valid) {
      const grupoData = this.grupoForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.databaseService.altaGrupo(grupoData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el usuario fue creado
          console.log('Respuesta del servidor:', response); // Añade este log
          if (response && response['message'] == 'OK') {
            alert('Grupo creado con éxito');  // Se muestra un mensaje de éxito
            this.grupoForm.reset();  // Se resetea el formulario
            this.recuperarGrupos();  // Se actualiza la lista de usuarios
          }  else if (response && response['mensaje']) {
            alert('Error al modificar Grupo: ' + response['mensaje']);
        } else {
            alert('Error al modificar Grupo: Respuesta inesperada del servidor');
        }
        },
        error: (error) => {
          // En caso de error, se muestra un mensaje de error
          alert('Error al crear usuario');
          console.error('Error:', error);  // Se registra el error en la consola
        },
      });
    } else {
      // Si el formulario no es válido, se muestra un mensaje al usuario
      alert('Por favor, completa todos los campos correctamente');
    }
  }

  // Método para recuperar la lista de usuarios de la base de datos
  recuperarGrupos() {
    this.databaseService.recuperarGrupos().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
        if (Array.isArray(response)) {
          this.grupos = response;  // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.grupos = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar Grupos:', error);
      }
    });
  }

  bajaGrupos(idGrupo: number) {
    this.databaseService.bajaGrupo(idGrupo).subscribe({
      next: (response) => {
        if (response['message'] === 'OK') {
          alert('Grupo borrado con éxito');
          this.recuperarGrupos();
        } else {
          alert('Error al borrar Grupo');
        }
      },
      error: (error) => {
        console.error('Error al borrar Grupo:', error);
      }
    });
  }

}



