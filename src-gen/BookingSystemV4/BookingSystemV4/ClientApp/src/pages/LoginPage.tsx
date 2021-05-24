import { Button, Card, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { httpGet } from "../api/httpClient";
import { Cust1 } from "../api/models/customers/Cust1";
import { VIP } from "../api/models/customers/VIP";
import { useMount } from "../lifeCycleExtensions";

const LoginPage = () => {

    const history = useHistory();
    
	        const [loading, setLoading] = useState(false);
	        const [error, setError] = useState<string>();
	        const [selectedId, setSelectedId] = useState<string>('');
	        const [selectedType, setSelectedType] = useState<string>("");
	    
const [Cust1Result, setCust1Result] = useState<Cust1[]>([]);
const [VIPResult, setVIPResult] = useState<VIP[]>([]);

    useMount(() => {
	            fetchCustomers();
	        })
	    
	        const fetchCustomers = async () => {
	    
	            setLoading(true)
	    		
	    		const Cust1Result = await httpGet<Cust1[]>("/Cust1")
	    		const VIPResult = await httpGet<VIP[]>("/VIP")
	    
	            if(Cust1Result.isSuccess && VIPResult.isSuccess) {
	    			setCust1Result(Cust1Result.data);
	    			setVIPResult(VIPResult.data);
	            } else {
	                setError("Fetching customers failed");
	            }
	    
	            setLoading(false)        
	        }

    const renderBody = () => {
	            if(loading) {
	                return (
	                    <div style={{display: "flex", width: "100%"}}>
	                        <CircularProgress/>
	                    </div>
	                )
	            }
	    
	            return (
	                <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
<FormControl variant="outlined">
	                    	<InputLabel id="demo-simple-select-outlined-label">Cust1</InputLabel>
	                        <Select variant="outlined" label={"Cust1"} value={selectedId} onChange={e => {
								setSelectedId(e.target.value as string)
								setSelectedType("Cust1")
							}}>
							{Cust1Result.map((ele, key) => {
								return <MenuItem key={key} value={ele.id}>{ele.name}</MenuItem>
							})}
	                    	</Select>
	                    </FormControl>
	                    <div style={{paddingBottom: "20px", width: "100%"}}/> 
<FormControl variant="outlined">
	                    	<InputLabel id="demo-simple-select-outlined-label">VIP</InputLabel>
	                        <Select variant="outlined" label={"VIP"} value={selectedId} onChange={e => {
								setSelectedId(e.target.value as string)
								setSelectedType("VIP")
							}}>
							{VIPResult.map((ele, key) => {
								return <MenuItem key={key} value={ele.id}>{ele.id}</MenuItem>
							})}
	                    	</Select>
	                    </FormControl>
	                    <div style={{paddingBottom: "20px", width: "100%"}}/> 
	                    <div style={{paddingBottom: "20px", width: "100%"}}>    
	                        <Button style={{width: "100%"}} variant="outlined" color="primary" onClick={() => {
	                            if(selectedId) {
	                                history.push(`/booking/${selectedId}/${selectedType}`)
	                            }
	                        }}>Login</Button>
	                    </div>
	                    <div style={{cursor: "pointer"}} onClick={() => history.push(`/management/overview`)}>Management Overview</div>
	                </div>
	            )
	        }
	    
	        const render = () => {
	            return <div>
	                <Grid container style={{width: "100%", minHeight: "100vh"}} justify="center" alignItems="center">
	                    <Grid item xs={10} sm={8} md={6} lg={4} xl={4}>
	                        <Card style={{width: "100%", padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center"}}> 
	                            <Typography style={{paddingBottom: "10px"}} variant="h5">Login</Typography>
	                            {error
	                            ? <Alert style={{margin: "10px 0"}} severity="error">
	                                <AlertTitle>Error</AlertTitle>
	                                {error}
	                            </Alert>
	                            : renderBody()}
	                        </Card>
	                    </Grid>
	                </Grid>
	            </div>
	        }
	    
	        return render();
}

export default LoginPage;
