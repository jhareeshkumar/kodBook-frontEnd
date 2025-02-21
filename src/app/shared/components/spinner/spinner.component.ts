import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerService } from '../../../core/services/spinner.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ProgressSpinnerModule, BlockUIModule, CommonModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  private spinnerService = inject(SpinnerService);

  isLoading: Signal<boolean> = this.spinnerService.loadingStatus;
}
