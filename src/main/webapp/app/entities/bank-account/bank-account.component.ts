import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-bank-account',
    templateUrl: './bank-account.component.html'
})
export class BankAccountComponent implements OnInit, OnDestroy {
bankAccounts: BankAccount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private bankAccountService: BankAccountService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.bankAccountService.query().subscribe(
            (res: ResponseWrapper) => {
                this.bankAccounts = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBankAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BankAccount) {
        return item.id;
    }
    registerChangeInBankAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('bankAccountListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
