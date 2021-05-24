import React, { useState } from "react";
import { Button, Card, Checkbox, CircularProgress, Grid, TextField, MenuItem, Select, Typography, FormControl, InputLabel } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { httpGet, httpPost } from "../../../api/httpClient";
import ChipInput from 'material-ui-chip-input'
import { useMount } from "../../../lifeCycleExtensions";
import ChipList from "../../../components/Chiplist";
import { CreateRegularSeatScheduleRequestModel } from "../../../api/requestModels/CreateRegularSeatScheduleRequestModel";

const CreateRegularSeatSchedulePage = () => {
	
	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState<string>();
	const [error, setError] = useState<string>();
	const [success, setSuccess] = useState(false)
	const [name, setname] = useState<string>();
	const [startTimeEpoch, setstartTimeEpoch] = useState<number>();
	const [endTimeEpoch, setendTimeEpoch] = useState<number>();
	const [Description, setDescription] = useState<string>();
	

	const submit = async () => {
        setSubmitting(true);
        setError(undefined);
        setSuccess(false);

        const result = await httpPost<CreateRegularSeatScheduleRequestModel>("/RegularSeatSchedule", {
            name: name, startTimeEpoch: startTimeEpoch, endTimeEpoch: endTimeEpoch, Description: Description
        } as CreateRegularSeatScheduleRequestModel);

        if(result.isSuccess) {
setname("")
setstartTimeEpoch(undefined)
setendTimeEpoch(undefined)
setDescription("")
			setSuccess(true);
        } else {
			setError(result.statusCode +": "+ result.message);
        }

        setSubmitting(false);
    }
    
    const isNumber = (n: string | number): boolean => 
	            !isNaN(parseFloat(String(n))) && isFinite(Number(n));
	
	
	
	const renderBody = () => {
        if(loading) {
            return <div style={{width: "100%"}}><CircularProgress/></div>
        }
	
        return (
            <>
<TextField onChange={(e) => setname(e.target.value)} value={name} type="text" label="name" size="small" variant="outlined"></TextField>                 					
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setstartTimeEpoch(parseInt(e.target.value))} value={startTimeEpoch} type="number" label="startTimeEpoch" size="small" variant="outlined"></TextField>
<div style={{padding:"10px"}}/>
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setendTimeEpoch(parseInt(e.target.value))} value={endTimeEpoch} type="number" label="endTimeEpoch" size="small" variant="outlined"></TextField>
<div style={{padding:"10px"}}/>
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setDescription(e.target.value)} value={Description} type="text" label="Description" size="small" variant="outlined"></TextField>                 					
<div style={{padding:"10px"}}/>
	                    <div style={{padding:"10px"}}/>
	                    {submitting
	                    ? <div style={{width: "100%"}}><CircularProgress/></div>
	                    : <Button onClick={submit} variant="outlined" color="primary">Create</Button>}
            </>       
        )
    }
    
    const render = () => {
        return <div>
                    <Grid container style={{width: "100%", minHeight: "100vh"}} justify="center" alignItems="center">
                        <Grid item xs={10} sm={8} md={6} lg={4} xl={4}>
                            <Card style={{width: "100%", padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center"}}> 
                                <Typography style={{paddingBottom: "10px"}} variant="h5">Create RegularSeatSchedule</Typography>
                                {success
	                            ? <Alert style={{margin: "10px 0"}} severity="success">
	                                <AlertTitle>Success</AlertTitle>
	                                RegularSeatSchedule was created successfully
	                            </Alert>
	                            : null}
	                            {error || loadError
                                ? <Alert style={{margin: "10px 0"}} severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error ? error : loadError}
                                </Alert>
	                            : null}
	                            {loadError 
                                ? null
                                : renderBody()}
                            </Card>
                        </Grid>
                    </Grid>
                </div>
    }

    return render();
}

export default CreateRegularSeatSchedulePage;
