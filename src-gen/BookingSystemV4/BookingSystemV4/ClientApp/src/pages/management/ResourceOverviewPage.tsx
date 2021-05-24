import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";

const ResourceOverviewPage = () => {

    const history = useHistory();

    const render = () => {

        return <div style={{display: "flex", width: "100%", justifyContent: "center", flexDirection: "column", padding: "20px"}}>
            <Typography style={{textAlign: "center", width: "100%"}} variant="h2">System Resources</Typography>
            <Accordion>
            	                <AccordionSummary
            	                expandIcon={<ExpandMore/>}
            	                >
            	                    <Typography>Cust1s</Typography>
            	                </AccordionSummary>
            	                <AccordionDetails>
            	                    <div style={{display: "flex", flexDirection: "column"}}>
            	                        <Typography>
            	                            Resource description goes here, manage Cust1s below:
            	                        </Typography>
            	                        <div style={{paddingTop: "20px", display: "flex"}}>
            	                            <Button onClick={() => history.push("/management/Cust1_create")} variant="outlined" color="primary">Create Cust1</Button>
                                            <div style={{paddingRight: "10px"}}></div>
                                            <Button onClick={() => history.push("/management/Cust1s_overview")} variant="outlined" color="primary">Cust1s Overview</Button>
            	                        </div>
            	                    </div>
            	                </AccordionDetails>
            	            </Accordion>
            <Accordion>
            	                <AccordionSummary
            	                expandIcon={<ExpandMore/>}
            	                >
            	                    <Typography>VIPs</Typography>
            	                </AccordionSummary>
            	                <AccordionDetails>
            	                    <div style={{display: "flex", flexDirection: "column"}}>
            	                        <Typography>
            	                            Resource description goes here, manage VIPs below:
            	                        </Typography>
            	                        <div style={{paddingTop: "20px", display: "flex"}}>
            	                            <Button onClick={() => history.push("/management/VIP_create")} variant="outlined" color="primary">Create VIP</Button>
                                            <div style={{paddingRight: "10px"}}></div>
                                            <Button onClick={() => history.push("/management/VIPs_overview")} variant="outlined" color="primary">VIPs Overview</Button>
            	                        </div>
            	                    </div>
            	                </AccordionDetails>
            	            </Accordion>
            <Accordion>
            	                <AccordionSummary
            	                expandIcon={<ExpandMore/>}
            	                >
            	                    <Typography>CinemaHalls</Typography>
            	                </AccordionSummary>
            	                <AccordionDetails>
            	                    <div style={{display: "flex", flexDirection: "column"}}>
            	                        <Typography>
            	                            Resource description goes here, manage CinemaHalls below:
            	                        </Typography>
            	                        <div style={{paddingTop: "20px", display: "flex"}}>
            	                            <Button onClick={() => history.push("/management/CinemaHall_create")} variant="outlined" color="primary">Create CinemaHall</Button>
                                            <div style={{paddingRight: "10px"}}></div>
                                            <Button onClick={() => history.push("/management/CinemaHalls_overview")} variant="outlined" color="primary">CinemaHalls Overview</Button>
            	                        </div>
            	                    </div>
            	                </AccordionDetails>
            	            </Accordion>
            <Accordion>
            	                <AccordionSummary
            	                expandIcon={<ExpandMore/>}
            	                >
            	                    <Typography>RegularSeatSchedules</Typography>
            	                </AccordionSummary>
            	                <AccordionDetails>
            	                    <div style={{display: "flex", flexDirection: "column"}}>
            	                        <Typography>
            	                            Resource description goes here, manage RegularSeatSchedules below:
            	                        </Typography>
            	                        <div style={{paddingTop: "20px", display: "flex"}}>
            	                            <Button onClick={() => history.push("/management/RegularSeatSchedule_create")} variant="outlined" color="primary">Create RegularSeatSchedule</Button>
                                            <div style={{paddingRight: "10px"}}></div>
                                            <Button onClick={() => history.push("/management/RegularSeatSchedules_overview")} variant="outlined" color="primary">RegularSeatSchedules Overview</Button>
            	                        </div>
            	                    </div>
            	                </AccordionDetails>
            	            </Accordion>
            <Accordion>
            	                <AccordionSummary
            	                expandIcon={<ExpandMore/>}
            	                >
            	                    <Typography>Seats</Typography>
            	                </AccordionSummary>
            	                <AccordionDetails>
            	                    <div style={{display: "flex", flexDirection: "column"}}>
            	                        <Typography>
            	                            Resource description goes here, manage Seats below:
            	                        </Typography>
            	                        <div style={{paddingTop: "20px", display: "flex"}}>
            	                            <Button onClick={() => history.push("/management/Seat_create")} variant="outlined" color="primary">Create Seat</Button>
                                            <div style={{paddingRight: "10px"}}></div>
                                            <Button onClick={() => history.push("/management/Seats_overview")} variant="outlined" color="primary">Seats Overview</Button>
            	                        </div>
            	                    </div>
            	                </AccordionDetails>
            	            </Accordion>
        </div>
    }

    return render();
}

export default ResourceOverviewPage;
