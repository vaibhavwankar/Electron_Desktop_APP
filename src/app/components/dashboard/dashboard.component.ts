import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { EditForm, result } from '../../interfaces/index';
import { Router } from '@angular/router';

import PouchDB from 'pouchdb';
PouchDB.plugin(require('pouchdb-find'));

import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { UserService } from '../../services/index';

import { Observable } from 'rxjs/observable';

@Component({
    selector: 'dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
})

export class DashboardComponent implements OnInit {
    //required by component
    patientdb: any
    resultarray: result[]
    editForm: EditForm
    e: number = 0
    

    //required by ng prime
    newPatient: boolean;
    displayDialog: boolean;
    selectedpatient:any

    //for http
    allpatients: any
    patient: any
    constructor(private router: Router, private userservice: UserService, private http: Http) {
        this.editForm = {
            firstName: "",
            mobileNumber: "",
            emailAddress: "",
            adhaarId: ""
        };
        this.patientdb = new PouchDB('patientdb')
    }

    ngOnInit() {
        this.resultarray=null
        this.loadPatients()

    }


    delete(data: any) {
        
       this.patientdb.get(data._id).then((doc) => {
            doc.deleted = 1;
            (this.patientdb.put(doc));
        }).catch(err => {
            console.log(err)
        })
        let index = this.findSelectedPatientIndex()
        this.resultarray = this.resultarray.filter((val, i) => i != index)
        this.patient = null;
        this.displayDialog = false;

    }
    onRowSelect(event) {
        let dialoguedata
        this.newPatient = false
        this.patient = event.data
        this.displayDialog = true
    }

    findSelectedPatientIndex(): number {
        return this.resultarray.indexOf(this.selectedpatient);
    }

    update(data) {

        this.patientdb.get(data._id).then((doc) => {
            doc.firstName = data.firstName;
            doc.emailAddress = data.emailAddress;
            doc.mobileNumber = data.mobileNumber;
            doc.adhaarId = data.adhaarId;
            doc.previous_rev = doc._rev;
            (this.patientdb.put(doc));
        }).catch(err => {
            console.log(err)
        })
        this.displayDialog = false;
    }

    getPatients(): Promise<result[]> {

        var promise = this.patientdb
            .allDocs({
                include_docs: true,
            })
            .then(
            (result: any): result[] => {

                // Convert the raw data storage into something more natural for the
                // calling context to consume.
                var patients = result.rows.map(
                    (row: any): result => {
                        if (!(row.doc.deleted)) {
                            return ({
                                _id: row.doc._id,
                                firstName: row.doc.firstName,
                                mobileNumber: row.doc.mobileNumber,
                                emailAddress: row.doc.emailAddress,
                                adhaarId: row.doc.adhaarId,
                                deleted:row.doc.deleted
                            })
                        }

                    }
                );

                return (patients);

            }
            )
            ;

        return (promise);

    }

    private loadPatients(): void {

        this.getPatients()
            .then(
            (patients: result[]): void => {

                this.resultarray = patients
            },
            (error: Error): void => {

                console.log("Error", error);

            }
            )
            ;

    }
}

