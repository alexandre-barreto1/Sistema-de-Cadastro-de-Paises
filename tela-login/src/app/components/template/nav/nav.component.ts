import { Component, OnInit } from '@angular/core';
import {AuthGuard} from '../../guards/auth.guard.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  ready: boolean;
  constructor(private guard: AuthGuard) {
  }
  ngOnInit(): void {
    this.ready = this.guard.isAdministrador();
  }

}
