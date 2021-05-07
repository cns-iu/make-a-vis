import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataVariableHoverService {
  private hoverEmitter = new EventEmitter<string[]>();
  public readonly hovers = this.hoverEmitter.asObservable();

  startHover(data: string[]): void {
    this.hoverEmitter.emit(data);
  }

  endHover(): void {
    this.hoverEmitter.emit([]);
  }
}
