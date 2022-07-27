import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  bookData: Array<any> = [];
  editUser: boolean = false;
  userId = '';
  bookForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    published: new FormControl(),
  });

  constructor(public HttpApiService: ApiService, private http: HttpClient) {
    this.getApi();
  }

  getApi() {
    this.HttpApiService.getUser().subscribe((data: any) => {
      this.bookData = data;
    });
  }

  adduser() {
    this.HttpApiService.addUser(this.bookForm.value).subscribe(() => {
      this.getApi();
      this.bookForm.reset();
    });
  }

  getOneUser(id: any) {
    this.editUser = true;
    this.HttpApiService.getOneUser(id).subscribe((data: any) => {
      this.userId = data.id;
      this.bookForm.setValue({
        title: data.title,
        description: data.description,
        published: data.published.toString(),
      });
    });
  }

  updateUser(id: any) {
    this.HttpApiService.updateUser(id, this.bookForm.value).subscribe(() => {
      this.getApi();
      this.bookForm.reset();
    });
    this.editUser = false;
  }

  deleteUser(id: any) {
    this.HttpApiService.deleteUser(id).subscribe(() => {
      this.getApi();
    });
  }

  ngOnInit(): void {}
}
