import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationNg2SharedModule } from '../../shared';
import {
    OperationService,
    OperationPopupService,
    OperationComponent,
    OperationDetailComponent,
    OperationDialogComponent,
    OperationPopupComponent,
    OperationDeletePopupComponent,
    OperationDeleteDialogComponent,
    operationRoute,
    operationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...operationRoute,
    ...operationPopupRoute,
];

@NgModule({
    imports: [
        JhipsterSampleApplicationNg2SharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OperationComponent,
        OperationDetailComponent,
        OperationDialogComponent,
        OperationDeleteDialogComponent,
        OperationPopupComponent,
        OperationDeletePopupComponent,
    ],
    entryComponents: [
        OperationComponent,
        OperationDialogComponent,
        OperationPopupComponent,
        OperationDeleteDialogComponent,
        OperationDeletePopupComponent,
    ],
    providers: [
        OperationService,
        OperationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationNg2OperationModule {}
