import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { FirebaseService } from './firebase.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { resolve, reject } from 'q';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseService: FirebaseService,
    private afAuth: AngularFireAuth
  ) { }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  doLoginFb() {
    var fbProvider = new firebase.auth.FacebookAuthProvider();
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithPopup(fbProvider).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  doLoginGg() {
    var ggProvider = new firebase.auth.GoogleAuthProvider();
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithPopup(ggProvider).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signOut().then(() => {
        this.firebaseService.unsubscribeOnLogOut();
        resolve();
      }).catch((error) => {
        console.log(error);
        reject();
      });
    })
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
}
