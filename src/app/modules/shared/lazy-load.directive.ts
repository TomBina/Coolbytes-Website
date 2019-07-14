import { Directive, ElementRef, OnDestroy } from "@angular/core";

@Directive({
  selector: "[appLazyLoad]"
})
export class LazyLoadDirective implements OnDestroy {
  intersectionObserver: IntersectionObserver;
  elem: any;

  constructor(elemRef: ElementRef) {
    this.elem = elemRef.nativeElement;

    if (!("IntersectionObserver" in window)) {
      this.elem.src = this.elem.dataset.src;
      return;
    }

    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage: any = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          observer.unobserve(lazyImage);
        }
      });
    });

    this.intersectionObserver.observe(this.elem);
  }

  ngOnDestroy(): void {
    if (!this.intersectionObserver) {
      return;
    }

    console.log(`destroy ${this.elem.innerHTML}`);
    this.intersectionObserver.unobserve(this.elem);
  }
}