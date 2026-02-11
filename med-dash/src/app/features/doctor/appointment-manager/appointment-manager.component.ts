import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

interface DoctorAppointment {
  id: string;
  patientName: string;
  type: string;
  date: Date;
  status: 'pending' | 'confirmed' | 'completed';
  notes: string;
}

@Component({
  selector: 'app-appointment-manager',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatTabsModule
  ],
  templateUrl: './appointment-manager.component.html',
  styleUrls: ['./appointment-manager.component.css']
})
export class AppointmentManagerComponent {
  appointments = signal<DoctorAppointment[]>([
    {
      id: '1',
      patientName: 'Emma Davis',
      type: 'Hypertension Follow-up',
      date: new Date('2024-10-24T10:30:00'),
      status: 'confirmed',
      notes: 'Blood pressure monitoring.'
    },
    {
      id: '2',
      patientName: 'Liam Wilson',
      type: 'New Consultation',
      date: new Date('2024-10-25T09:00:00'),
      status: 'pending',
      notes: 'Persistent headache.'
    },
    {
      id: '3',
      patientName: 'Sophia Miller',
      type: 'Vaccination',
      date: new Date('2024-10-25T11:15:00'),
      status: 'pending',
      notes: 'Flu shot.'
    }
  ]);

  displayedColumns = ['patient', 'date', 'status', 'actions'];
}
