import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)
    const data = form.value
    this._auth.loginUser(data)
      .subscribe(
        res => {
          console.log(res.token)
          this._router.navigate(["/special"])
        },
        err => console.log(err)
      )
  }
}
