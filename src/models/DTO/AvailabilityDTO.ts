import {EventoDTO} from "./EventoDTO";

export class AvailabilityDTO {
    available: boolean;
    events: EventoDTO[];

    constructor(available: boolean, events: EventoDTO[]) {
        this.available = available;
        this.events = events;
    }
}