import { Injectable, OnInit } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Router, ActivatedRoute } from '@angular/router';
import PouchDB from 'pouchdb';


@Injectable()
export class AuthenticationService implements OnInit {
    logindb: any
    patientdb: any
    constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
        this.patientdb = new PouchDB('patientdb')
    }


    ngOnInit() {
        
        //this.logout()
    }

    login(username, password) {

        let body = JSON.stringify({ username: 'gulshan.saluja@healthcoco.com', password: 'd0f751bed066b71dfcb7f306bd719d5839632bb275975afdcd4df2ee1a25a3e5' });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic aGVhbHRoY29jb0AyNTo2QUU4R1NXMUQ3QUVSM0RG');
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://52.66.106.88/dpdocter/api/v1/login/user', body, options)
            .map((response: Response) => {
                let user = response.json();
                return user
            })


    }

    logout(){

       this.patientdb.destroy().then(function (response) {
            console.log(response)
        }).catch(function (err) {
            console.log(err);
        })
    }
}


        // this.logindb.find({
        //     selector: { _id: { $eq: username }, password: { $eq: password } }
        // }).then((result) => {
        //     if (result.docs.length === 1) {
        //         console.log("welcome");
        //         // console.log(result)
        //         localStorage.setItem('currentUser', JSON.stringify(result))
        //         this.router.navigate([this.returnUrl]);
        //     }
        //     else {
        //         console.log(" Incorrect Credentials !");

        //     }
        // }).catch(function (err) {
        //    console.log(err);
        // });Authorization: "Basic aGVhbHRoY29jb0AxNjoxR1dMRjlPUk1LOUI4UUZW\n"

        //sha3 256