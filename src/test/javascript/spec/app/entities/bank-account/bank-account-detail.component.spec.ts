import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { JhipsterSampleApplicationNg2TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { BankAccountDetailComponent } from '../../../../../../main/webapp/app/entities/bank-account/bank-account-detail.component';
import { BankAccountService } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.service';
import { BankAccount } from '../../../../../../main/webapp/app/entities/bank-account/bank-account.model';

describe('Component Tests', () => {

    describe('BankAccount Management Detail Component', () => {
        let comp: BankAccountDetailComponent;
        let fixture: ComponentFixture<BankAccountDetailComponent>;
        let service: BankAccountService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationNg2TestModule],
                declarations: [BankAccountDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    BankAccountService,
                    EventManager
                ]
            }).overrideComponent(BankAccountDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BankAccountDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BankAccountService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BankAccount(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bankAccount).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
