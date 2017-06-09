import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LabelComponent } from './label.component';
import { LabelDetailComponent } from './label-detail.component';
import { LabelPopupComponent } from './label-dialog.component';
import { LabelDeletePopupComponent } from './label-delete-dialog.component';

import { Principal } from '../../shared';

export const labelRoute: Routes = [
    {
        path: 'label',
        component: LabelComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationNg2App.label.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'label/:id',
        component: LabelDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationNg2App.label.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const labelPopupRoute: Routes = [
    {
        path: 'label-new',
        component: LabelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationNg2App.label.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'label/:id/edit',
        component: LabelPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationNg2App.label.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'label/:id/delete',
        component: LabelDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jhipsterSampleApplicationNg2App.label.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
