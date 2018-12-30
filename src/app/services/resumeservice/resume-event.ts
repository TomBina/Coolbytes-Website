import { DateRange } from "./date-range";
export interface ResumeEvent {
    id: number;
    dateRange: DateRange;
    name: string;
    message: string;
}