import { Component, Input, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { VetementService } from '../services/vetement.service';

@Component({
  selector: 'app-liste-genre',
  templateUrl: './liste-genre.component.html',
  styleUrls: ['./liste-genre.component.css']
})
export class ListeGenreComponent  implements OnInit {
genres!:any;

updatedge:Genre = {
  "idG": 0, "nom": "",
  description: '',
  taille: ''
};

@Input()
ajout:boolean=true;



genreUpdated(ge:Genre){
console.log("genre recue du compo update genre",ge);
this.vetementService.ajouterGenre(ge).
 subscribe( ()=> this.chargerGenre());
}
constructor(private vetementService : VetementService) { }

ngOnInit(): void {
  this.vetementService.listeGenre().
  subscribe(ge => {this.genres = ge._embedded.genres;
  console.log(ge);
  });
  }
  chargerGenre(){
    this.vetementService.listeGenre().
    subscribe(ge => {this.genres = ge._embedded.genres;
    console.log(ge);
});

  }
  updatege(ge:Genre){
this.updatedge=ge;
this.ajout=false;
  }
}
