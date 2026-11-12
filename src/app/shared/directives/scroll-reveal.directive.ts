import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollReveal], .scroll-reveal'
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealClass = 'revealed';
  @Input() threshold = 0.1;
  @Input() rootMargin = '0px 0px -40px 0px';

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.renderer.addClass(this.el.nativeElement, this.revealClass);
      return;
    }

    try {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, this.revealClass);
            if (this.observer) {
              this.observer.unobserve(this.el.nativeElement);
            }
          }
        });
      }, {
        threshold: this.threshold,
        rootMargin: this.rootMargin
      });

      this.observer.observe(this.el.nativeElement);
    } catch {
      this.renderer.addClass(this.el.nativeElement, this.revealClass);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

