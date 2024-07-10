import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-number-wheel',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './number-wheel.component.html',
  styleUrl: './number-wheel.component.scss'
})
export class NumberWheelComponent {
  @ViewChild('wheel', { static: true }) wheel: ElementRef | undefined;
  switch1Val = 1;
  switch2Val = 2;
  switch3Val = 3;
  switch4Val = 5;
  hideNumSwitch1 = false;
  hideNumSwitch2 = false;
  hideNumSwitch3 = false;
  hideNumSwitch4 = false;
  slot1Val = 0;
  slot2Val = 0;
  slot3Val = 0;
  slot4Val = 0;
  private isDragging: boolean = false;
  private startAngle: number = 0;
  private currentRotation: number = 0;
  displayBanner = false;

  constructor(private renderer: Renderer2) { }

  onMouseDown(event: MouseEvent): void {
    this.isDragging = true;
    this.startAngle = this.calculateAngle(event.clientX, event.clientY);
    this.renderer.addClass(document.body, 'grabbing');

    this.renderer.listen('document', 'mousemove', (moveEvent: MouseEvent) => {
      if (this.isDragging) {
        const newAngle = this.calculateAngle(moveEvent.clientX, moveEvent.clientY);
        const rotation = this.currentRotation + (newAngle - this.startAngle);
        this.rotateWheel(rotation);
      }
    });

    this.renderer.listen('document', 'mouseup', () => {
      this.isDragging = false;
      this.currentRotation += this.calculateAngle(event.clientX, event.clientY) - this.startAngle;
      this.renderer.removeClass(document.body, 'grabbing');
    });
  }

  private calculateAngle(clientX: number, clientY: number): number {
    const wheelCenter = this.getWheelCenter();
    return Math.atan2(clientY - wheelCenter.y, clientX - wheelCenter.x);
  }

  private rotateWheel(rotation: number): void {
    if (this.wheel) {
      this.renderer.setStyle(this.wheel.nativeElement, 'transform', `rotate(${rotation}rad)`);
    }
  }

  getWheelCenter(): { x:number, y:number } {
    const rect = this.wheel?.nativeElement.getBoundingClientRect();
    return {
      x: rect!.left + rect!.width / 2,
      y: rect!.top + rect!.height / 2
    }
  }

  handleSwitchSelection(el: HTMLDivElement) {
    const selectedSwitchVal = this.getSwitchVal(el.id);
    const angle = this.getSwitchAngle(el);
    if(angle > 260 && angle < 280) {
      this.updateSlotStatus(1, el.id);
    } else if((angle >= 0 && angle <10) || (angle > 350 && angle <=360)) {
      this.updateSlotStatus(2, el.id);
    } else if(angle > 80 && angle < 100) {
      this.updateSlotStatus(3, el.id);
    } else if(angle > 170 && angle < 190) {
      this.updateSlotStatus(4, el.id);
    }
    this.checkSolution();
  }

  getSwitchVal(selectedSwitch: string): number {
    switch(selectedSwitch) {
      case('switch1'): return this.switch1Val;
      case('switch2'): return this.switch2Val;
      case('switch3'): return this.switch3Val;
      case('switch4'): return this.switch4Val;
      default: return 0;
    }
  }

  getSwitchAngle(switchElemRef: HTMLDivElement): number {
    const wheelCenter = this.getWheelCenter();
    const childRect = switchElemRef.getBoundingClientRect();
    const childCenterX = childRect.left + childRect.width / 2;
    const childCenterY = childRect.top + childRect.height / 2;
    let angle = Math.atan2(childCenterY - wheelCenter.y, childCenterX - wheelCenter.x);
    angle = angle * (180 / Math.PI);
    if (angle < 0) {
      angle = 360 + angle;
    }
    return angle
  }

  updateSlotStatus(slot: number, selectedSwitch: string) {
    let slotVal = this.getSlotVal(slot);
    if(slotVal === 0) {
      this.assignSlotVal(slot, this.getSwitchVal(selectedSwitch));
      this.toggleSwitchDisplay(selectedSwitch);
    }
  }

  getSlotVal(slot: number): number {
    switch(slot) {
      case(1): return this.slot1Val;
      case(2): return this.slot2Val;
      case(3): return this.slot3Val;
      case(4): return this.slot4Val;
      default: return -1;
    }
  }

  assignSlotVal(slot: number, switchVal: number) {
    switch(slot) {
      case(1):
        this.slot1Val = switchVal;
        break;
      case(2):
        this.slot2Val = switchVal;
        break;
      case(3):
        this.slot3Val = switchVal;
        break;
      case(4):
        this.slot4Val = switchVal;
    }
  }

  toggleSwitchDisplay(selectedSwitch: string) {
    switch(selectedSwitch) {
      case('switch1'):
        this.hideNumSwitch1 = !this.hideNumSwitch1;
        break;
      case('switch2'):
        this.hideNumSwitch2 = !this.hideNumSwitch2;
        break;
      case('switch3'):
        this.hideNumSwitch3 = !this.hideNumSwitch3;
        break;
      case('switch4'):
        this.hideNumSwitch4 = !this.hideNumSwitch4;
    }
  }

  checkSolution() {
    if(this.slot1Val === 5 && this.slot2Val === 3 && this.slot3Val === 2 && this.slot4Val === 1) {
      this.displayBanner = true;
    } else {
      this.displayBanner = false;
    }
  }

  resetSlot(el: HTMLDivElement) {
    switch(el.id) {
      case('slot1'):
        if(this.slot1Val != 0) {
          this.toggleSwitchDisplay(this.getSwitchId(this.slot1Val));
          this.slot1Val = 0;
        }
        break;
      case('slot2'):
      if(this.slot2Val != 0) {
        this.toggleSwitchDisplay(this.getSwitchId(this.slot2Val));
        this.slot2Val = 0;
      }
        break;
      case('slot3'):
      if(this.slot3Val != 0) {
        this.toggleSwitchDisplay(this.getSwitchId(this.slot3Val));
        this.slot3Val = 0;
      }
        break;
      case('slot4'):
      if(this.slot4Val != 0) {
        this.toggleSwitchDisplay(this.getSwitchId(this.slot4Val));
        this.slot4Val = 0;
      }
    }
  }

  getSwitchId(slotVal: number): string {
    switch(slotVal) {
      case(this.switch1Val): return 'switch1';
      case(this.switch2Val): return 'switch2';
      case(this.switch3Val): return 'switch3';
      case(this.switch4Val): return 'switch4';
      default: return '';
    }
  }

  getImgSrc(slotVal: number): string {
    switch(slotVal) {
      case(1): return './assets/images/roman-I.png';
      case(2): return './assets/images/roman-II.png';
      case(3): return './assets/images/roman-III.png';
      case(5): return './assets/images/roman-V.png';
      default: return '';
    }
  }
}
