import {Seat} from "../models/resources/Seat"
export type CreateCinemaHallRequestModel = {
	name: string
	code: number
	seats: Seat[]
} 
