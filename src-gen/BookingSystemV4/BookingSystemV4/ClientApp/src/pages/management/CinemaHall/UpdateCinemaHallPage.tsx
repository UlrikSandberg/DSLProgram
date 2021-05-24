import React, { useState } from "react";
import { Button, Card, Checkbox, CircularProgress, Grid, TextField, MenuItem, Select, Typography, FormControl, InputLabel } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { httpGet, httpPost, httpPut } from "../../../api/httpClient";
import ChipInput from 'material-ui-chip-input'
import { useMount } from "../../../lifeCycleExtensions";
import ChipList from "../../../components/Chiplist";
import { useParams } from "react-router";
import { UpdateCinemaHallRequestModel } from "../../../api/requestModels/UpdateCinemaHallRequestModel"
import { CinemaHall } from "../../../api/models/entities/CinemaHall";
import {Seat} from "../../../api/models/resources/Seat"

const UpdateCinemaHallPage = () => {

const params = useParams() as { id: string }

	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState<string>();
	const [error, setError] = useState<string>();
	const [success, setSuccess] = useState(false)
	const [name, setname] = useState<string>();
	const [code, setcode] = useState<number>();
	const [seats, setseats] = useState<Seat[]>([])
	const [seatsResult, setseatsResult] = useState<Seat[]>([])
	const [loadResult, setLoadResult] = useState<CinemaHall>();
	
	useMount(() => {
        load();
    })
    
    const load = async () => {
	            setLoading(true);
	    
	            const result = await httpGet<CinemaHall>(`/CinemaHall/${params.id}`)
	            if(result.isSuccess) {
	                setLoadResult(result.data)
setname(result.data.name)
setcode(result.data.code)
setseats(result.data.seats)
	                downloadRelationData()
	            } else {
	                setLoadError(result.message)
	            }
	            setLoading(false);
	        }
	        
	        
	            const downloadRelationData = async () => {
	            	setLoading(true);
	        		const seatsResponse = await httpGet<Seat[]>("/Seat")
	        		if(seatsResponse.isSuccess) {
	        			setseatsResult(seatsResponse.data)
	        		} else {
	        			setLoadError("Loading failed!")
	        		}
	        		
	        		setLoading(false);
	            }
	
	const submit = async () => {
        setSubmitting(true);
        setError(undefined);
        setSuccess(false);

        const result = await httpPut<UpdateCinemaHallRequestModel>("/CinemaHall", {
        	id: params.id,
            name: name, code: code, seats: seats
        } as UpdateCinemaHallRequestModel);

        if(result.isSuccess) {
        	setSuccess(true);
        } else {
			setError(result.statusCode +": "+ result.message);
        }

        setSubmitting(false);
    }
    
    const isNumber = (n: string | number): boolean => 
	            !isNaN(parseFloat(String(n))) && isFinite(Number(n));
	
	const updateseats = (item: Seat, add: boolean) => {
		if(add) {
			seats.push(item);
		} else {
			seats.splice(seats.indexOf(item), 1)
		} 
		setseats([...seats]);
	}
	

    const renderBody = () => {
        if(loading) {
            return <div style={{width: "100%"}}><CircularProgress/></div>
        }
	
        return (
            <>
<TextField onChange={(e) => setname(e.target.value)} value={name} type="text" label="name" size="small" variant="outlined"></TextField>                 					
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setcode(parseInt(e.target.value))} value={code} type="number" label="code" size="small" variant="outlined"></TextField>
<div style={{padding:"10px"}}/>
<div style={{padding:"10px"}}/>
<ChipList selectedItems={seats.map(e => e.id)} onRemoveItem={(item) => updateseats(seats.filter(e => e.id === item)[0], false)}></ChipList>
<FormControl variant="outlined">
<InputLabel id="demo-simple-select-outlined-label">seats</InputLabel>
<Select variant="outlined" value={''} label={"seats"} onChange={(value) => updateseats(seatsResult.filter(e => e.id === value.target.value as string)[0], true)}>
	{seatsResult.filter(f => !seats.map(e => e.id).includes(f.id)).map((ele, key) => {
		return <MenuItem key={key} value={ele.id}>{ele.name}</MenuItem>
	})}
</Select>
</FormControl>
<div style={{padding:"10px"}}/>
                    <div style={{padding:"10px"}}/>
                    {submitting
                    ? <div style={{width: "100%"}}><CircularProgress/></div>
                    : <Button onClick={submit} variant="outlined" color="primary">Update</Button>}
            </>       
        )
    }
    
    const render = () => {
        return <div>
                    <Grid container style={{width: "100%", minHeight: "100vh"}} justify="center" alignItems="center">
                        <Grid item xs={10} sm={8} md={6} lg={4} xl={4}>
                            <Card style={{width: "100%", padding: "20px", display: "flex", justifyContent: "center", flexDirection: "column", textAlign: "center"}}> 
                                <Typography style={{paddingBottom: "10px"}} variant="h5">Update CinemaHall</Typography>
                                {success
	                            ? <Alert style={{margin: "10px 0"}} severity="success">
	                                <AlertTitle>Success</AlertTitle>
	                                CinemaHall was updated successfully
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

export default UpdateCinemaHallPage;
