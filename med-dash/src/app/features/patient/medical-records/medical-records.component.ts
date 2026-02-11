import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

interface MedicalRecord {
  id: string;
  date: Date;
  type: string;
  doctor: string;
  diagnosis: string;
  hospital: string;
}

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './medical-records.component.html',
  styleUrls: ['./medical-records.component.css']
})
export class MedicalRecordsComponent {
  records = signal<MedicalRecord[]>([
    {
      id: '1',
      date: new Date('2024-09-15'),
      type: 'Checkup',
      doctor: 'Dr. Sarah Wilson',
      diagnosis: 'Healthy',
      hospital: 'City General'
    },
    {
      id: '2',
      date: new Date('2024-08-01'),
      type: 'Lab Test',
      doctor: 'Dr. Gregory House',
      diagnosis: 'Vitamin D Deficiency',
      hospital: 'Princeton'
    },
    {
      id: '3',
      date: new Date('2024-03-12'),
      type: 'Surgery',
      doctor: 'Dr. Meredith Grey',
      diagnosis: 'Appendicitis',
      hospital: 'Seattle Grace'
    }
  ]);

  displayedColumns = ['date', 'type', 'diagnosis', 'doctor', 'actions'];
}
