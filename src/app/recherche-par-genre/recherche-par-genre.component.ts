import { Component } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import {Genre} from '../model/genre.model';
import { VetementService } from '../services/vetement.service';
@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styleUrls: ['./recherche-par-genre.component.css']
})
export class RechercheParGenreComponent {
  vetements!: Vetement[]; 
  idG!:number;
  genre!:Genre[];
  

  constructor(private vetementService : VetementService) { }

  ngOnInit(): void {
    this.vetementService.listeGenre().
    subscribe(ge => {this.genre = ge._embedded.genres;
   // console.log("vetement:"+this.vetements);
   console.log("idG",this.idG);
  });
  }

  onChange(){
    this.vetementService.rechercherParGenre(this.idG).subscribe(vet =>{this.vetements=vet});
    console.log("vetement:"+this.vetements);
    console.log("idG"+this.idG);


  }


  
}
