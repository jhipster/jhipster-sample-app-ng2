import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Operation } from './operation.model';
import { OperationService } from './operation.service';

@Component({
    selector: 'jhi-operation-detail',
    templateUrl: './operation-detail.component.html'
})
export class OperationDetailComponent implements OnInit, OnDestroy {

    operation: Operation;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private operationService: OperationService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['operation']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.operationService.find(id).subscribe(operation => {
            this.operation = operation;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
