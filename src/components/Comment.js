/**
 * Created by synerzip on 15/7/16.
 */
import React from 'react';

export default class Comment extends React.Component {
  deleteComment = (event) => {
    event.preventDefault();
    let key= this.props.id;
    this.props.deleteComment(key);
  }
  render() {
    return (
        <div className="comment">
          <div className="comment-header">Author : {this.props.author}</div>
          <br />
          <div className="comment-body">
                        {this.props.body}
          </div>
          <div className="comment-footer">
            <button  type="button" onClick={this.deleteComment.bind( this)} className ="comment-footer-delete pull-right">
              Delete comment
            </button>
          </div>
        </div>
    );
  }
}