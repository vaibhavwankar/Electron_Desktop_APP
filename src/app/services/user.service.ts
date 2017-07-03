import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import PouchDB from 'pouchdb';

import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class UserService {
    patientdb: any
    constructor(private http: Http, ) {
        this.patientdb = new PouchDB('patientdb')
    }

    create(model) {

        this.patientdb.put({
            "_id": model.firstName,
            "firstName": model.firstName,
            "emailAddress": model.emailAddress,
            "mobileNumber": model.mobileNumber,
            "adhaarId": model.adhaarId,
            "previous_rev": "0",
            "deleted": 0,
            "userId": "0"
        }).then((result) => {
            console.log("Patient Registered Successfully")
        }).catch(function (err) {
            console.log(err)
        })

    }



    private _session: any

    set(value) {
        this._session = value;
    }
    get() {
        return this._session
    }

    getpatients(hospitalId, locationId): any {
        let params = new URLSearchParams()
        params.set('hospitalId', hospitalId)
        params.set('locationId', locationId)
        params.set('page', '0')
        params.set('size', '0')

        return this.http.get('http://52.66.106.88/dpdocter/api/v1/contacts/DOCTORCONTACTS', { search: params })
            .map(response => {

                let result = response.json()
                result = result.data.patientCards
                //console.log(result)
                for (var i in result) {
                    this.patientdb.put({
                        "_id": result[i].userId,
                        "firstName": result[i].firstName,
                        "mobileNumber": result[i].mobileNumber,
                        "emailAddress": result[i].emailAddress == null ? "" : result[i].emailAddress,
                        "adhaarId": result[i].adhaarId == null ? "" : result[i].adhaarId,
                        "previous_rev": "-1",
                        "deleted": 0,
                        "userId": result[i].userId
                    }).then(function (response) {
                        //console.log(response)
                    }).catch(function (err) {
                        //console.log(err);
                    });
                }

            })

    }

}


// select(hospitalId, locationId, patientId) {

    //     let params = new URLSearchParams()
    //     params.set('hospitalId', hospitalId)
    //     params.set('locationId', locationId)
    //     params.set('page', '0')
    //     params.set('size', '10')

    //     return this.http.get('http://52.66.106.88/dpdocter/api/v1/register/getpatientprofile/' + patientId, { search: params })
    //         .map(response => {
    //             //console.log(response)
    //             let result = response.json()
    //             //console.log(result.data)
    //             return result
    //         })

    // }



    // get(id) {

    //     return this.patientdb.find({
    //         selector: { _id: { $eq: id } }
    //     }).then(function (result) {
    //         return result
    //     }).catch(function (err) {
    //         return err
    //     });

    // }

// this.patientdb.put({
        //     "_id": model.firstname,
        //     "lastname": model.lastname,
        //     "dob": model.dob,
        //     "number": model.number
        // }).then((result) => {
        //     console.log("Patient Registered Successfully")
        // }).catch(function (err) {
        //     console.log(err)
        // })












    //     create(data) {

    //     let id = this.get()
    //     let body = {
    //         firstName: data.firstname,
    //         localPatientName: data.firstname,
    //         mobileNumber: data.number,
    //         gender: '',
    //         dob: {
    //             days: 0,
    //             months: 0,
    //             years: 0,
    //             age: {
    //                 days: 0,
    //                 months: 0,
    //                 years: 0
    //             }
    //         },
    //         age: '',
    //         emailAddress: '',
    //         groups: [],
    //         bloodGroup: '',
    //         profession: '',
    //         relations: [
    //             {
    //                 name: '',
    //                 relation: 'Relation'
    //             }
    //         ],
    //         secMobile: "",
    //         adhaarId: "",
    //         panCardNumber: "",
    //         drivingLicenseId: "",
    //         insuranceId: '',
    //         insuranceName: '',
    //         notes: null,
    //         address: {
    //             country: 'india',
    //             city: '',
    //             state: '',
    //             postalCode: '',
    //             locality: '',
    //             latitude: '',
    //             longitude: '',
    //             streetAddress: ''
    //         },
    //         dateOfVisit: 1498549967,
    //         patientNumber: null,
    //         referredBy: null,
    //         locationId: id.data.hospitals[0].locationsAndAccessControl[0].id,
    //         hospitalId: id.data.hospitals[0].locationsAndAccessControl[0].hospitalId,
    //         doctorId: id.data.user.id,
    //     }
    //     let headers = new Headers({ 'Content-Type': 'application/json' });
    //     headers.append('Authorization', 'Basic aGVhbHRoY29jb0AyNTo2QUU4R1NXMUQ3QUVSM0RG');
    //     let options = new RequestOptions({ headers: headers });

    //     //console.log(body)
    //     return this.http
    //         .post('http://52.66.106.88/dpdocter/api/v1/register/patient', body, options)
    //         .map((response: Response) => {

    //             console.log(response)
    //         })

    // }