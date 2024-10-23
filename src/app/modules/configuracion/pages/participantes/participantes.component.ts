import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {

  // Este método se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    this.recuperarParticipantes(); // Al iniciar el componente, se recuperan los participantes de la base de datos
  }

  participanteForm: FormGroup; // Formulario reactivo para manejar los datos del participante
  participantes: any[] = []; // Variable para almacenar los participantes recuperados de la base de datos

  modificarParticipanteForm: FormGroup; // Formulario reactivo para manejar los datos del participante
  participanteSeleccionado: any = null; // Variable para almacenar los participante recuperados de la base de datos

  constructor(private databaseService: DatabaseService, private fb: FormBuilder) {
    this.participanteForm = this.fb.group({
      Apellido_Nombre: ['', Validators.required],
      DNI: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      Mail: ['', Validators.required],
    });

    //Formulario de modificacion de participantes
    this.modificarParticipanteForm = this.fb.group({
      Apellido_Nombre: ['', Validators.required],
      DNI: ['', Validators.required],
      Direccion: ['', Validators.required],
      Telefono: ['', Validators.required],
      Mail: ['', Validators.required],
    })
  }

  // Método para seleccionar un participante y llenar el formulario de modificación
  editarParticipante(participante: any) {
    this.participanteSeleccionado = participante;
    this.modificarParticipanteForm.patchValue({
      Apellido_Nombre: participante.Apellido_Nombre,
      DNI: participante.DNI,
      Direccion: participante.Direccion,
      Telefono: participante.Telefono,
      Mail: participante.Mail,
    })
  }

  // Método para enviar el formulario de modificación
  submitModificarForm() {
    if (this.modificarParticipanteForm.valid) {
      const participanteModificado = {
        ...this.participanteSeleccionado,
        ...this.modificarParticipanteForm.value
      };
      this.databaseService.modificarParticipantes(participanteModificado, participanteModificado.Id_Participante).subscribe({
        next: (response) => {
          if (response && response['message'] === 'OK') {
            alert('Participante modificado con éxito');
            this.participanteSeleccionado = null; // Ocultar el formulario después de modificar
            this.recuperarParticipantes(); // Actualizar la lista de usuarios
          } else {
            alert('Error al modificar Grupo: ' + (response['mensaje'] || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar participante');
          console.log(participanteModificado)
          console.error('Error:', error);
        },
      });
    }
  }


  // Método para manejar el envío del formulario
  submitForm() {
    // Solo continúa si el formulario es válido
    if (this.participanteForm.valid) {
      const participanteData = this.participanteForm.value;  // Se obtienen los valores del formulario
      // Se envían los datos al servicio para crear el nuevo usuario
      this.databaseService.altaParticipante(participanteData).subscribe({
        next: (response) => {
          // Si la respuesta es correcta y el servidor indica que el participante fue creado
          console.log('Respuesta del servidor:', response); // Añade este log
          if (response && response['message'] == 'OK') {
            alert('Participante creado con éxito');  // Se muestra un mensaje de éxito
            this.participanteForm.reset()  // Se resetea el formulario
            this.recuperarParticipantes();  // Se actualiza la lista de participantes
          } else if (response && response['mensaje']) {
            alert('Error al modificar participante: ' + response['mensaje']);
          } else {
            alert('Error al modificar participante: Respuesta inesperada del servidor');
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

  // Método para recuperar la lista de participantes de la base de datos
  recuperarParticipantes() {
    this.databaseService.recuperarParticipantes().subscribe({
      next: (response) => {
        // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'participantes'
        if (Array.isArray(response)) {
          this.participantes = response;  // Asigna los usuarios recibidos
        } else {
          console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
          this.participantes = [];  // Si la respuesta no es válida, se asigna un array vacío
        }
      },
      error: (error) => {
        // En caso de error al recuperar los usuarios, se registra en la consola
        console.error('Error al recuperar Grupos:', error);
      }
    });
  }

  bajaParticipantes(Id_Participante: number) {
    this.databaseService.bajaParticipantes(Id_Participante).subscribe({
      next: (response) => {
        if (response['message'] === 'OK') {
          alert('Participante borrado con éxito');
          this.recuperarParticipantes();
        } else {
          alert('Error al borrar Participante');
        }
      },
      error: (error) => {
        console.error('Error al borrar Participante:', error);
      }
    });
  }
}
