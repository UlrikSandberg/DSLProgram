import {RegularSeatSchedule} from "../models/schedules/RegularSeatSchedule"	
export type UpdateSeatRequestModel = {
	id: string
	name: string
	code: number
	schedules: RegularSeatSchedule[]
} 
