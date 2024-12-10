import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor() { }

  private isLoading = signal(false);

  public get loadingStatus(): Signal<boolean> {
    return this.isLoading;
  }

  showSpinner() {
    this.isLoading.set(true);
  }

  hideSpinner() {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 300);
  }

}
