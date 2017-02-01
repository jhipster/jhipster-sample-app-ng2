import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Operation } from './operation.model';
import { OperationPopupService } from './operation-popup.service';
import { OperationService } from './operation.service';

@Component({
    selector: 'jhi-operation-delete-dialog',
    templateUrl: './operation-delete-dialog.component.html'
})
export class OperationDeleteDialogComponent {

    operation: Operation;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private operationService: OperationService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager,
        private router: Router
    ) {
        this.jhiLanguageService.setLocations(['operation']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
    }

    confirmDelete (id: number) {
        this.operationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'operationListModification',
                content: 'Deleted an operation'
            });
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-operation-delete-popup',
    template: ''
})
export class OperationDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private operationPopupService: OperationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.operationPopupService
                .open(OperationDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
