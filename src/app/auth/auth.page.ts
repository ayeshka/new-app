import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController, ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Auth } from './auth.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
loadAuth: Auth[];
private authSub: Subscription;
x: number;
isLoading = false;
isLoging = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    public alertController: AlertController,
    private modalController: ModalController,
    private navCtrl: NavController,
    public loadingController: LoadingController
       ) { }

  ngOnInit() {
    // this.authSub = this.authService.auth.subscribe(auth => {
    //   this.loadAuth = auth;
    // })
  }

// onLogin() {

 
//  }
dismissLogin() {
  this.modalController.dismiss();
}

//  ionViewWillEnter() {
//   this.authService.fetchHome().subscribe();
// }

 onSubmit(form: NgForm) {
console.log(form);
if (!form.valid) {
  return;
}
 const email = form.value.email;
 const password = form.value.password;
// console.log(user, password);
// for ( this.x = 0; this.x < this.loadAuth.length; this.x++ ){
//   console.log(this.x);
//   if (user === this.loadAuth[this.x].user && password === this.loadAuth[this.x].password) {
    
//     this.isLoading = true;
//     // this.authService.login();
  
//     this.loadingCtrl.create({keyboardClose: true, message: 'logging in..'})
//     .then(loadingEl => {
//       loadingEl.present();
//       setTimeout(() => {
//         this.isLoading = false;
//         loadingEl.dismiss();
//         this.router.navigateByUrl('/salary');
//       }, 1500);
//     });

    
//   }
  // if else (user !== this.loadAuth[this.x].user || password !== this.loadAuth[this.x].password){
  //   console.log('hello password');
    
  //   const alert = this.alertController.create({
  //     message: 'Should be a valid User Name',
  //     subHeader: 'Notification',
  //     buttons: ['Calcle']}).then( alert=> alert.present());
    
  // }

  
this.authService.login(email, password).subscribe(
    data => {
      this.isLoading = true;
    },
    error => {
      console.log(error);
      console.log('password is not cureect');
    },
    () => {
      this.dismissLogin();
      this.navCtrl.navigateRoot('/salary');
    }
  );


 }

}
