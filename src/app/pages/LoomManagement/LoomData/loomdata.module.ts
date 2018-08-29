import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../../default/default.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APIService } from '../../../service/api.service';
import {GrowlModule,DropdownModule, DialogModule,InputSwitchModule,CalendarModule,DataTableModule,SharedModule,PaginatorModule,RatingModule, MultiSelectModule } from 'primeng/primeng';
import { from } from 'rxjs/observable/from';
import { MessageService } from 'primeng/components/common/messageservice';
import { LoomDataComponent } from 'app/pages/LoomManagement/LoomData/loomdata.component';
import { ViewdataComponent } from 'app/pages/LoomManagement/LoomData/viewdata/viewdata.component';
import { AddeditComponent } from 'app/pages/LoomManagement/LoomData/addedit/addedit.component';

const routes: Routes = [
  {
      path: "",
      component: LoomDataComponent,
      children: [
          {
              path: "",
              component: LoomDataComponent,
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
    DropdownModule
  ],
  declarations: [
    DefaultComponent,
    AddeditComponent,
    LoomDataComponent,
    ViewdataComponent
  ],
  providers:[APIService,MessageService]
})
export class LoomDataModule { }
