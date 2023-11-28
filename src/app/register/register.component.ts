import { Component } from '@angular/core';
import { User } from '../model/User.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = new User();
  err:number = 0;
  success:number = 0;
  loading= false;
  toastr: any;
  confirmPassword?:string;
  myForm!: FormGroup;


  constructor(
    private authService : AuthService,
    private router: Router, private formBuilder: FormBuilder) {
    
   }

  ngOnInit(): void {this.myForm = this.formBuilder.group({
   
    username : ['', [Validators.required]],
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword : ['', [Validators.required]],
    validators: this.emailConfirmationValidator // Add custom validator for email confirmation
 } )
  }

  emailConfirmationValidator(control: AbstractControl): { [email: string]: boolean } | null {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');

    if (email && confirmEmail && email.value !== confirmEmail.value) {
      return { 'emailMismatch': true };
    }

    return null;
  }

  register() {
    this.authService.registerUser(this.user).subscribe({
      next : (data)=>{
        //this.success=1;
        console.log(JSON.stringify(data));
        this.router.navigate(['/verifierEmail'], {
          queryParams: { email: this.user.email },
        });
      },error:(err:any)=>{
        this.err = 1; 
        console.error('register failed:', err);
      }
    });

     //console.log(this.user);
//  this.loading=true;
//  this.authService.registerUser(this.user).subscribe({
//    next:(res)=>{
//      console.log(res);
//      this.authService.setRegistredUser(this.user);
//      this.loading=false;
//     // alert("veillez confirmer votre email");
//     this.toastr.success('veillez confirmer votre email', 'Confirmation');
  
//      this.router.navigate(["/verify-code"]);

//    },
//    error:(err:any)=>{
//      if(err.status=400){
//        this.err= err.error.message;
//        this.loading=false;
//         }
//    }
//  }
//  )
  }

}
