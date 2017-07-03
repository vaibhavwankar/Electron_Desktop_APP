import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from '../../services/index';



@Component({
    selector: 'login',
    templateUrl: './app/components/login/login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    returnUrl: string;
    patientdb
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private userservice: UserService,) { 
        }

    ngOnInit() {
       //this.authenticationService.logout()
    }

    login() {

         
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                //console.log(data)
                this.userservice.set(data)
                //console.log(data.data.hospitals[0].locationsAndAccessControl[0].hospitalId)
                let hospitalId=data.data.hospitals[0].locationsAndAccessControl[0].hospitalId
                let locationId=data.data.hospitals[0].locationsAndAccessControl[0].id
                this.userservice.getpatients(hospitalId,locationId)
                .subscribe(res=>{
                    this.router.navigate(['home']);
                })
                

            },
            error => {

                console.log(error)
            })
         
    }
}
