import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgmCoreModule } from '@agm/core';
import { TextMaskModule } from 'angular2-text-mask';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule,
    Ng4LoadingSpinnerModule.forRoot(),
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA0omsI68FBax4uuGqrmkdozHXE0CS68CA'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
