import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService } from 'app/service/api.service';
import { LoomDataModule } from 'app/pages/LoomManagement/LoomData/loomdata.module';
import { MessageService } from 'primeng/components/common/messageservice';
import { MultiSelectModule } from 'primeng/primeng';
import { HeaderComponent } from 'app/pages/LoomManagement/Common/header/header.component';
import { FooterComponent } from 'app/pages/LoomManagement/Common/footer/footer.component';

import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    LoomDataModule,
    AppRoutingModule,
    MultiSelectModule,
    TableModule
  ],
  providers: [APIService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
