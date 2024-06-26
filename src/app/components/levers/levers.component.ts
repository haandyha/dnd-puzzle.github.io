import { Component } from '@angular/core';
import { Lever, LeverPositions } from '../../models/lever';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-levers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './levers.component.html',
  styleUrl: './levers.component.scss'
})
export class LeversComponent {
  levers: Lever[] = [
    new Lever('lever-1', LeverPositions.POS3),
    new Lever('lever-2', LeverPositions.POS1),
    new Lever('lever-3', LeverPositions.POS2),
    new Lever('lever-4', LeverPositions.POS4)
  ]
  solution: Lever[] = [
    new Lever('lever-1', LeverPositions.POS1),
    new Lever('lever-2', LeverPositions.POS3),
    new Lever('lever-3', LeverPositions.POS4),
    new Lever('lever-4', LeverPositions.POS2)
  ]
  displayBanner = false;

  toggleLeverPosition(index: number) {
    if(this.levers[index].position === LeverPositions.POS1) {
      this.levers[index].position = LeverPositions.POS2;
    } else if(this.levers[index].position === LeverPositions.POS2) {
      this.levers[index].position = LeverPositions.POS3;
    } else if(this.levers[index].position === LeverPositions.POS3) {
      this.levers[index].position = LeverPositions.POS4;
    } else if(this.levers[index].position === LeverPositions.POS4) {
      this.levers[index].position = LeverPositions.POS1;
    }
    this.checkSolution();
  }

  checkSolution() {
    this.doLeversMatch(this.levers, this.solution) ? this.displayBanner=true : this.displayBanner=false;
  }

  doLeversMatch(levers: Lever[], solution: Lever[]): boolean {
    return levers.length === solution.length &&
      levers.every((lever, index) => lever.position === solution[index].position);
  }
}
