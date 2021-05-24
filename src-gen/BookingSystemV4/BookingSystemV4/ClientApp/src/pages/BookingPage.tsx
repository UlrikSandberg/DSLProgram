import { Accordion, AccordionDetails, AccordionSummary, Button, CircularProgress, Collapse, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { httpGet, httpPost } from "../api/httpClient";
import { useMount } from "../lifeCycleExtensions";
import { CreateMovieTicketRequestModel } from "../api/requestModels/CreateMovieTicketRequestModel";
import { Seat } from "../api/models/resources/Seat";
import { RegularSeatSchedule } from "../api/models/schedules/RegularSeatSchedule";
import { Cust1 } from "../api/models/customers/Cust1";
import { VIP } from "../api/models/customers/VIP";

const BookingPage = () => {
	
	const params = useParams() as { id: string, type: string };
	
	const [loadUser, setLoadUser] = useState(false);
    const [loadUserError, setLoadUserError] = useState<string>()
	const [userCust1, setUserCust1] = useState<Cust1>();
	const [userVIP, setUserVIP] = useState<VIP>();
	
	const [loadMovieTicketResources, setLoadMovieTicketResources] = useState(false);
		    const [loadErrorMovieTicketResources, setLoadErrorMovieTicketResources] = useState<string>();
		    const [openMovieTicketResource, setOpenMovieTicketResource] = useState(false);
		    const [MovieTicketResource, setMovieTicketResource] = useState<Seat[]>([]);
		    const [selectedMovieTicketResource, setSelectedMovieTicketResource] = useState<string>('');
		    const [loadMovieTicketResourceSchedules, setLoadMovieTicketResourceSchedules] = useState(false);
		    const [loadErrorMovieTicketResourceSchedules, setLoadErrorMovieTicketResourceSchedules] = useState<string>()
		    const [MovieTicketResourceSchedules, setMovieTicketResourceSchedules] = useState<RegularSeatSchedule[]>([]);
		    const [selectedMovieTicketResourceSchedule, setSelectedMovieTicketResourceSchedule] = useState<string>('');
		    const [submittingMovieTicket, setSubmittingMovieTicket] = useState(false);
		    const [submittingMovieTicketError, setSubmittingMovieTicketError] = useState<string>();
	
	useMount(() => {
		if(params.type === "Cust1") {
		            fetchCust1();
		        }
		if(params.type === "VIP") {
		            fetchVIP();
		        }
    })
    
    const fetchCust1 = async () => {
	            setLoadUser(true);
	    
	            var result = await httpGet<Cust1>(`/Cust1/${params.id}`)
	            console.log(result)
	            if(result.isSuccess) {
	                setUserCust1(result.data);
	            } else {
	                setLoadUserError(result.message);
	            }
	            setLoadUser(false);
	        }
	        
    const fetchVIP = async () => {
	            setLoadUser(true);
	    
	            var result = await httpGet<VIP>(`/VIP/${params.id}`)
	            console.log(result)
	            if(result.isSuccess) {
	                setUserVIP(result.data);
	            } else {
	                setLoadUserError(result.message);
	            }
	            setLoadUser(false);
	        }
	        
    
    const fetchMovieTicketResource = async () => {
	            setLoadMovieTicketResources(true);
	            setLoadErrorMovieTicketResources(undefined);
	    
	            var result = await httpGet<Seat[]>("/Seat");
	    
	            if(result.isSuccess) {
	                setMovieTicketResource(result.data)
	            } else {
	                setLoadErrorMovieTicketResources(result.message);
	            }
	    
	            setLoadMovieTicketResources(false);
	        }
	    
	        useEffect(() => {
	            fetchMovieTicketResourceSchedules();
	        }, [selectedMovieTicketResourceSchedule])
	    
	        const fetchMovieTicketResourceSchedules = async () => {
	            setLoadMovieTicketResourceSchedules(true)
	            setLoadErrorMovieTicketResourceSchedules(undefined);
	    
	            var result = await httpGet<RegularSeatSchedule[]>("/RegularSeatSchedule");
	            if(result.isSuccess) {
	                setMovieTicketResourceSchedules(result.data);
	            } else {
	                setLoadErrorMovieTicketResourceSchedules(result.message);
	            }
	    
	            setLoadMovieTicketResourceSchedules(false);
	        }
	        
	        const createMovieTicketBooking = async () => {
	            setSubmittingMovieTicket(true);
	            setSubmittingMovieTicketError(undefined)
	    
	            var result = await httpPost<CreateMovieTicketRequestModel>("/MovieTicket", {
	                seat: MovieTicketResource.filter(e => e.id === selectedMovieTicketResource)[0],
	                seatSchedule: MovieTicketResourceSchedules.filter(e => e.id === selectedMovieTicketResourceSchedule)[0],
	                cust: userCust1
	            } as CreateMovieTicketRequestModel)
	    
	            if(result.isSuccess) {
	                setSelectedMovieTicketResource('');
	                setSelectedMovieTicketResourceSchedule('')
	            } else {
	                setSubmittingMovieTicketError(result.message)
	            }
	    
	            setSubmittingMovieTicket(false)
	        }

    const render = () => {
	            return <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "column", padding: "20px"}}>
                    <Typography style={{textAlign: "center", width: "100%"}} variant="h2">Book resources</Typography>
                    <Typography style={{textAlign: "center", width: "100%"}} variant="h4">User: {params.id}, type: {params.type}</Typography>
                    {loadUser
                    ? <div style={{display: "flex", width: "100%", justifyContent: "center"}}><CircularProgress/></div>
                    : loadUserError
                    ? <Alert style={{margin: "10px 0"}} severity="error">
                        <AlertTitle>User load Error:</AlertTitle>
                        {loadUserError}
                    </Alert> 
                    : <div>
                    	<Accordion disabled={"Cust1" !== params.type} style={{width: "100%"}}>
		                    <AccordionSummary
		                    onClick={() => {
		                        if(!openMovieTicketResource)fetchMovieTicketResource();
		                        setOpenMovieTicketResource(!openMovieTicketResource);
		                    }}
		                    expandIcon={<ExpandMore/>}
		                    >
		                        <Typography>MovieTicket</Typography>
		                    </AccordionSummary>
		                    <AccordionDetails style={{width: "100%"}}>
		                        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
		                            {loadMovieTicketResources
		                            ? <div style={{display: "flex", width: "100%", justifyContent: "center"}}><CircularProgress/></div>
		                            : loadErrorMovieTicketResources 
		                            ? <Alert style={{margin: "10px 0"}} severity="error">
		                                <AlertTitle>Error</AlertTitle>
		                                {loadErrorMovieTicketResources}
		                            </Alert> 
		                            : <div style={{width: "100%"}}>
		                                {submittingMovieTicketError 
		                                ?<Alert style={{margin: "10px 0"}} severity="error">
		                                    <AlertTitle>Error</AlertTitle>
		                                    {submittingMovieTicketError}
		                                </Alert> : null}
		                                <FormControl style={{width: "100%"}} variant="outlined">
		                                    <InputLabel id="demo-simple-select-outlined-label">Seat</InputLabel>
		                                    <Select variant="outlined" value={selectedMovieTicketResource} label={"Seat"} onChange={change => setSelectedMovieTicketResource(change.target.value as string)}>
		                                    {MovieTicketResource.map((ele, key) => {
		                                        return <MenuItem key={key} value={ele.id}>{ele.name}</MenuItem>
		                                    })}
		                                    </Select>
		                                </FormControl>
		                                <Collapse in={selectedMovieTicketResource ? true : false}>
		                                    <div style={{padding: "20px 0"}}>
		                                        {loadMovieTicketResourceSchedules
		                                        ? <div style={{display: "flex", width: "100%", justifyContent: "center"}}><CircularProgress/></div>
		                                        : <FormControl style={{width: "100%"}} variant="outlined">
		                                            <InputLabel id="demo-simple-select-outlined-label">RegularSeatSchedule</InputLabel>
		                                            <Select variant="outlined" value={selectedMovieTicketResourceSchedule} label={"RegularSeatSchedule"} onChange={change => setSelectedMovieTicketResourceSchedule(change.target.value as string)}>
		                                            {MovieTicketResource.filter(e => e.id === selectedMovieTicketResource)[0]?.schedules?.map((ele, key) => {
														return <MenuItem key={key} value={ele.id}>{ele.name}</MenuItem>
													})}
		                                            </Select>
		                                        </FormControl>
		                                        }
		                                        <Collapse in={selectedMovieTicketResourceSchedule ? true : false}>
		                                            <div style={{paddingTop: "20px", width: "100%"}}>
		                                                {submittingMovieTicket
		                                                ? <div style={{display: "flex", width: "100%", justifyContent: "center"}}><CircularProgress/></div>
		                                                : <Button style={{width: "100%"}} color="primary" variant="outlined" onClick={createMovieTicketBooking}>Book MovieTickett</Button>}
		                                            </div>
		                                        </Collapse>
		                                    </div>
		                                </Collapse>
		                            <div style={{padding:"10px"}}/>
		                            </div>}
		                        </div>
		                    </AccordionDetails>
		                </Accordion>
                    </div>}
                </div>
	        }

    return render();
}

export default BookingPage;
