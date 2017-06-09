import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterSampleApplicationNg2BankAccountModule } from './bank-account/bank-account.module';
import { JhipsterSampleApplicationNg2LabelModule } from './label/label.module';
import { JhipsterSampleApplicationNg2OperationModule } from './operation/operation.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterSampleApplicationNg2BankAccountModule,
        JhipsterSampleApplicationNg2LabelModule,
        JhipsterSampleApplicationNg2OperationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationNg2EntityModule {}
