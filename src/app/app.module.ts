import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

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
import { FilterPipe } from './shared/pipes/filter-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    MarketsModule,
    QRCodeModule,
    HeaderComponent,
    FilterPipe,
    ShareLibModulesModule, // explain: we can use modules to import\export
  ],
  providers: [importProvidersFrom(HttpClientModule), Apollo, ApolloProvider, CognitoService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
    initializeAmplify();
  }
}
