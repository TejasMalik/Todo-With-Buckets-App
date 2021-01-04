import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import ListBucket from './components/ListBucket';
import BucketComponent from './components/BucketComponent';
import SearchByNameComponent from './components/SearchByNameComponent';
import NameComponent from './components/NameComponent';
import TodoComponent from './components/TodoComponent';


function App() {
  return (
    <div className="App">
      <h1>My Todo App</h1>
      <hr></hr>
      <Router>
        <Switch>
          <Route exact path="/" component={ListBucket} />
          <Route path="/bucketUpdate/:buckId" component={BucketComponent} />
          <Route path="/bucketAdd" component={BucketComponent}></Route>
          <Route path="/bucketSearchByName" component={SearchByNameComponent}></Route>
          <Route path="/bucketSearch/:buckName" component={NameComponent}></Route>


          <Route path="/todoAdd/:buckId" component={TodoComponent}></Route>
          <Route path="/todoUpdate/:buckId/:toId" component={TodoComponent}></Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
