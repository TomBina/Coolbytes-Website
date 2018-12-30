import { DateRange } from "./date-range";
export interface AddResumeEventCommand {
    dateRange: DateRange;
    name: string;
    message: string;
}