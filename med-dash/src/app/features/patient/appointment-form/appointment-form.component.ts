import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-appointment-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<AppointmentFormComponent>);

    appointmentForm = this.fb.group({
        doctor: ['', Validators.required],
        specialty: ['', Validators.required],
        date: ['', Validators.required],
        time: ['', Validators.required],
        reason: ['', Validators.required]
    });

    doctors = [
        { name: 'Dr. Sarah Wilson', specialty: 'Cardiologist' },
        { name: 'Dr. Mark Chen', specialty: 'Dentist' },
        { name: 'Dr. Emily Johnson', specialty: 'Dermatologist' }
    ];

    times = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM'];

    onSubmit() {
        if (this.appointmentForm.valid) {
            this.dialogRef.close(this.appointmentForm.value);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }
}
