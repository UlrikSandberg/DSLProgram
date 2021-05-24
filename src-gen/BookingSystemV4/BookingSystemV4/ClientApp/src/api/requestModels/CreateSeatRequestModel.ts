import {RegularSeatSchedule} from "../models/schedules/RegularSeatSchedule"
export type CreateSeatRequestModel = {
	name: string
	code: number
	schedules: RegularSeatSchedule[]
} 
