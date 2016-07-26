/**
 * Created by synerzip on 15/7/16.
 */
import React from 'react';
import CommentForm from 'components/CommentForm';
import CommentBox from 'components/CommentBox';
import {Button, Grid, Row, Col, Panel} from 'react-bootstrap'
import $ from 'jquery'
import Link from 'react-router'

export default class CommentApp extends React.Component {
  constructor(){
    super();
    this.state= {
      commentList: []
    };
  }
  apiCall(){
     $.get('http://jsonplaceholder.typicode.com/comments',function (success){
       this.setState({
         commentList: success
       })
    }.bind(this));
  }
  componentWillMount(){
    this.apiCall();
  }

  addComment= (obj) => {
    this.state.commentList.push(obj);
    this.setState({
      commentList: this.state.commentList
    });
  };

  removeComment = (id) => {
    let arr = this.state.commentList.filter(obj => {
      return obj.id !== id;
    });
    this.setState({
      commentList : arr
    });
  }


  render() {
    return (
        <div className="container">
          <CommentForm addComment={this.addComment} commentList = {this.state.commentList} />
          <CommentBox removeComment= {this.removeComment} commentList= {this.state.commentList} />
        </div>
    );
  }
}