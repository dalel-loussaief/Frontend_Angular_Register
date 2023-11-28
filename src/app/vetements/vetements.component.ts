import { Component, OnInit } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { VetementService } from '../services/vetement.service';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-vetements',
  templateUrl: './vetements.component.html',

})
export class VetementsComponent implements OnInit{
  
  //vetements!: Vetement[]; 

  vetements?: Vetement[]; 
  apiurl: string = 'http://localhost:8080/vetement/api';


    constructor(private vetementService : VetementService,public authService: AuthService,public router:Router){
      //this.vetements=vetementService.listVetement();
     
    
  }
  ngOnInit(): void {
    //this.vetements=this.vetementService.listVetement();
   /* this.vetementService.listVetement().subscribe(vet => {
      console.log(vet);
      this.vetements = vet;
      });*/
      this.chargerVetements();
  }

    chargerVetements(){
  /* this.vetementService.listVetement().subscribe(vets => {
    console.log(vets);
    this.vetements = vets;


    this.vetements.forEach((prod) => {
      this.vetementService
      .loadImage(prod.image.idImage)
      .subscribe((img: Image) => {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' + 
        prod.images[0].image;
      });
      }); 
      });  */
     
    this.vetementService.listVetement().subscribe(prods => {
        this.vetements = prods;
        this.vetements.forEach((prod) => {
        prod.imageStr = 'data:' + prod.images[0].type + ';base64,' + 
        prod.images[0].image;
        }); 
        }) 
       
    }  

  supprimerVetement(v: Vetement)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.vetementService.supprimerVetement(v.idVetement).subscribe(() => {
  console.log("vetement supprimé");
  this.chargerVetements();
  }); 
 
  } 



}

   
