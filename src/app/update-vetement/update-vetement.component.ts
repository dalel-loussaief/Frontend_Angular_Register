import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VetementService } from '../services/vetement.service';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-update-vetement',
  templateUrl: './update-vetement.component.html',
  styleUrls: ['./update-vetement.component.css']
})
export class UpdateVetementComponent implements OnInit{
  currentVetement = new Vetement();
  genre! : any;
  updatedgeId! : number;
  newVetement: any;
  idG!:number;
  myImage! : string;
  uploadedImage!: File;
isImageUpdated: Boolean=false;

constructor(private activatedRoute :ActivatedRoute,
  private router :Router,
private vetementService : VetementService){}

  ngOnInit(){
    //this.genre=this.vetementService.listeGenre();
   // this.vetementService.consulterGenre(this.activatedRoute.snapshot.params['id']);
    //this.updatedgeId=this.currentVetement.genre.idG;//pour afficher les attribues de la modifications 
    /*console.log(this.activatedRoute.snapshot.params['id']);
   this.currentVetement = this.vetementService.consulterVetement(this.activatedRoute.snapshot. params['id']);
    console.log(this.currentVetement);*/
//version2//
   /*  this.vetementService.listeGenre().
    subscribe(ges => {this.genre = ges._embedded.genres;
    console.log(ges);
    });
    this.vetementService.consulterVetement(this.activatedRoute.snapshot.params['id']).subscribe( v =>{ this.currentVetement = v;
      this.updatedgeId = this.currentVetement.genre.idG;
      this.vetementService
      .loadImage(this.currentVetement.image.idImage)
      .subscribe((img: Image) => {
      this.myImage = 'data:' + img.type + ';base64,' + img.image;
      }); 
       } ) ; */
   
        this.vetementService.listeGenre().
        subscribe(v => {
          this.genre = v;
        });
        this.vetementService.consulterVetement(this.activatedRoute.snapshot.params['id'])
        .subscribe( vet =>{ this.currentVetement = vet;
        this.updatedgeId = vet.genre.idG;
        console.log(this.currentVetement.idG);
        } ) ;
       
        
  }
  updateVetement(){
    //this.currentVetement.genre=this.vetementService.consulterGenre(this.updatedgeId);
  // this.vetementService.updateVetement(this.currentVetement);
   //this.router.navigate(['vetements']);
  //version2//
  /*  this.currentVetement.genre = this.genre.find(g => g.idG == this.updatedgeId)!;
   this.vetementService.updateVetement(this.currentVetement).subscribe(v => {
    this.router.navigate(['vetements']); }
    ); */

    //version3//
    /*  this.currentVetement.genre = this.genre.find((cat:any) => cat.idG == 
      this.updatedgeId)!;
      //tester si l'image du produit a été modifiée
      if (this.isImageUpdated)
      { 
      this.vetementService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.currentVetement.image = img;
      this.vetementService
      .updateVetement(this.currentVetement)
      .subscribe((prod) => {
      this.router.navigate(['vetements']);
      });
      });
      }
      else{ 
      this.vetementService
      .updateVetement(this.currentVetement)
      .subscribe((prod) => {
      this.router.navigate(['vetements']);
      });
      }  */
      //la methode qui s'marche//
      this.currentVetement.genre = this.genre.find((v: any) => v.idG == 
        this.updatedgeId)!; 
        this.vetementService
        .updateVetement(this.currentVetement)
        .subscribe((v) => {
        this.router.navigate(['vetements']);
        }); 
         
 
  }


  onImageUpload(event: any) {
    if(event.target.files && event.target.files.length) {
    this.uploadedImage = event.target.files[0];
    this.isImageUpdated =true;
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = () => { this.myImage = reader.result as string; };
    }
    }




    onAddImageVetement() {
      this.vetementService
      .uploadImageVet(this.uploadedImage, 
      this.uploadedImage.name,this.currentVetement.idVetement)
      .subscribe( (img : Image) => {
      this.currentVetement.images.push(img);
      });
      }
      supprimerImage(img: Image){
        let conf = confirm("Etes-vous sûr ?");
        if (conf)
        this.vetementService.supprimerImage(img.idImage).subscribe(() => {
        //supprimer image du tableau currentProduit.images 
        const index = this.currentVetement.images.indexOf(img, 0);
        if (index > -1) {
        this.currentVetement.images.splice(index, 1);
        }
        });
        
}}

