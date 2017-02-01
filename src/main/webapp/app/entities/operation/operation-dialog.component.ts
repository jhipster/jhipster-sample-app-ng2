import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Operation } from './operation.model';
import { OperationPopupService } from './operation-popup.service';
import { OperationService } from './operation.service';
import { BankAccount, BankAccountService } from '../bank-account';
import { Label, LabelService } from '../label';
// TODO replace ng-file-upload dependency by an ng2 depedency
// TODO Find a better way to format dates so that it works with NgbDatePicker
@Component({
    selector: 'jhi-operation-dialog',
    templateUrl: './operation-dialog.component.html'
})
export class OperationDialogComponent implements OnInit {

    operation: Operation;
    authorities: any[];
    isSaving: boolean;

    bankaccounts: BankAccount[];

    labels: Label[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private operationService: OperationService,
        private bankAccountService: BankAccountService,
        private labelService: LabelService,
        private eventManager: EventManager,
        private router: Router
    ) {
        this.jhiLanguageService.setLocations(['operation']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.bankAccountService.query().subscribe(
            (res: Response) => { this.bankaccounts = res.json(); }, (res: Response) => this.onError(res.json()));
        this.labelService.query().subscribe(
            (res: Response) => { this.labels = res.json(); }, (res: Response) => this.onError(res.json()));
    }

    clear () {
        this.activeModal.dismiss('cancel');
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
    }

    save () {
        this.isSaving = true;
        if (this.operation.id !== undefined) {
            this.operationService.update(this.operation)
                .subscribe((res: Response) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.operationService.create(this.operation)
                .subscribe((res: Response) => this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result) {
        this.eventManager.broadcast({ name: 'operationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
        this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }

    trackBankAccountById(index: number, item: BankAccount) {
        return item.id;
    }

    trackLabelById(index: number, item: Label) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-operation-popup',
    template: ''
})
export class OperationPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private operationPopupService: OperationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.operationPopupService
                    .open(OperationDialogComponent, params['id']);
            } else {
                this.modalRef = this.operationPopupService
                    .open(OperationDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
