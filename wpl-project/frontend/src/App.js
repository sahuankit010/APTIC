import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Home from './Home';
import PropertyDetails from './PropertyDetails';
import Favourites from './Favourites';
import UserContext from './User';
import Reservations from './Reservations';
import UserSignup from './UserSignup';
import Login from './Login';
import Logout from './Logout';
import ConfirmReservation from "./ConfirmReservation";
import HostDashboard from "./HostDashboard";
import HostAddProperty from "./HostAddProperty";
import HostEditProperty from "./HostEditProperty";
import HostRegistration from "./HostRegistration";

const userId = localStorage.getItem("userId")


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/usersignup" component={UserSignup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />


          <UserContext.Provider value={userId}>
            <Route exact path="/" component={Home} />
            <Route exact path="/propertyDetails" component={PropertyDetails} />
            <Route exact path="/propertyDetails/confirmreservation" component={ConfirmReservation} />
            <Route exact path="/favourites" component={Favourites} />
            <Route exact path="/reservations" component={Reservations} />
            <Route exact path="/hostRegistration" component={HostRegistration} />
            <Route exact path="/hostDashboard" component={HostDashboard} />
            <Route exact path="/addProperty" component={HostAddProperty} />
            <Route exact path="/editProperty" component={HostEditProperty} />
          </UserContext.Provider>

          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;