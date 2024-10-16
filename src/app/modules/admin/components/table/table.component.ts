import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
    usuarioForm: FormGroup;  // Formulario reactivo para manejar los datos del usuario
    usuarios: any[] = [];  // Variable para almacenar los usuarios recuperados de la base de datos
  
    modificarUsuarioForm: FormGroup; // Formulario para modificar usuario
    usuarioSeleccionado: any = null; // Variable para almacenar el usuario seleccionado
  
    constructor(private databaseService: DatabaseService, private fb: FormBuilder) {
      // Inicializamos el formulario con tres campos: username, mail y password
      this.usuarioForm = this.fb.group({
        username: ['', Validators.required],  // Campo obligatorio
        mail: ['', [Validators.required, Validators.email]],  // Campo obligatorio y validación de formato de email
        password: ['', [Validators.required, Validators.minLength(6)]],  // Campo obligatorio con longitud mínima de 6 caracteres
      });
  
       // Formulario de modificación de usuarios
      this.modificarUsuarioForm = this.fb.group({
        username: ['', Validators.required],
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    }
    
     // Método para seleccionar un usuario y poblar el formulario de modificación
     editarUsuario(usuario: any) {
      this.usuarioSeleccionado = usuario;
      this.modificarUsuarioForm.patchValue({
        username: usuario.username,
        mail: usuario.mail,
        password: usuario.password
      });
    }
  
    // Método para enviar el formulario de modificación
    submitModificarForm() {
      if (this.modificarUsuarioForm.valid) {
        const usuarioModificado = {
          ...this.usuarioSeleccionado,
          ...this.modificarUsuarioForm.value
        };
        this.databaseService.modificar(usuarioModificado, usuarioModificado.userId).subscribe({
          next: (response) => {
            if (response && response['message'] === 'OK') {
              alert('Usuario modificado con éxito');
              this.usuarioSeleccionado = null; // Ocultar el formulario después de modificar
              this.recuperarUsuarios(); // Actualizar la lista de usuarios
            } else {
              alert('Error al modificar usuario: ' + (response['mensaje'] || 'Error desconocido'));
            }
          },
          error: (error) => {
            alert('Error al modificar usuario');
            console.log(usuarioModificado)
            console.error('Error:', error);
          },
        });
      }
    }
  
  
    // Este método se ejecuta cuando el componente se inicializa
    ngOnInit(): void {
      this.recuperarUsuarios();  // Al iniciar el componente, se recuperan los usuarios de la base de datos
    }
  
    // Método para manejar el envío del formulario
    submitForm() {
      // Solo continúa si el formulario es válido
      if (this.usuarioForm.valid) {
        const usuarioData = this.usuarioForm.value;  // Se obtienen los valores del formulario
        // Se envían los datos al servicio para crear el nuevo usuario
        this.databaseService.alta(usuarioData).subscribe({
          next: (response) => {
            // Si la respuesta es correcta y el servidor indica que el usuario fue creado
            console.log('Respuesta del servidor:', response); // Añade este log
            if (response && response['message'] == 'OK') {
              alert('Usuario creado con éxito');  // Se muestra un mensaje de éxito
              this.usuarioForm.reset();  // Se resetea el formulario
              this.recuperarUsuarios();  // Se actualiza la lista de usuarios
            }  else if (response && response['mensaje']) {
              alert('Error al modificar usuario: ' + response['mensaje']);
          } else {
              alert('Error al modificar usuario: Respuesta inesperada del servidor');
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
    recuperarUsuarios() {
      this.databaseService.recuperarUsuarios().subscribe({
        next: (response) => {
          // Verificamos que la respuesta sea un array antes de asignarlo a la variable 'usuarios'
          if (Array.isArray(response)) {
            this.usuarios = response;  // Asigna los usuarios recibidos
          } else {
            console.error('La respuesta del servidor no es un array:', response);  // Muestra error si no es un array
            this.usuarios = [];  // Si la respuesta no es válida, se asigna un array vacío
          }
        },
        error: (error) => {
          // En caso de error al recuperar los usuarios, se registra en la consola
          console.error('Error al recuperar usuarios:', error);
        }
      });
    }
  
    bajaUsuario(userId: number) {
      this.databaseService.baja(userId).subscribe({
        next: (response) => {
          if (response['message'] === 'OK') {
            alert('Usuario borrado con éxito');
            this.recuperarUsuarios();
          } else {
            alert('Error al borrar usuario');
          }
        },
        error: (error) => {
          console.error('Error al borrar usuario:', error);
        }
      });
    }
  
}