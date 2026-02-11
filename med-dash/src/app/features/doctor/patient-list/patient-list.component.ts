import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: Date;
  condition: string;
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent {
  patients = signal<Patient[]>([
    {
      id: '1',
      name: 'Emma Davis',
      age: 28,
      gender: 'Female',
      lastVisit: new Date('2024-10-10'),
      condition: 'Hypertension'
    },
    {
      id: '2',
      name: 'Marcus Johnson',
      age: 45,
      gender: 'Male',
      lastVisit: new Date('2024-09-22'),
      condition: 'Type 2 Diabetes'
    },
    {
      id: '3',
      name: 'Sophia Miller',
      age: 32,
      gender: 'Female',
      lastVisit: new Date('2024-10-05'),
      condition: 'Asthma'
    },
    {
      id: '4',
      name: 'James Wilson',
      age: 58,
      gender: 'Male',
      lastVisit: new Date('2024-08-15'),
      condition: 'Arthritis'
    }
  ]);

  displayedColumns = ['name', 'demographics', 'condition', 'lastVisit', 'actions'];
}
