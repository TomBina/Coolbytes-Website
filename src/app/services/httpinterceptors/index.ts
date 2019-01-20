import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminInterceptor } from "./admin-interceptor";

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AdminInterceptor, multi: true },
];