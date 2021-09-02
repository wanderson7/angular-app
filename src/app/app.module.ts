import { DecimalPipe, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePtExtra from '@angular/common/locales/extra/pt';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/app.component';
import { CardIndexComponent } from '@app/pages/cards/card-index.component';
import { JwtModule } from '@auth0/angular-jwt';
import { EnvironmentLabelComponent } from '@components/environment-label/environment-label.component';
import { FormControlErrorsComponent } from '@components/form-control-errors/form-control-errors.component';
import { IconComponent } from '@components/icon/icon.component';
import { LayoutComponent } from '@components/layout/layout.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { ModalAlertComponent } from '@components/modal/modal-alert.component';
import { ModalConfirmComponent } from '@components/modal/modal-confirm.component';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { ToastComponent } from '@components/toast/toast.component';
import { TooltipDirective } from '@directives/tooltip.directive';
import { ResponseInterceptor } from '@interceptors/response.interceptor';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { Error404Component } from '@pages/error/error-404.component';
import { Error500Component } from '@pages/error/error-500.component';
import { TermsOfUseComponent } from '@pages/terms-of-use/terms-of-use.component';
import { NullPipe } from '@pipes/null.pipe';
import { PluralizePipe } from '@pipes/pluralize.pipe';
import { IMaskModule } from 'angular-imask';
import * as moment from 'moment';

export function tokenGetter() {
  return localStorage.token;
}

registerLocaleData(localePt, 'pt-BR', localePtExtra);

@NgModule({
  declarations: [
    PluralizePipe,
    NullPipe,
    TooltipDirective,
    AppComponent,
    LayoutComponent,
    EnvironmentLabelComponent,
    FormControlErrorsComponent,
    ModalAlertComponent,
    ModalConfirmComponent,
    ToastComponent,
    LoaderComponent,
    IconComponent,
    PaginationComponent,
    CardIndexComponent,
    TermsOfUseComponent,
    Error404Component,
    Error500Component
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    JwtModule.forRoot({ config: { tokenGetter: tokenGetter } })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    DecimalPipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    selectConfig: NgSelectConfig,
  ) {
    moment.locale('pt-BR');

    selectConfig.notFoundText = 'Nenhum item encontrado';
    selectConfig.loadingText = 'Carregando...';
  }
}
