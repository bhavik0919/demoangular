import { Component, OnInit } from '@angular/core';
import { DataTableModule,SharedModule,PaginatorModule,DialogModule,RadioButtonModule,InputTextModule} from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Constant } from 'app/Shared/Constant';
import { APIService } from 'app/service/api.service';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {

      //Logged in user
       userId = 1;
   
       // Form Variable
       QualityForm:FormGroup;
   
       // Local Variables
       
       isSubmitted = false;
      
       constActiveStatus = Constant.ACTIVE;
       constInactiveStatus = Constant.INACTIVE;
       isUpdateMode = false;
   
       // Page title
       title = 'Add New Quality Data'
   

  constructor(private formBuilder:FormBuilder,private api:APIService) { }

      setDefaultValuesForForm(){
        this.QualityForm = this.formBuilder.group({
            status:[this.constActiveStatus],
            CreatedBy:[this.userId]
        });
    }
    ngOnInit(): void {
        this.setDefaultValuesForForm();
    }


}
