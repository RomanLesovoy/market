import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[colorHover]'
})
export class ColorHoverDirective {
  private defaultColor;
  private hoverDefaultColor = '#00e18b';

  constructor(private elRef: ElementRef) {
    this.defaultColor = this.elRef.nativeElement.style.color || 'white';
  }

  setColor(color: string = this.defaultColor) {
    this.elRef.nativeElement.style.color = color;
  }

  @Input() colorHover?: string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.colorHover || this.hoverDefaultColor);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.setColor();
  }
}
