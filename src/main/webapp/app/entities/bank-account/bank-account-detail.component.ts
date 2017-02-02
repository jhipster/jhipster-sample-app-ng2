import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { BankAccount } from './bank-account.model';
import { BankAccountService } from './bank-account.service';

@Component({
    selector: 'jhi-bank-account-detail',
    templateUrl: './bank-account-detail.component.html'
})
export class BankAccountDetailComponent implements OnInit, OnDestroy {

    bankAccount: BankAccount;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private bankAccountService: BankAccountService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['bankAccount']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.bankAccountService.find(id).subscribe(bankAccount => {
            this.bankAccount = bankAccount;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
