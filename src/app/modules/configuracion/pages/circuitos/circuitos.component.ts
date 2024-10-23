import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/database.service';

@Component({
  selector: 'app-circuitos',
  templateUrl: './circuitos.component.html',
  styleUrls: ['./circuitos.component.css']
})
export class CircuitosComponent implements OnInit {
  circuitoForm: FormGroup;  // Formulario reactivo para crear circuitos
  modificarCircuitoForm: FormGroup;  // Formulario reactivo para modificar circuitos
  circuitos: any[] = [];  // Variable para almacenar los circuitos recuperados
  circuitoSeleccionado: any = null;  // Circuito seleccionado para modificar

  constructor(private fb: FormBuilder, private databaseService: DatabaseService) {
    // Inicializamos el formulario de creación de circuitos
    this.circuitoForm = this.fb.group({
      Nombre_Circuito: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Ubicacion: ['', Validators.required],
      Id_MapaGoogle: ['', Validators.required],
      Distancia_H: [0, Validators.required],
    });

    // Inicializamos el formulario de modificación de circuitos
    this.modificarCircuitoForm = this.fb.group({
      Nombre_Circuito: ['', Validators.required],
      Descripcion: ['', Validators.required],
      Ubicacion: ['', Validators.required],
      Id_MapaGoogle: ['', Validators.required],
      Distancia_H: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.recuperarCircuitos();  // Recuperar la lista de circuitos al inicializar el componente
    
  }

  // Método para manejar el envío del formulario para crear un circuito
  submitForm() {
    const circuitoData = this.circuitoForm.value;
  
    // Formatear Distancia_H a dos decimales antes de enviarlo
    circuitoData.Distancia_H = parseFloat(circuitoData.Distancia_H).toFixed(2);
  
    if (this.circuitoForm.valid) {
      // Aquí ya tienes circuitoData con Distancia_H formateado
      this.databaseService.altaCircuito(circuitoData).subscribe({
        next: (response) => {
          if (response && response.message === 'OK') {
            alert('Circuito creado con éxito');
            this.circuitoForm.reset();  // Resetea el formulario
            this.recuperarCircuitos();  // Actualiza la lista de circuitos
          } else {
            alert('Error al crear Circuito: ' + (response.mensaje || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al crear circuito');
          console.error('Error:', error);
        },
      });
    } else {
      alert('Por favor, completa todos los campos correctamente');
    }
  }
  
  // Método para seleccionar un circuito y poblar el formulario de modificación
  editarCircuito(circuito: any) {
    this.circuitoSeleccionado = circuito;
    const distanciaFormateada = parseFloat(circuito.Distancia_H).toFixed(2);
    this.modificarCircuitoForm.patchValue({
      Nombre_Circuito: circuito.Nombre_Circuito,
      Descripcion: circuito.Descripcion,
      Ubicacion: circuito.Ubicacion,
      Id_MapaGoogle: circuito.Id_MapaGoogle,
      Distancia_H: distanciaFormateada,

      
    });
  }

  // Método para manejar el envío del formulario de modificación
  submitModificarForm() {
   
    if (this.modificarCircuitoForm.valid) {
      const circuitoModificado = {
        ...this.circuitoSeleccionado,
        ...this.modificarCircuitoForm.value
      };
      circuitoModificado.Distancia_H = parseFloat(circuitoModificado.Distancia_H).toFixed(2);
      this.databaseService.modificarCircuito(circuitoModificado, circuitoModificado.Id_Circuitos).subscribe({
        next: (response) => {
          if (response && response.message === 'OK') {
            alert('Circuito modificado con éxito');
            this.circuitoSeleccionado = null;  // Oculta el formulario de modificación
            this.recuperarCircuitos();  // Actualiza la lista de circuitos
          } else {
            alert('Error al modificar Circuito: ' + (response.mensaje || 'Error desconocido'));
          }
        },
        error: (error) => {
          alert('Error al modificar circuito');
          console.error('Error:', error);
        },
      });
    }
  }

  // Método para recuperar la lista de circuitos de la base de datos
  recuperarCircuitos() {
    this.databaseService.recuperarCircuitos().subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.circuitos = response;  // Asigna la lista de circuitos
        } else {
          console.error('La respuesta del servidor no es un array:', response);
          this.circuitos = [];  // Asigna un array vacío si la respuesta no es válida
        }
      },
      error: (error) => {
        console.error('Error al recuperar circuitos:', error);
      }
    });
  }

  // Método para borrar un circuito
  bajaCircuito(Id_Circuitos: any) {
    this.databaseService.bajaCircuito(Id_Circuitos).subscribe({
      next: (response) => {
        if (response.message === 'OK') {
          alert('Circuito borrado con éxito');
          this.recuperarCircuitos();  // Actualiza la lista de circuitos
        } else {
          alert('Error al borrar Circuito');
        }
      },
      error: (error) => {
        console.error('Error al borrar Circuito:', error);
      }
    });
  }
}
