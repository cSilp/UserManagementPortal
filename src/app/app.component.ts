import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserTableComponent } from './user-table/user-table.component';
import { Store } from '@ngrx/store';
import { fetchUsers } from './store/store.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(fetchUsers());
  }
}
