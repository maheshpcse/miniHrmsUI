import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UiModule } from './ui/ui.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthTokenInterceptorService } from './api-services/auth-token-interceptor.service';
import { NotFoundPageComponent } from './admin/pages/not-found-page/not-found-page.component';
@NgModule({declarations:[AppComponent,HomeComponent,NotFoundPageComponent],imports:[BrowserModule,BrowserAnimationsModule,HttpClientModule,FormsModule,UiModule,AppRoutingModule],providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthTokenInterceptorService,multi:true}],bootstrap:[AppComponent]})
export class AppModule {}
