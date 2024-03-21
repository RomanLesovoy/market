import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ApolloProvider } from '../apollo';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';

import { initializeAmplify } from './aws.config';
import { CognitoService } from './cognito.service';
import { MarketsComponent } from './markets/markets.component';
import { HistoryComponent } from './history/history.component';
import { HeaderComponent } from './header/header.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    MarketsComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HeaderComponent,
  ],
  providers: [importProvidersFrom(HttpClientModule), Apollo, ApolloProvider, CognitoService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor () {
    initializeAmplify();
  }
}
