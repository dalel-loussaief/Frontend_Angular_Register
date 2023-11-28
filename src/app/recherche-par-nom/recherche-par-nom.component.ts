import { Component } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { Observable } from 'rxjs/internal/Observable';
import { VetementService } from '../services/vetement.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  styleUrls: ['./recherche-par-nom.component.css']
})
export class RechercheParNomComponent {
  vetements!: Vetement[]; 
  nomvetement!:string;
  allvetemets! : Vetement[];
  searchTerm!:string;
  constructor(private vetementService : VetementService){}
  ngOnInit():void{
    this.vetementService.listVetement().subscribe(v => {
      console.log(v);
      this.vetements = v;
      });
      
  }

    rechercherVets(){
     
        this.vetementService.rechercherParNom(this.nomvetement).
        subscribe(v => {
        this.vetements = v;
        console.log(v)});
        
    }
    onKeyUp(filterText : string){
      this.vetements= this.allvetemets.filter(item =>
      item.nomVetement.toLowerCase().includes(filterText));
      }
}
