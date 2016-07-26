import './styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from 'components/HelloWorld.js'
import StoryBox from 'components/StoryBox.js'
import CommentApp from 'components/CommentApp.js'
import Todo from 'components/ReduxTodoEx.js'
import {createStore} from 'redux'
import Counter from 'components/CounrerReduxEx.js'
import Provider from 'react-redux';
import {Router, Route, Link, browserHistory,IndexRoute } from 'react-router'
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'

import {Button, Grid, Row, Col, Panel} from 'react-bootstrap'




class App extends React.Component {
  render () {
    return (
        <Panel>
          <Grid>
            <Row className="border" >
              <Col className="margin" xs={6} sm={6} md={6} lg={6} xsOffset={3} smOffset={3} mdOffset={3} lgOffset={3}>
                <HelloWorld />
              </Col>
              <Col className="margin" xs={6} sm={6} md={6} lg={6} xsOffset={3} smOffset={3} mdOffset={3} lgOffset={3}>
                <Link to="/react"><Button bsStyle="info" type="button">Comments Section</Button> </Link>
              </Col>

            </Row>
          </Grid>
        </Panel>
    );
  }
}


  ReactDOM.render(
        <Router history={browserHistory}>
          <Route path="/" component ={App} >
            <IndexRoute component={CommentApp}/>
          </Route>
          <Route path="/react" component ={CommentApp} />
          <Route path="/redux" component ={Counter} />
        </Router>,
      document.getElementById('app')
  )




