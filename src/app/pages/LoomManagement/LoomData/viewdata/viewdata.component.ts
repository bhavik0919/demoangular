import { Component, OnInit } from '@angular/core';
import { MultiSelectModule, GrowlModule, SelectItem, DialogModule, InputSwitchModule, CalendarModule, DataTableModule, SharedModule, PaginatorModule, RatingModule ,DropdownModule} from 'primeng/primeng';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Response2 } from 'app/shared/Response';
import { from } from 'rxjs/observable/from';
import { Response } from '@angular/http/src/static_response';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Constant } from 'app/Shared/Constant';
import { APIService } from 'app/service/api.service';
import { LoomData } from 'app/pages/LoomManagement/LoomData/loomdata';

class LoomList implements LoomData {

  constructor(public Id?, public LoomDate?, public ShiftId?, public LoomId?, public QualityId?,
    public EmployeeId?, public StartReading?, public EndReading?, public MessId?,
    public Performance?, public Remark?, public Status?, public MessName?, public ShiftName?,
    public LoomName?, public QualityName?, public EmpFirstName?, public PerformanceName?,
    public StatusName?,public Production?) { }
}

@Component({
  selector: 'app-view',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.css']
})
export class ViewdataComponent implements OnInit {

  MeshDropDown = [];
  ShiftDropdown = [];
  LoomDropdown = [];
  QualityDropdown = [];
  PerformenceDropdown = [];
  StatusDropdown = [];

  msgs: Message[] = [];
  displayDialog: boolean;
  isSubmitted: boolean;
  loom: LoomData = new LoomList();
  LoomForm: FormGroup;
  formData = new FormData();
  selectedLoom: LoomData;
  newLoom: boolean;
  looms: LoomData[];
  Response: Response2;
  filetr : {};
  
  // Page title
  title = Constant.LoomPageTitle;
  dialogtitle = Constant.AddDialogLoom;
  cols: any[];
  columnOptions: SelectItem[];

  constructor(private api: APIService, public formBuilder: FormBuilder, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.getLoomList();
    this.getMeshList();
    this.getShiftList();
    this.getPerformenceList();
    this.getStatusList();
    this.getLoomDDList();
    this.getQualityList();

    this.setDefaultValuesForRequestForm();


    this.cols = [
      { field: 'LoomDate', header: 'LOOM DATE' },
      { field: 'ShiftName', header: 'SHIFT' },
      { field: 'MessSize', header: 'MESS' },
      { field: 'QualityName', header: 'QUALITY' },
      { field: 'LoomName', header: 'LOOM NO' },
      { field: 'EmployeeId', header: 'EMP CODE' },
      { field: 'EmpFirstName', header: 'EMP NAME' },
      { field: 'StartReading', header: 'START READING' },
      { field: 'EndReading', header: 'END READING' },
      { field: 'Production', header: 'PRODUCTION' },
      { field: 'Performance', header: 'PERFORMANCE' },
      { field: 'StatusName', header: 'STATUS' },
      { field: 'Remark', header: 'END REMARK' }

    ];

    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }

  }

  cloneLoom(c: LoomData): LoomData {
    let loom = new LoomList();
    for (let prop in c) {
      loom[prop] = c[prop];
    }
    return loom;
  }

  getLoomList() {
    this.api.get('loomdaily/getrows').subscribe(response => {
      this.looms = response.data;
    });
  }

  setDefaultValuesForRequestForm() {
    this.LoomForm = this.formBuilder.group({
      Id:[null],
      LoomDate: [null],
      ShiftId: [null],
      LoomId: [null],
      QualityId: [null],
      StartReading: [null],
      EndReading: [null],
      EmployeeId: [null],
      MessId: [null],
      Performance: [null],
      Remark: [null],
      Status: [null]
    });
  }

  showDialogToAdd() {
    this.dialogtitle = Constant.AddDialogLoom;
    this.newLoom = true;
    this.loom = new LoomList();
   
    this.LoomForm.patchValue({
      Id:'',
      LoomDate: '',
      ShiftId: '',
      LoomId: [null],
      QualityId: [null],
      StartReading: '',
      EndReading: '',
      EmployeeId: [null],
      MessId: [null],
      Performance: [null],
      Remark: [null],
      Status: [null]
    });
    this.displayDialog = true;
  }

  save(formData) {

    this.isSubmitted = true;
    formData.value.LoomDate = new Date(formData.value.LoomDate);
    if (formData.valid) {
      this.api.post('loomdaily/Insertupdate', formData.value).subscribe(response => {
        this.Response = response;
        if (response.status == "TRUE") {
          this.showSuccess(response.message);
        }
        else if (response.status == "FALSE") {
          this.showError(response.message);
        }
      });
      this.getLoomList();
      this.loom = null;
      this.displayDialog = false;
    }
    else {

    }

  }

  delete() {
    this.api.get('loomdaily/delete?id=' + this.loom.Id).subscribe(response => {
      this.Response = response;

      if (response.status == "TRUE") {
        this.showSuccess(response.message);
      }
      else if (response.status == "FALSE") {
        this.showError(response.message);
      }


    });
    this.getLoomList();

    this.loom = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newLoom = false;
    this.dialogtitle = Constant.EditDialogLoom;
    this.loom = this.cloneLoom(event.data);

    this.LoomForm.patchValue({
      Id:event.data.Id,
      LoomDate: new Date(event.data.LoomDate).toLocaleDateString(),
      ShiftId: event.data.ShiftId,
      LoomId: event.data.LoomId,
      QualityId: event.data.QualityId,
      StartReading: event.data.StartReading,
      EndReading: event.data.EndReading,
      EmployeeId: event.data.EmployeeId,
      MessId: event.data.MessId,
      Performance: event.data.Performance,
      Remark: event.data.Remark,
      Status: event.data.Status
    });

    this.displayDialog = true;
  }

  showSuccess(message: any) {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: message });
  }

  showError(message: any) {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Error Message', detail: message });
  }


  

  clear() {
    this.msgs = [];
  }

  getDateFormat(){
    return "mm/dd/yy";
  }

  getShiftList() {
    this.api.get('shift/getrows').subscribe(response => {
        this.ShiftDropdown =  response.data;
    });
  }
  getLoomDDList() {
    this.api.get('loom/getrows').subscribe(response => {
        this.LoomDropdown =  response.data;
    });
  }

  getMeshList() {
    this.api.get('mess/getrows').subscribe(response => {
      this.MeshDropDown =  response.data;
    });
  }
 
  getPerformenceList() {
    this.api.get('loomdaily/getstatus?Type=Performance').subscribe(response => {
      this.PerformenceDropdown =  response.data;
    });
  }
 

  getStatusList() {
    this.api.get('loomdaily/getstatus?Type=LoomStatus').subscribe(response => {
      this.StatusDropdown =  response.data;
    });
  }

  getQualityList() {
    this.api.get('quality/getrows').subscribe(response => {
      this.QualityDropdown =  response.data;
    });
  }
 

  

}

