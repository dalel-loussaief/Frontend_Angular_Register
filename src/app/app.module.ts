import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BindingComponent } from './binding/binding.component';
import { FormsModule } from '@angular/forms';
import { VetementsComponent } from './vetements/vetements.component';
import { AddVetementComponent } from './add-vetement/add-vetement.component';
import { UpdateVetementComponent } from './update-vetement/update-vetement.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeGenreComponent } from './liste-genre/liste-genre.component';
import { UpdateGenreComponent } from './update-genre/update-genre.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RegisterComponent } from './register/register.component';
import { VerifierEmailComponent } from './verifier-email/verifier-email.component';


@NgModule({
  declarations: [
    AppComponent,
    BindingComponent,
    VetementsComponent,
    AddVetementComponent,
    UpdateVetementComponent,
    RechercheParGenreComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeGenreComponent,
    UpdateGenreComponent,
    LoginComponent,
    ForbiddenComponent,
    RegisterComponent,
    VerifierEmailComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,
    HttpClientModule,
    //Ng2SearchPipeModule
  
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
