import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { JhipsterSampleApplicationNg2SharedModule, UserRouteAccessService } from './shared';
import { JhipsterSampleApplicationNg2AppRoutingModule} from './app-routing.module';
import { JhipsterSampleApplicationNg2HomeModule } from './home/home.module';
import { JhipsterSampleApplicationNg2AdminModule } from './admin/admin.module';
import { JhipsterSampleApplicationNg2AccountModule } from './account/account.module';
import { JhipsterSampleApplicationNg2EntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        JhipsterSampleApplicationNg2AppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterSampleApplicationNg2SharedModule,
        JhipsterSampleApplicationNg2HomeModule,
        JhipsterSampleApplicationNg2AdminModule,
        JhipsterSampleApplicationNg2AccountModule,
        JhipsterSampleApplicationNg2EntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterSampleApplicationNg2AppModule {}
