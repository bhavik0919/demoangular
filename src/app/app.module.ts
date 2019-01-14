import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APIService } from 'app/service/api.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { MultiSelectModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from './pages/UserManagement/Common/header/header.component';
import { FooterComponent } from './pages/UserManagement/Common/footer/footer.component';
import { UserDataModule } from './pages/UserManagement/UserData/userdata.module';

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
    UserDataModule,
    AppRoutingModule,
    MultiSelectModule,
    TableModule
  ],
  providers: [APIService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
