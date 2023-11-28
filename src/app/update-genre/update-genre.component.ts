import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Genre } from '../model/genre.model';
import { VetementService } from '../services/vetement.service';

@Component({
  selector: 'app-update-genre',
  templateUrl: './update-genre.component.html',
  styleUrls: ['./update-genre.component.css']
})
export class UpdateGenreComponent implements OnInit{

  @Input()
  genres! : Genre;
  @Output() 
  genreUpdated = new EventEmitter<Genre>();
  
  @Input()
  ajout!:boolean;



  constructor(private vetementService : VetementService){

  }
  saveGenre(){
  this.genreUpdated.emit(this.genres);
  }

  ngOnInit(): void {
     // console.log(this.genres);
      console.log("ngOnInit du composant Updategenre ",this.genres);
  }
}
