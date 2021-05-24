import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter as Router} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import BookingPage from '../pages/BookingPage';
import ResourceOverviewPage from '../pages/management/ResourceOverviewPage';
import UserPage from '../pages/UserPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import Cust1sOverviewPage from '../pages/management/Cust1/Cust1sOverviewPage';
import UpdateCust1Page from '../pages/management/Cust1/UpdateCust1Page';
import CreateCust1Page from '../pages/management/Cust1/CreateCust1Page';
import VIPsOverviewPage from '../pages/management/VIP/VIPsOverviewPage';
import UpdateVIPPage from '../pages/management/VIP/UpdateVIPPage';
import CreateVIPPage from '../pages/management/VIP/CreateVIPPage';
import CinemaHallsOverviewPage from '../pages/management/CinemaHall/CinemaHallsOverviewPage';
import UpdateCinemaHallPage from '../pages/management/CinemaHall/UpdateCinemaHallPage';
import CreateCinemaHallPage from '../pages/management/CinemaHall/CreateCinemaHallPage';
import RegularSeatSchedulesOverviewPage from '../pages/management/RegularSeatSchedule/RegularSeatSchedulesOverviewPage';
import UpdateRegularSeatSchedulePage from '../pages/management/RegularSeatSchedule/UpdateRegularSeatSchedulePage';
import CreateRegularSeatSchedulePage from '../pages/management/RegularSeatSchedule/CreateRegularSeatSchedulePage';
import SeatsOverviewPage from '../pages/management/Seat/SeatsOverviewPage';
import UpdateSeatPage from '../pages/management/Seat/UpdateSeatPage';
import CreateSeatPage from '../pages/management/Seat/CreateSeatPage';

const App = () => {

  const render = () => {
    return <Router>
      <Switch>
      	<Route exact path="/management/Cust1s_overview" component={Cust1sOverviewPage}/>
      			      	<Route exact path="/management/Cust1_update/:id" component={UpdateCust1Page}/>
      			      	<Route exact path="/management/Cust1_create" component={CreateCust1Page}/>
      	<Route exact path="/management/VIPs_overview" component={VIPsOverviewPage}/>
      			      	<Route exact path="/management/VIP_update/:id" component={UpdateVIPPage}/>
      			      	<Route exact path="/management/VIP_create" component={CreateVIPPage}/>
      	<Route exact path="/management/CinemaHalls_overview" component={CinemaHallsOverviewPage}/>
      			      	<Route exact path="/management/CinemaHall_update/:id" component={UpdateCinemaHallPage}/>
      			      	<Route exact path="/management/CinemaHall_create" component={CreateCinemaHallPage}/>
      	<Route exact path="/management/RegularSeatSchedules_overview" component={RegularSeatSchedulesOverviewPage}/>
      			      	<Route exact path="/management/RegularSeatSchedule_update/:id" component={UpdateRegularSeatSchedulePage}/>
      			      	<Route exact path="/management/RegularSeatSchedule_create" component={CreateRegularSeatSchedulePage}/>
      	<Route exact path="/management/Seats_overview" component={SeatsOverviewPage}/>
      			      	<Route exact path="/management/Seat_update/:id" component={UpdateSeatPage}/>
      			      	<Route exact path="/management/Seat_create" component={CreateSeatPage}/>
      	<Route exact path="/management/overview" component={ResourceOverviewPage}/>
        <Route exact path="/booking/:id/:type" component={BookingPage}/>
        <Route exact path="/userpage/:id/:type" component={UserPage}/>
        		<Route exact path="/bookingoverview/:id/:type" component={BookingOverviewPage}/>
        		<Route exact path="/login" component={LoginPage}/>
        		<Redirect to="/login"/>
      </Switch>
    </Router>
  }

  return render();

}

export default App;
