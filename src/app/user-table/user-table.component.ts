import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EMPTY, Observable, switchMap, take, timer } from 'rxjs';
import { User } from './user-table.model';
import { Store } from '@ngrx/store';
import { StoreDetails } from '../store/store.state';
import { patchUserDetails } from '../store/store.actions';
import { NameformatPipe } from './nameformat.pipe';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  standalone: true,
  imports: [CommonModule, MatTableModule,HttpClientModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatProgressSpinnerModule, NameformatPipe],
  providers: [UserService],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserTableComponent {
  editForm!: FormGroup;
  columnsToDisplay: string[] = ['firstName', 'lastName', 'maidenName', 'age'];
  dataSource: User[] = [];
  expandedElement: User | null = null;
  columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
  processing: boolean = false;
  public users$: Observable<any>;

  constructor(private store: Store, private fb: FormBuilder) {
    this.users$ = this.store.select((state: StoreDetails) => state.users);''
  }  

  ngOnInit(): void {    
    this.initializeForm();
  }

  // Method to initialize the form using FormBuilder
  initializeForm() {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      maidenName: [''],
      age: ['', [Validators.required, Validators.maxLength(3)]],
    });
  }

  // Method to set form values based on a User object
  setFormValues(user: User) {
    this.editForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      maidenName: user.maidenName,
      age: user.age,
    });
  }

  // Method triggered on form submission
  onSubmit() {
      if (this.editForm.valid && this.expandedElement) {
        const editedData = this.editForm.value;
    
        // Show the spinner
        this.processing = true;
    
        // Use delay operator to simulate a delay (e.g., 2000 milliseconds)
        timer(2000).pipe(take(1),
          switchMap(async () => this.expandedElement
            ? this.store.dispatch(patchUserDetails({ data: { id: this.expandedElement?.id, ...editedData } }))
            : EMPTY
          )
        ).subscribe(() => {
          this.processing = false;
          this.expandedElement = null;
        });
      }
    }   
    
    // Method to reset the form and collapse the expanded element on cancel
    onCancel() {
      this.editForm.reset();
      this.expandedElement = null;
    }
}
