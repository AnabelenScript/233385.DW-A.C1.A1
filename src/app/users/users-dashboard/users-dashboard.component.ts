import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../interfaces/iuser';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  users: IUser[] = []; 
  selectedUser: IUser = {
    id: 1,
    name: "Marco",
    username: "marco1",
    email: "marco1@gmail.com",
    phone: "961 872 9982",
    website: "marco1.com"
  };

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'phone', 'website'];

  constructor(private _service: UserService) {}

  ngOnInit(): void {
    this.loadUsers(); 
  }
  loadUsers(): void {
    this._service.getAll().subscribe(
      (response: IUser[]) => this.users = response,
      (error) => console.error('Error al obtener los usuarios', error)
    );
  }
  addUser(user: IUser): void {
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUser: IUser = { ...user, id: newId };
    this._service.add(newUser).subscribe(
      (user: IUser) => {
        this.users = [...this.users, newUser];
        console.log('Usuario agregado:', newUser);
      },
    );
  }
  onUserAdded(user: IUser): void {
    this.addUser(user);
  }
}
