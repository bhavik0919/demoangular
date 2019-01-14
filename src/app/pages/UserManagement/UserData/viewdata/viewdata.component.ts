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
import { UserData } from '../userdata';
import { Global } from 'app/Shared/Global';

class UserList implements UserData {

  constructor(public Id?, public Name?, public Age?, public State?, public Country?) { }

}

@Component({
  selector: 'app-view',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.css']
})
export class ViewdataComponent implements OnInit {

  msgs: Message[] = [];
  displayDialog: boolean;
  isSubmitted: boolean;
  user: UserData = new UserList();
  UserForm: FormGroup;
  formData = new FormData();
  selectedUser: UserData;
  newUser: boolean;
  users: UserData[];
  Response: Response2;
  filetr : {};
  token : any
  // Page title
  title = "User List";
  dialogtitle = "Add User";
  cols: any[];
  columnOptions: SelectItem[];

  constructor(private api: APIService, public formBuilder: FormBuilder, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.login();

    this.setDefaultValuesForRequestForm();


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'name', header: 'Name' },
      { field: 'age', header: 'Age' },
      { field: 'state', header: 'State' },
      { field: 'country', header: 'Country' }

    ];

    this.columnOptions = [];
    for (let i = 0; i < this.cols.length; i++) {
      this.columnOptions.push({ label: this.cols[i].header, value: this.cols[i] });
    }

  }

  cloneUser(c: UserData): UserData {
    let user = new UserList();
    for (let prop in c) {
      user[prop] = c[prop];
    }
    return user;
  }

  login()
  {
    let data = {
      "username":"test",
      "password":"testpass"
    }
    this.api.post('api/login', data).subscribe(response => {
      this.Response = response;
      Global.Token = response.token
      this.getUserList()
    });
  }

  getUserList() {
    this.api.get('secureApi/user').subscribe(response => {
      this.Response = response;
      this.users = response
    });
  }

  setDefaultValuesForRequestForm() {
    this.UserForm = this.formBuilder.group({
      Id:[null],
      Name: [null],
      Age: [null],
      State: [null],
      Country: [null]
    });
  }

  showDialogToAdd() {
    this.dialogtitle = "Add User";
    this.newUser = true;
    this.user = new UserList();
    this.UserForm.patchValue({
      Id:'',
      Name: '',
      Age: '',
      State: [null],
      Country: [null]
    });
    this.displayDialog = true;
  }

  delete(data)
  {
    this.api.delete('secureApi/user',data.id).subscribe(response => {
      this.Response = response;
      if (response.status == "TRUE") {
        this.showSuccess(response.message);
      }
      else if (response.status == "FALSE") {
        this.showError(response.message);
      }
    });
    this.getUserList()
  }
  save(formData) {
    this.isSubmitted = true;
    if (formData.valid) {
      let data = {
        "name":formData.value.Name,
        "age":Number(formData.value.Age),
        "state":formData.value.State,
        "country":formData.value.Country
      }
      if(formData.value.Id != "")
      {
        this.api.put('secureApi/user',formData.value.Id, data).subscribe(response => {
          this.Response = response;
          if (response.status == "TRUE") {
            this.showSuccess(response.message);
          }
          else if (response.status == "FALSE") {
            this.showError(response.message);
          }
        });
        this.getUserList()
        this.user = null;
        this.displayDialog = false;
      }
      else
      {
        this.api.post('secureApi/user', data).subscribe(response => {
          this.Response = response;
          if (response.status == "TRUE") {
            this.showSuccess(response.message);
          }
          else if (response.status == "FALSE") {
            this.showError(response.message);
          }
        });
        this.getUserList()
        this.user = null;
        this.displayDialog = false;
      }
    }
    else {

    }

  }

  EditSelected(event) {
    this.newUser = false;
    this.dialogtitle = "Edit User";
    this.user = this.cloneUser(event.data);
    this.UserForm.patchValue({
      Id:event.id,
      Name: event.name,
      Age: event.age,
      State: event.state,
      Country: event.country
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
}

