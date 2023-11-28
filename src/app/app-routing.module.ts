import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VetementsComponent } from './vetements/vetements.component';
import { AddVetementComponent } from './add-vetement/add-vetement.component';
import { UpdateVetementComponent } from './update-vetement/update-vetement.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenreComponent } from './liste-genre/liste-genre.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { VetementGuard } from './vetement.guard';
import { RegisterComponent } from './register/register.component';
import { VerifierEmailComponent } from './verifier-email/verifier-email.component';

const routes: Routes = [
  {path : "vetements", component: VetementsComponent},
  {path : "add-vetement", component:AddVetementComponent},
  {path : "updateVetement/:id", component:UpdateVetementComponent},
  {path: "", redirectTo: "vetements", pathMatch: "full" },
  {path: "rechercheParGenre", component : RechercheParGenreComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeGenre", component : ListeGenreComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path : "add-vetement", component : AddVetementComponent, canActivate:[VetementGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'verifierEmail', component: VerifierEmailComponent},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
