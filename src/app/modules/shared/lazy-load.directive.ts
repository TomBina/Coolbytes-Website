import { Directive, ElementRef, OnDestroy, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";

@Directive({
  selector: "[appLazyLoad]"
})
export class LazyLoadDirective implements OnDestroy {
  intersectionObserver: IntersectionObserver;
  elem: any;

  constructor(elemRef: ElementRef, @Inject(PLATFORM_ID) platformId) {
    if (!isPlatformBrowser(platformId)) {
      return;
    }
    
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