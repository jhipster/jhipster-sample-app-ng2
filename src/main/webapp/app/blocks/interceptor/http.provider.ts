import { Injector } from '@angular/core';
import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { JhiEventManager, JhiInterceptableHttp } from 'ng-jhipster';

import { StateStorageService } from '../../shared/auth/state-storage.service';
import { AuthExpiredInterceptor } from './auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './errorhandler.interceptor';
import { NotificationInterceptor } from './notification.interceptor';

export function interceptableFactory(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    injector: Injector,
    stateStorageService: StateStorageService,
    eventManager: JhiEventManager
) {
    return new JhiInterceptableHttp(
        backend,
        defaultOptions,
        [
            new AuthExpiredInterceptor(injector, stateStorageService),
            // Other interceptors can be added here
            new ErrorHandlerInterceptor(eventManager),
            new NotificationInterceptor(injector)
        ]
    );
};

export function customHttpProvider() {
    return {
        provide: Http,
        useFactory: interceptableFactory,
        deps: [
            XHRBackend,
            RequestOptions,
            Injector,
            StateStorageService,
            JhiEventManager
        ]
    };
};
