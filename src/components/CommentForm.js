/**
 * Created by synerzip on 15/7/16.
 */
import React from 'react';

export default class CommentForm extends React.Component {
  _handleSubmit(event){
    event.preventDefault();
    let comment_id = this.props.commentList.length + 1;
    this.props.addComment({id:comment_id ,name: this._author.value, body: this._body.value});
    this._author.value = "";
    this._body.value = "";

  }
  render() {
    return (
        <form onSubmit={this._handleSubmit.bind(this)}>
          <div className="form-area" >
            <div className="new-comment">New Comment</div>
            <label className="label">Author</label>
            <input type="text"
                className="form-control"
                ref={(input) => this._author = input}
                id="name"
                name="name"
                placeholder="Name:" />
            <br />
            <label className="label">Comment</label>
            <textarea
                className="form-control"
                type="textarea"
                ref={(textarea) => this._body = textarea}
                placeholder="Comment:"
                id="message"
                maxLength="140"
                rows="7">
            </textarea>
            <button className="btn" >Add Comment</button>
          </div>
        </form>
    );
  }
}