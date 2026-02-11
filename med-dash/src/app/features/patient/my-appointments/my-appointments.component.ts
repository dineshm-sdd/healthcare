import { Component, signal, computed, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: string;
  avatar: string;
}

@Component({
  selector: 'app-appointment-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './appointment-card.component.html',
  styleUrls: ['./appointment-card.component.css']
})
export class AppointmentCardComponent {
  @Input({ required: true }) appointment!: Appointment;
}

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatChipsModule,
    MatDialogModule,
    AppointmentCardComponent,
  ],
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.css']
})
export class MyAppointmentsComponent {
  private dialog = inject(MatDialog);
  appointments = signal<Appointment[]>([
    {
      id: '1',
      doctorName: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: new Date('2024-10-12T09:00:00'),
      status: 'upcoming',
      type: 'General Checkup',
      avatar: 'https://i.pravatar.cc/150?u=sarah'
    },
    {
      id: '2',
      doctorName: 'Dr. Mark Chen',
      specialty: 'Dentist',
      date: new Date('2024-10-24T14:30:00'),
      status: 'upcoming',
      type: 'Dental Cleaning',
      avatar: 'https://i.pravatar.cc/150?u=mark'
    },
    {
      id: '3',
      doctorName: 'Dr. Emily Johnson',
      specialty: 'Dermatologist',
      date: new Date('2024-09-15T10:00:00'),
      status: 'completed',
      type: 'Skin Consultation',
      avatar: 'https://i.pravatar.cc/150?u=emily'
    }
  ]);

  upcomingAppointments = computed(() => this.appointments().filter(a => a.status === 'upcoming'));
  pastAppointments = computed(() => this.appointments().filter(a => a.status === 'completed'));

  bookNewAppointment() {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '500px',
      panelClass: 'custom-dialog-container',
      maxWidth: '95vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newApt: Appointment = {
          id: (this.appointments().length + 1).toString(),
          doctorName: result.doctor,
          specialty: result.specialty || 'General',
          date: result.date,
          status: 'upcoming',
          type: result.reason,
          avatar: 'https://i.pravatar.cc/150?u=' + Math.random()
        };
        this.appointments.update(prev => [newApt, ...prev]);
      }
    });
  }
}


