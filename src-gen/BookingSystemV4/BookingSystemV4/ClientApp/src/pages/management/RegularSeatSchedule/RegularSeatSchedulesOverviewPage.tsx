import { Button, Card, CircularProgress, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { httpGet, httpDelete } from "../../../api/httpClient";
import { useHistory } from "react-router";
import { useMount } from "../../../lifeCycleExtensions";
import { RegularSeatSchedule } from "../../../api/models/schedules/RegularSeatSchedule";
import { Alert, AlertTitle } from "@material-ui/lab";

const RegularSeatSchedulesOverviewPage = () => {

		const history = useHistory()

    	const [loading, setLoading] = useState(false);
        const [error, setError] = useState<String>();
        const [RegularSeatScheduleResult, setRegularSeatScheduleResult] = useState<RegularSeatSchedule[]>([])
    	const [deleting, setDeleting] = useState<String[]>([])
    
        useMount(() => {
            fetchData();
        })
    
        const fetchData = async () => {
    
            setLoading(true);
            var result = await httpGet<RegularSeatSchedule[]>("/RegularSeatSchedule")
    
            if(result.isSuccess) {
                setRegularSeatScheduleResult(result.data);
            } else {
                setError(result.message)
            }
    
            setLoading(false);
        }
        
        const deleteEntity = async (id: String) => {
                
	                if(!deleting.includes(id)) {
	                    setDeleting([...deleting, id]);
	                }
	        
	                var result = await httpDelete<boolean>(`/RegularSeatSchedule?id=${id}`)
	                
	                if(result.isSuccess) {
                    	RegularSeatScheduleResult.splice(RegularSeatScheduleResult.indexOf(RegularSeatScheduleResult.filter(e => e.id === id)[0]),1)
                    	setRegularSeatScheduleResult([...RegularSeatScheduleResult]);
	                } 
	                
	                if(!deleting.includes(id)) {
	                    deleting.splice(deleting.indexOf(id), 1)
	                    setDeleting([...deleting])
	                }
	            }
    
        const renderBody = () => {
            return (
                <div style={{width: "100%", paddingTop: "20px"}}>
                    <Grid container justify="center">
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{padding: "20px"}}>
                            <div style={{width: "100%", display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                <Typography variant="h4">RegularSeatSchedule overview</Typography>
                                <Card>
                                    <TableContainer style={{margin: "20px 0", padding: "20px", overflow: "true"}}>
                                        <Table aria-label="simple table">
                                            <TableHead>
                                            <TableRow>
                                            	<TableCell >name</TableCell>
                                            	<TableCell align="right">startTimeEpoch</TableCell>
                                            	<TableCell align="right">endTimeEpoch</TableCell>
                                            	<TableCell >Description</TableCell>
                                            	<TableCell></TableCell>
                                            	<TableCell></TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {RegularSeatScheduleResult.map((row) => (
                                                <TableRow key={row.id}>
                                                	<TableCell >
                                                		{row.name}
                                                	</TableCell>
                                                	<TableCell align="right">
                                                		{row.startTimeEpoch}
                                                	</TableCell>
                                                	<TableCell align="right">
                                                		{row.endTimeEpoch}
                                                	</TableCell>
                                                	<TableCell >
                                                		{row.Description}
                                                	</TableCell>
                                                    <TableCell>
                                                    	<Button color="primary" variant="outlined" onClick={() => history.push(`/management/RegularSeatSchedule_update/${row.id}`)}>Edit</Button>
                                                    </TableCell>
                                            		<TableCell>
                                            			{deleting.includes(row.id)
                                            			? <div style={{display: "flex", width: "100%"}}>
	                                                        <CircularProgress/>
	                                                    </div>
                                            			: <Button color="primary" variant="outlined" onClick={() => deleteEntity(row.id)}>Delete</Button>
                                            			}
                                            		</TableCell>
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Card>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    
        const render = () => {
            return <div style={{display: "flex", width: "100%"}}>
                {loading
                ? <div><CircularProgress/></div>
                : renderBody()}
            </div>
        }
    
        return render();
}

export default RegularSeatSchedulesOverviewPage;
