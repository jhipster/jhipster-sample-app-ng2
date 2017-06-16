import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { BankAccountPopupService } from './bank-account-popup.service';
import { BankAccountService } from './bank-account.service';
import { User, UserService } from '../../shared';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-bank-account-dialog',
    templateUrl: './bank-account-dialog.component.html'
})
export class BankAccountDialogComponent implements OnInit {

    bankAccount: BankAccount;
    authorities: any[];
    isSaving: boolean;

    users: User[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private bankAccountService: BankAccountService,
        private userService: UserService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.userService.query()
            .subscribe((res: ResponseWrapper) => { this.users = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankAccountService.update(this.bankAccount), false);
        } else {
            this.subscribeToSaveResponse(
                this.bankAccountService.create(this.bankAccount), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<BankAccount>, isCreated: boolean) {
        result.subscribe((res: BankAccount) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: BankAccount, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'jhipsterSampleApplicationNg2App.bankAccount.created'
            : 'jhipsterSampleApplicationNg2App.bankAccount.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'bankAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-bank-account-popup',
    template: ''
})
export class BankAccountPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankAccountPopupService: BankAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.bankAccountPopupService
                    .open(BankAccountDialogComponent, params['id']);
            } else {
                this.modalRef = this.bankAccountPopupService
                    .open(BankAccountDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
