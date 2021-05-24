import {RegularSeatSchedule} from "../models/schedules/RegularSeatSchedule"	
import {Seat} from "../models/resources/Seat"	
import {Cust1} from "../models/customers/Cust1"	
export type UpdateMovieTicketRequestModel = {
	id: string
	seatSchedule: RegularSeatSchedule
	seat: Seat
	cust: Cust1
} 
