import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LabelDetailComponent } from '../../../../../../main/webapp/app/entities/label/label-detail.component';
import { LabelService } from '../../../../../../main/webapp/app/entities/label/label.service';
import { Label } from '../../../../../../main/webapp/app/entities/label/label.model';

describe('Component Tests', () => {

    describe('Label Management Detail Component', () => {
        let comp: LabelDetailComponent;
        let fixture: ComponentFixture<LabelDetailComponent>;
        let service: LabelService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LabelDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    LabelService
                ]
            }).overrideComponent(LabelDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LabelDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LabelService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN
            spyOn(service, 'find').and.returnValue(Observable.of(new Label(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.label).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
