import { DateRange } from "./date-range";
export interface UpdateResumeEventCommand {
    id: number;
    dateRange: DateRange;
    name: string;
    message: string;
}