import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from '../app/pages/default/default.component';

const routes: Routes = [
    {
        path: "",
        component: DefaultComponent,
        children: [
            {
                path: "dashboard",
                loadChildren: ".\/pages\/LoomManagement\/LoomData\/loomdata.module#LoomDataModule"
            }
        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes,{useHash:true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }