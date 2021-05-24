import {Seat} from "../models/resources/Seat"	
export type UpdateCinemaHallRequestModel = {
	id: string
	name: string
	code: number
	seats: Seat[]
} 
