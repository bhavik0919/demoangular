import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIService } from '../../../service/api.service';
import {GrowlModule,DropdownModule, DialogModule,InputSwitchModule,CalendarModule,DataTableModule,SharedModule,PaginatorModule,RatingModule, MultiSelectModule } from 'primeng/primeng';
import { from } from 'rxjs/observable/from';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/components/common/messageservice';
import { UserDataComponent } from './userdata.component';
import { ViewdataComponent } from './viewdata/viewdata.component';
import { AddeditComponent } from './addedit/addedit.component';

const routes: Routes = [
  {
      path: "",
      component: UserDataComponent,
      children: [
          {
              path: "",
              component: UserDataComponent,
              children: [
                  { path: 'view', component: ViewdataComponent },
                  { path: '', component: ViewdataComponent }
              ]
          }
      ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputSwitchModule,
    CalendarModule,
    DataTableModule,
    SharedModule,
    PaginatorModule,
    RatingModule,
    GrowlModule,
    MultiSelectModule,
    DropdownModule,
    TableModule
  ],
  declarations: [
    DefaultComponent,
    AddeditComponent,
    UserDataComponent,
    ViewdataComponent
  ],
  providers:[APIService,MessageService]
})
export class UserDataModule { }
