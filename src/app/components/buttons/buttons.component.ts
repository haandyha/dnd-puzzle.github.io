import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
  panelButtons: boolean[] = Array(16).fill(false);
  solution = [
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true
  ];
  displayBanner = false;

  toggleBtnStatus(index: number) {
    this.panelButtons[index] = !this.panelButtons[index];
    this.checkSolution();
  }

  checkSolution() {
    if(this.doArraysMatch(this.panelButtons, this.solution)) {
      this.displayBanner = true;
    } else {
      this.displayBanner = false;
    }
  }

  doArraysMatch(panelButtons: boolean[], solution: boolean[]): boolean {
    return panelButtons.length === solution.length &&
      panelButtons.every((btn, index) => btn === solution[index]);
  }
}
