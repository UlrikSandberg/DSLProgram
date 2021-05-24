import {RegularSeatSchedule} from "../schedules/RegularSeatSchedule"
export type Seat = {
	id: string
	name: string
	code: number
	schedules: RegularSeatSchedule[]
} 
