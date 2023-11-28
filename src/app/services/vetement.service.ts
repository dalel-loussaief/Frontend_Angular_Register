import { Injectable } from '@angular/core';
import { Vetement } from '../model/vetement.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { gerneWrapper } from '../model/genreWrapped.model';
import { apiURL } from '../config';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';
const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
  };
@Injectable({
  providedIn: 'root'
})
export class VetementService {

  apiURL: string = "http://localhost:8080/vetements/api";
  apiURLge: string = "http://localhost:8080/vetements/ge";
  allGendersURL: string = "http://localhost:8080/vetements/api/ge";



 vetements!: Vetement[];
  genre: any;

//genre!:Genre[];
  constructor(private http : HttpClient,private authService : AuthService) {


   }

 
  listVetement(): Observable<Vetement[]>{
   // let token = this.authService.getToken();
  
    // return this.http.get<Vetement[]>(this.apiURL, { headers: headers });
 
    //return this.http.get<Vetement[]>(this.apiURL, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')?.toString()}`}});
   return this.http.get<Vetement[]>(this.apiURL);
    }
    
ajouterVetement(vet: Vetement):Observable<Vetement>{
/*   let token = this.authService.getToken();
  token = "Bearer " + token;
  let headers = new HttpHeaders({'Authorization': token}); */

   // return this.http.post<Vetement>(this.apiURL + '/addvet', vet, { headers: headers });
  return this.http.post<Vetement>(this.apiURL, vet, httpOptions);
  }


supprimerVetement(id:number){

const url = `${this.apiURL}/${id}`;
  return this.http.delete(url, httpOptions);
  /*  const url = `${apiURL}/delvet/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
          return this.http.delete(url,  {headers:httpHeaders}); */
}

  consulterVetement(id: number): Observable<Vetement> {
  /*   const url = `${this.apiURL}/${id}`;
    return this.http.get<Vetement>(url); */
    const url = `${apiURL}/${id}`;
          console.log(url);
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt}) 
            return this.http.get<Vetement>(url,{headers:httpHeaders}); 
    }
 
  updateVetement(v:Vetement) : Observable<Vetement>{
   /* let token = this.authService.getToken();
    token = "Bearer " + token;
    let headers = new HttpHeaders({'Authorization': token});
  
      return this.http.put<Vetement>(this.apiURL + '/updatevet', v, { headers: headers });  */
    return this.http.put<Vetement>(this.apiURL, v, httpOptions);
}

  trierVetements(){
    this.vetements = this.vetements.sort((n1,n2) => {
    if(n1 .idVetement > n2.idVetement) {
    return 1;
    }
    if (n1.idVetement < n2.idVetement) {
    return -1;
    }
    return 0;
    });
    }
 
    listeGenre():Observable<gerneWrapper>{
       let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return  this.http.get<gerneWrapper>(this.allGendersURL,{headers:httpHeaders}); 
     // return this.http.get<gerneWrapper>(this.apiURLge);
      }
     
        
      /* consulterGenre(id:number): Genre{
      return this.genre.find(ge => ge.idG == id)!;
      } */ 
      rechercherParGenre(idG: number):Observable< Vetement[]> {
    
      
       const url = `${this.apiURL}/vetGen/${idG}`;
 
       return this.http.get<Vetement[]>(url);
        }
        rechercherParNom(nom: string):Observable< Vetement[]> {
          const url = `${this.apiURL}/vetByName/${nom}`;
          return this.http.get<Vetement[]>(url);
          } 

          ajouterGenre(ge: Genre):Observable<Genre>{
            return this.http.post<Genre>(this.apiURLge, ge, httpOptions);
            }


            uploadImage(file: File, filename: string): Observable<Image>{
              const imageFormData = new FormData();
              imageFormData.append('image', file, filename);
              const url = `${apiURL + '/image/upload'}`;
              return this.http.post<Image>(url, imageFormData);
              }
              
              loadImage(id: number): Observable<Image> {
              const url = `${this.apiURL + '/image/get/info'}/${id}`;
              return this.http.get<Image>(url);
              }
              uploadImageVet(file: File, filename: string, idVet:number): Observable<any>{
                const imageFormData = new FormData();
                imageFormData.append('image', file, filename);
                const url = `${this.apiURL + '/image/uplaodImageVet'}/${idVet}`;
                return this.http.post(url, imageFormData);
                }
                supprimerImage(id : number) {
                  const url = `${this.apiURL}/image/delete/${id}`;
                  return this.http.delete(url, httpOptions);
                  }
}
