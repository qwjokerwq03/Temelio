import Header from './components/Header/Header';
import EmailTemplate from './components/EmailTemplate/EmailTemplate';
import SendEmails from './components/SendEmails/SendEmails';
import FoundationList from './components/FoundationList/FoundationList';

import './App.css';
import SideNav from './components/SideNav/SideNav';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NonprofitList from './components/NonprofitList/NonprofitList';
import Dashboard from './components/Dashboard/Dashboard';
import SentEmails from './components/SentEmails/SentEmails';

const App = () =>{
  return (
    <Router>
    <div className="App">
      <Header />

      <div className='container'>
      <SideNav />
      <div className='content'>
        <Switch>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/email-template">
              <EmailTemplate />
            </Route>
            <Route path="/send-emails">
              <SendEmails />
            </Route>
            <Route path="/foundations">
              <FoundationList />
            </Route>
            <Route path="/nonprofits">
              <NonprofitList />
            </Route>
            <Route path="/sent-emails">
              <SentEmails />
            </Route>
          </Switch>
          </div>

      </div>
    </div>
    </Router>
  );
}

export default App;
