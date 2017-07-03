import { Component, OnInit } from '@angular/core';
import { MenuModule, MenuItem } from 'primeng/primeng';
import { UserService } from '../../services/index';

import { sync } from '../../sync/sync';

import PouchDB from 'pouchdb';

@Component({
    selector: 'home',
    templateUrl: './app/components/home/home.component.html',
})

export class HomeComponent {
    currentUser
    private items: MenuItem[];
    private activeItem: MenuItem;
    patientdb
    constructor(private userservice: UserService, private sync: sync) {
        this.currentUser = this.userservice.get()
        this.patientdb = new PouchDB('patientdb')
    }
    ngOnInit() {
        this.items = [
            { label: 'Patients', icon: 'fa fa-home', routerLink: ['./dashboard'] },
            { label: 'New', icon: 'fa fa-plus-square', routerLink: ['./create'] },
        ];
        this.activeItem = this.items[0];
    }

    syncing() {
         this.patientdb
            .allDocs({
                include_docs: true,
            })
            .then(result => {
            this.sync.createnewpatientsync(result)
            })
    }
}