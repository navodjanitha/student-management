import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:boolean = false;
  admin:boolean = false;
  none:boolean = true;
  name:String;

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("token");

    Swal.fire({
      title: 'You are logged out',
      icon: 'warning',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      } 
    })
  }
}
