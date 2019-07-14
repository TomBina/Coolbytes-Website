import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[appLazyLoad]"
})
export class LazyLoadDirective {
  constructor(elemRef: ElementRef) {
    let elem = elemRef.nativeElement;
    
    if (!("IntersectionObserver" in window)) {
      elem.src = elem.dataset.src;
      return;
    }

    let intersectionObserver = new IntersectionObserver(entries => {

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage: any = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          intersectionObserver.unobserve(lazyImage);
        }
      });
    });

    intersectionObserver.observe(elem);
  }
}