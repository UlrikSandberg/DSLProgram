import React, { useState } from "react";
import { Button, Card, Checkbox, CircularProgress, Grid, TextField, MenuItem, Select, Typography, FormControl, InputLabel } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { httpGet, httpPost, httpPut } from "../../../api/httpClient";
import ChipInput from 'material-ui-chip-input'
import { useMount } from "../../../lifeCycleExtensions";
import ChipList from "../../../components/Chiplist";
import { useParams } from "react-router";
import { UpdateVIPRequestModel } from "../../../api/requestModels/UpdateVIPRequestModel"
import { VIP } from "../../../api/models/customers/VIP";

const UpdateVIPPage = () => {

const params = useParams() as { id: string }

	const [submitting, setSubmitting] = useState(false);
	const [loading, setLoading] = useState(false);
	const [loadError, setLoadError] = useState<string>();
	const [error, setError] = useState<string>();
	const [success, setSuccess] = useState(false)
	const [VIPMember, setVIPMember] = useState<string>();
	const [loadResult, setLoadResult] = useState<VIP>();
	
	useMount(() => {
        load();
    })
    
    const load = async () => {
	            setLoading(true);
	    
	            const result = await httpGet<VIP>(`/VIP/${params.id}`)
	            if(result.isSuccess) {
	                setLoadResult(result.data)
setVIPMember(result.data.VIPMember)
	            } else {
	                setLoadError(result.message)
	            }
	            setLoading(false);
	        }
	        
	
	const submit = async () => {
        setSubmitting(true);
        setError(undefined);
        setSuccess(false);

        const result = await httpPut<UpdateVIPRequestModel>("/VIP", {
        	id: params.id,
            VIPMember: VIPMember
        } as UpdateVIPRequestModel);

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
<TextField onChange={(e) => setVIPMember(e.target.value)} value={VIPMember} type="text" label="VIPMember" size="small" variant="outlined"></TextField>                 					
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
                                <Typography style={{paddingBottom: "10px"}} variant="h5">Update VIP</Typography>
                                {success
	                            ? <Alert style={{margin: "10px 0"}} severity="success">
	                                <AlertTitle>Success</AlertTitle>
	                                VIP was updated successfully
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

export default UpdateVIPPage;
