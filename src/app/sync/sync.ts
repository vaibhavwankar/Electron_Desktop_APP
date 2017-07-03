import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { UserService } from '../services/index'

import PouchDB from 'pouchdb';


@Injectable()

export class sync {

    patientdb: any

    constructor(private http: Http, private userservice: UserService) {
        this.patientdb = new PouchDB('patientdb')
    }

    createnewpatientsync(result) {
        console.log("syncing")
        for (var i in result.rows) {
            if (result.rows[i].doc.previous_rev == "0" && !(result.rows[i].doc.deleted) && result.rows[i].doc.userId == "0") {
                console.log("new patient => " + result.rows[i].doc.firstName)
                this.create(result.rows[i]).subscribe(data => {
                    this.updatelocal(result.rows[i].doc, data)
                }
                )

            }
            else if ((result.rows[i].doc.previous_rev < result.rows[i].doc._rev) && result.rows[i].doc.previous_rev !="-1" && !(result.rows[i].doc.deleted)) {
                console.log("updated patient => " + result.rows[i].doc.firstName)
                this.update(result.rows[i]).subscribe(data => {
                    this.updaterev(result.rows[i].doc)
                })
            }
            else if (result.rows[i].doc.deleted) {
                console.log("deleted patient => " + result.rows[i].doc.firstName)
            }
        }

    }

    updatelocal(data, userId) {

        this.patientdb.get(data._id).then((doc) => {
            doc.userId = userId,
                doc.previous_rev = "-1",
                (this.patientdb.put(doc));
        }).catch(err => {
            console.log(err)
        })


        this.patientdb.find({
            selector: { _id: { $eq: data._id } }
        }).then(function (result) {
            console.log(result)

        }).catch(function (err) {
            console.log(err)
        });

    }
    updaterev(data) {

        this.patientdb.get(data._id).then((doc) => {
            doc.previous_rev = "-1",
                (this.patientdb.put(doc));
        }).catch(err => {
            console.log(err)
        })


        this.patientdb.find({
            selector: { _id: { $eq: data._id } }
        }).then(function (result) {
            console.log(result)

        }).catch(function (err) {
            console.log(err)
        });
    }
    create(data) {

        let id = this.userservice.get()
        let body = {
            firstName: data.doc.firstName,
            localPatientName: data.doc.firstName,
            mobileNumber: data.doc.mobileNumber,
            gender: '',
            dob: {
                days: 0,
                months: 0,
                years: 0,
                age: {
                    days: 0,
                    months: 0,
                    years: 0
                }
            },
            age: '',
            emailAddress: data.doc.emailAddress == null ? "" : data.doc.emailAddress,
            groups: [],
            bloodGroup: '',
            profession: '',
            relations: [
                {
                    name: '',
                    relation: 'Relation'
                }
            ],
            secMobile: "",
            adhaarId: data.doc.adhaarId == null ? "" : data.doc.adhaarId,
            panCardNumber: "",
            drivingLicenseId: "",
            insuranceId: '',
            insuranceName: '',
            notes: null,
            address: {
                country: 'india',
                city: '',
                state: '',
                postalCode: '',
                locality: '',
                latitude: '',
                longitude: '',
                streetAddress: ''
            },
            dateOfVisit: 1498549967,
            patientNumber: null,
            referredBy: null,
            locationId: id.data.hospitals[0].locationsAndAccessControl[0].id,
            hospitalId: id.data.hospitals[0].locationsAndAccessControl[0].hospitalId,
            doctorId: id.data.user.id,
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', 'Basic aGVhbHRoY29jb0AyNTo2QUU4R1NXMUQ3QUVSM0RG');
        let options = new RequestOptions({ headers: headers });

        //console.log(body)
        return this.http
            .post('http://52.66.106.88/dpdocter/api/v1/register/patient', body, options)
            .map((response) => {
                var ret = response.json()

                //console.log(ret.data.userId)

                return ret.data.userId
            })

    }


    update(d) {
        //console.log(d)
        let data = d.doc
        //console.log(data)
        let id = this.userservice.get()
        // console.log(data.locationId)

        let body = {
            userId: data.userId,
            firstName: data.firstName,
            localPatientName: data.firstName,
            mobileNumber: data.mobileNumber,
            gender: '',
            groups: [],
            bloodGroup: '',
            profession: '',
            relations: [
                {
                    name: '',
                    relation: "Relation"
                }
            ],
            secMobile: '',
            adhaarId: data.adhaarId == null ? "" : data.adhaarId,
            panCardNumber: '',
            age: '',
            emailAddress: '',
            drivingLicenseId: '',
            insuranceId: '',
            insuranceName: '',
            notes: null,
            dateOfVisit: 1498287613,
            patientNumber: null,
            referredBy: null,
            locationId: id.data.hospitals[0].locationsAndAccessControl[0].id,
            hospitalId: id.data.hospitals[0].locationsAndAccessControl[0].hospitalId,
            doctorId: id.data.user.id,
            dob: {
                days: 0,
                months: 0,
                years: 0,
                age: {
                    days: 0,
                    months: 0,
                    years: 0
                }
            },
            address: {
                country: 'india',
                city: '',
                state: '',
                postalCode: '',
                locality: '',
                latitude: '',
                longitude: '',
                streetAddress: ''
            },

        }

        //console.log(body)
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic aGVhbHRoY29jb0AyNTo2QUU4R1NXMUQ3QUVSM0RG',
        });
        let options = new RequestOptions({ headers: headers });

        return this.http
            .post('http://52.66.106.88/dpdocter/api/v1/register/patient', body, options)
            .map((response: Response) => {

                console.log(response)
            })




    }





}






// constructor(private router: Router) {
    //     this.router.events
    //         .filter(event => event instanceof NavigationEnd)
    //         .subscribe((event) => {
    //             if (router.url == '/home/dashboard' || router.url == '/home/create') {

    //                 if (navigator.onLine) {
    //                     console.log('online');
    //                 } else {
    //                     console.log('offline');
    //                 }
    //             }
    //         });
    // }