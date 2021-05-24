import React, { useState } from "react";
import { Button, Card, Checkbox, CircularProgress, Grid, TextField, MenuItem, Select, Typography, FormControl, InputLabel } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { httpGet, httpPost, httpPut } from "../../../api/httpClient";
import ChipInput from 'material-ui-chip-input'
import { useMount } from "../../../lifeCycleExtensions";
import ChipList from "../../../components/Chiplist";
import { useParams } from "react-router";
import { UpdateCust1RequestModel } from "../../../api/requestModels/UpdateCust1RequestModel"
import { Cust1 } from "../../../api/models/customers/Cust1";

const UpdateCust1Page = () => {

const params = useParams() as { id: string }

	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState<string>();
	const [error, setError] = useState<string>();
	const [success, setSuccess] = useState(false)
	const [name, setname] = useState<string>();
	const [isVip, setisVip] = useState<boolean>(false);
	const [somearray, setsomearray] = useState<string[]>([]);
	const [minAge, setminAge] = useState<number>();
	const [age, setage] = useState<number>();
	const [maxAge, setmaxAge] = useState<number>();
	const [loadResult, setLoadResult] = useState<Cust1>();
	
	useMount(() => {
        load();
    })
    
    const load = async () => {
	            setLoading(true);
	    
	            const result = await httpGet<Cust1>(`/Cust1/${params.id}`)
	            if(result.isSuccess) {
	                setLoadResult(result.data)
setname(result.data.name)
setisVip(result.data.isVip)
setsomearray(result.data.somearray)
setminAge(result.data.minAge)
setage(result.data.age)
setmaxAge(result.data.maxAge)
	            } else {
	                setLoadError(result.message)
	            }
	            setLoading(false);
	        }
	        
	
	const submit = async () => {
        setSubmitting(true);
        setError(undefined);
        setSuccess(false);

        const result = await httpPut<UpdateCust1RequestModel>("/Cust1", {
        	id: params.id,
            name: name, isVip: isVip, somearray: somearray, minAge: minAge, age: age, maxAge: maxAge
        } as UpdateCust1RequestModel);

        if(result.isSuccess) {
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
<div style={{display: "flex", alignItems: "center"}}>
                    <Checkbox onChange={e => setisVip(e.target.checked)} value={isVip}/> isVip
                </div>
                <div style={{padding:"10px"}}/>
<div style={{padding:"10px"}}/>
<ChipInput label={"somearray"} variant="outlined" onChange={(chips) => setsomearray(chips)}/>
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setminAge(parseInt(e.target.value))} value={minAge} type="number" label="minAge" size="small" variant="outlined"></TextField>
<div style={{padding:"10px"}}/>
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setage(parseInt(e.target.value))} value={age} type="number" label="age" size="small" variant="outlined"></TextField>
<div style={{padding:"10px"}}/>
<div style={{padding:"10px"}}/>
<TextField onChange={(e) => setmaxAge(parseInt(e.target.value))} value={maxAge} type="number" label="maxAge" size="small" variant="outlined"></TextField>
<div style={{padding:"10px"}}/>
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
                                <Typography style={{paddingBottom: "10px"}} variant="h5">Update Cust1</Typography>
                                {success
	                            ? <Alert style={{margin: "10px 0"}} severity="success">
	                                <AlertTitle>Success</AlertTitle>
	                                Cust1 was updated successfully
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

export default UpdateCust1Page;
