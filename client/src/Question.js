import React, { Component } from "react";
import { Link } from "@reach/router";
import PostAnswer from "./PostAnswer";

class Question extends Component {
  constructor(props) {
    super(props);
    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(event) {
    let answerId = event.currentTarget.dataset.id;
    //console.log(answerId);
    this.props.handleVote(this.props.id, answerId);
  }

  render() {
    let title = " ";
    let listAnswers = "";
    const question = this.props.getQuestion(this.props.id);
    if (question) {
      title = question.text;
      if (question.answers) {
        listAnswers = question.answers.map((answer, id) => (
          <div key={answer._id} id={answer._id} className="list-group ">
            <div className="row list-group-horizontal-md  mb-3">
              <div className="col-md-2 text-center list-group-item bg-light">
                <div className="text-center">
                  <i className="fa fa-heart fa-1x"></i>
                  {answer.votes}
                </div>
                <button
                  className="btn btn-info mb-1"
                  onClick={() =>
                    this.props.handleVote(this.props.id, answer._id)
                  }
                >
                  Vote up
                </button>
              </div>
              <div className="list-group-item col-md-10">{answer.text}</div>
            </div>
          </div>
        ));
      }
    }
    return (
      <div className="mt-5 mb-5">
        <div className="question card bg-cards text-center p-3 col-lg-4">
        <i className="fa fa-lightbulb-o fa-3x" aria-hidden="true"></i>
          <h4 className="card-title"> {title}</h4>
        </div>
        <div>
        <div className="mt-5 mb-5">
            <PostAnswer
              qid={this.props.id}
              postAnswer={(questionId, text) =>
                this.props.postAnswer(questionId, text)
              }
            />
          </div>

          <div>
            {listAnswers.length === 0 ? <p>No comments!</p> : listAnswers}
          </div>

       
        </div>
        <div className="mt-5">
          <Link to="/">
            <i className="fa fa-long-arrow-left fa-1x circle-icon"> </i>
          </Link>
        </div>
      </div>
    );
  }
}

export default Question;
