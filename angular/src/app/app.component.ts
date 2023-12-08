import { Component, OnInit } from '@angular/core';
import { Pokemon } from './pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  appName:string = 'fundamentals-app';
  angularLogo:string = "https://angular.io/assets/images/logos/angular/angular.svg"
  title: string = 'Mi Aplicación Angular';

  btnDisabled:boolean = true
  email:string = "edu@eml.run"

  mostrarAlerta() {
    alert("Alerta ⚠️")
  }

  contadorOvejas:number = 0

  contarOveja() {
    this.contadorOvejas += 1
  }

  establecerOvejas(event: Event) {
    const element = event.target as HTMLInputElement;

    try {
      const numeroOvejas: number = parseInt(element.value);
      if (numeroOvejas > 0) {
        this.contadorOvejas = numeroOvejas;
      }
    } catch {
      console.log('No es un número');
    }
  }

  persona:any = {
    nombre: ''
  }

  listaPersonas: string[] = []

  agregarPersona():void {
    this.listaPersonas.push(this.persona.nombre)
    this.persona.nombre = ''
  }

  borrarPersona(index: number):void {
    this.listaPersonas.splice(index, 1)
  }

  miPokedex: Pokemon[] = [];

  nuevoPokemon: string = '';

  ngOnInit(): void {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${Math.floor(Math.random() * 501)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results)
        this.miPokedex = data.results;
  
        // Para cada Pokémon, realiza una nueva solicitud para obtener más detalles, incluida la URL de la imagen.
        this.miPokedex.forEach(pokemon => {
          fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonDetails) => {
              // Asigna la URL de la imagen al Pokémon correspondiente
              pokemon.imageURL = pokemonDetails.sprites.front_default;
            });
        });
      });
  }
}   
