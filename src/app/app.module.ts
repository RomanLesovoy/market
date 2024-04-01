import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApolloProvider } from '../apollo';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';

import { ShareLibModulesModule } from './shared/share-lib-modules/share-lib-modules.module';

import { initializeAmplify } from './aws.config';
import { CognitoService } from './cognito.service';
import { HistoryComponent } from './history/history.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MarketsModule } from './markets/markets.module';
import { BalancesComponent } from './markets/balances/balances.component';
import { HistoryService } from './history/history.service';
import { PaymentModule } from './payment/payment.module';
import { PaymentService } from './payment/payment.service';
import { DirectivesModule } from './shared/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    BalancesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PaymentModule,
    ApolloModule,
    MarketsModule,
    QRCodeModule,
    ToastrModule.forRoot(),
    HeaderComponent, // explain: why here component
    ShareLibModulesModule, // explain: we can use modules to import\export
    DirectivesModule
  ],
  providers: [importProvidersFrom(HttpClientModule), Apollo, ApolloProvider, CognitoService, provideAnimationsAsync(), HistoryService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
    initializeAmplify();
  }
}
