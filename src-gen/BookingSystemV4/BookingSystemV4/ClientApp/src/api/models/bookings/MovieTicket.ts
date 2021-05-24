import {RegularSeatSchedule} from "../schedules/RegularSeatSchedule"
import {Seat} from "../resources/Seat"
import {Cust1} from "../customers/Cust1"
export type MovieTicket = {
	id: string
	seatSchedule: RegularSeatSchedule
	seat: Seat
	cust: Cust1
} 
