/**
 * Created by synerzip on 15/7/16.
 */
import React from 'react'
import Comment from 'components/Comment.js'

export default class CommentBox extends React.Component {
  constructor(){
    super();
    this.state = {
      showComments: false
    };
  }
  _getComments(){
    const commentList = this.props.commentList;

    return commentList.map((comment) => {
      return (
          <Comment
              author={comment.author} body={comment.body}  deleteComment= {this.props.removeComment}  id= {comment.id} key= {comment.id} />
      );
    })
  }

  _getCommentsTitle(commentCount) {
    if (commentCount === 0) {
      return 'No comments yet';
    } else if (commentCount === 1) {
      return '1 Comment';
    } else {
      return `${commentCount} Comments`;
    }
  }

  _handleClick(){
    this.setState({
      showComments: !this.state.showComments
    });
  }


  render() {
    const comments = this._getComments();
    let commentNodes;
    let buttonText = 'Show comments';
    if (this.state.showComments) {
      buttonText = 'HIDE COMMENTS';
    }else{
      buttonText = 'SHOW COMMENTS';
    }
    if(this.state.showComments){
      commentNodes = <div className="comment-list"> {comments}</div>
    }
    return (
        <div className="comment-box">
          <div className="comment-box-header">
            <h3>
                        {this._getCommentsTitle(comments.length)}
              <button className="btn pull-right" onClick={this._handleClick.bind(this)}>{buttonText}</button>
            </h3>
          </div>

                {commentNodes}
        </div>
    );
  }
}