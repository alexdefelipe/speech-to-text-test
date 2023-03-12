import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import {FormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { ChatComponent } from './chat/chat.component';
import {RouterOutlet} from "@angular/router";
import { SttComponent } from './stt/stt.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SttComponent
  ],
    imports: [
        BrowserModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        FormsModule,
        AppRoutingModule,
        RouterOutlet
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
