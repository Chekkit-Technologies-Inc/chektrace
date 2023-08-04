import { AlertService } from '../../../core/_services/alert.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/core/_services';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  nextStep = 1;
  editModal: boolean = false;
  addModal: boolean = false;
  users: any;
  userId: any;
  lastname: any;
  firstname: any;
  role: any;
  email: any;
  phone: any;
  password: any;
  selectedUser: any;
  newlastname: any;
  newfirstname: any;
  newemail: any;
  newrole: any;
  newphone: any;
  newpassword: any;
  isLoading: boolean = false;
  deleteModal: boolean = false;
  userToDelete: any;
  userToDeleteId: any;
  term = '';
  searchTerm = '';


  constructor(
    private navService: NavbarService,
    private restService: RestService,
    private alertService: AlertService
  ) {
    this.navService.show();
    this.getUsers();
   }

  ngOnInit(): void {
  }

  getUsers(){
    this.restService.getUser().subscribe((res: any)=>{
      console.log(res);
      this.users = res.data;
    })
  }

  generatePw(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.password = result;
    this.newpassword = result;
    return result;
  }

  editUser(id){
    this.userId = id;
    let selectedStaff = this.users.findIndex(item => item.id == id);
    this.selectedUser = this.users[selectedStaff];
    console.log(this.selectedUser);
    this.firstname = this.selectedUser.first_name;
    this.lastname = this.selectedUser.last_name;
    this.email = this.selectedUser.email;
    this.phone = this.selectedUser.phone_number;
    this.role = this.selectedUser.membership_type;
    this.editModal = !this.editModal;

  }

  confirmDelete(id){
    this.userToDeleteId = id;
    let selectedUserIndex = this.users.findIndex(item => item.id == id);
    this.userToDelete = this.users[selectedUserIndex];
    if(this.userToDelete){
      this.deleteModal = !this.deleteModal;
    }
  }

  deleteUser(){
    this.isLoading = true;
    this.restService.deleteStaff(this.userToDeleteId).subscribe((res:  any)=>{
      this.isLoading = false;
      if(res.statusCode == 200){
        this.deleteModal = !this.deleteModal;
        this.getUsers()
      }
    },(error)=>{
      console.log(error)
    })
  }

  selectMemberType(e){
    console.log(e.target.value);
    this.role = e.target.value;
  }


  submitEdit(){
    this.isLoading = true;
    const body = {
      first_name: this.firstname,
      last_name: this.lastname,
      email: this.email,
      phone_number: this.phone.toString(),
      // password: this.password,
      membership_type: this.role
    }

    console.log(body)

    this.restService.updateStaff(this.userId, body).subscribe((res: any)=>{
      console.log(res);
      this.isLoading = false;
      if(res.statusCode == 200){
        this.alertService.showAlertNotification('Success', 'User data updated successfully', 'success');
        this.getUsers();
        this.editModal = !this.editModal;
      }else{
        this.alertService.showAlertNotification('Error', 'Something went wroong, try again.', 'error');
      }
    },(error)=>{
      this.alertService.showAlertNotification('Error', 'Something went wroong, try again.', 'error');
      this.isLoading = false;
      // console.log(error)
    })
  }

  selectNewMemberType(e){
    console.log(e.target.value);
    this.newrole = e.target.value;
  }
  addStaff(){
    this.isLoading = true;
    const body = {
      first_name: this.newfirstname,
      last_name: this.newlastname,
      email: this.newemail,
      phone_number: this.newphone.toString(),
      password: this.newpassword,
      membership_type: this.newrole
    }
    console.log(body)

    this.restService.addNewStaff(body).subscribe((res: any)=>{
      this.isLoading = false;
      console.log(res);

      if(res.statusCode == 200){
        this.alertService.showAlertNotification('Success', res.message, 'success');
        this.newemail = '';
        this.newfirstname = '';
        this.newlastname = '';
        this.newphone = '';
        this.newpassword = '';
        this.getUsers();
        this.addModal = !this.addModal;
      }else{
        this.alertService.showAlertNotification('Oops!', res.message, 'error')
      }

    },(error)=>{
      this.isLoading = false;
      console.log(error);
      this.alertService.showAlertNotification('Error', 'something went wrong, try again.', 'error')
    })
  }

}
