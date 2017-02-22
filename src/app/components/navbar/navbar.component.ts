import { Component, OnInit } from '@angular/core';
import { Auth } from '../../services/auth/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ Auth ]
})
export class NavbarComponent implements OnInit {

  constructor(private auth: Auth) { }

  ngOnInit() {
  }

}
