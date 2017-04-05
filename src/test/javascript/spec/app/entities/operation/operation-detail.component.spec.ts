import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { JhipsterSampleApplicationNg2TestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { OperationDetailComponent } from '../../../../../../main/webapp/app/entities/operation/operation-detail.component';
import { OperationService } from '../../../../../../main/webapp/app/entities/operation/operation.service';
import { Operation } from '../../../../../../main/webapp/app/entities/operation/operation.model';

describe('Component Tests', () => {

    describe('Operation Management Detail Component', () => {
        let comp: OperationDetailComponent;
        let fixture: ComponentFixture<OperationDetailComponent>;
        let service: OperationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationNg2TestModule],
                declarations: [OperationDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    OperationService,
                    EventManager
                ]
            }).overrideComponent(OperationDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OperationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OperationService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Operation(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.operation).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
