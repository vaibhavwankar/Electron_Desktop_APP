import { Component } from '@angular/core';
import { UserService } from '../../services/index';

@Component({
    templateUrl: './app/components/createpatient/create.patient.component.html'
})

export class CreatePatientComponent {
    model: any = {};

    constructor(
        private userService: UserService,
    ) { }

    register() {
        this.userService.create(this.model)
        
    }
}
