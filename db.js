const mongoose = require("mongoose"); // We need the mongoose library

class Db {
  constructor() {
    const Schema = mongoose.Schema;

    //Define the structure of the Questions database, using Mongoose schema
    const ideaSchema = new Schema({
      text: String,
      answers: [{ text: String, votes: Number }]
    });

    //Compile Mongoose schema into a Question model
    //We need the singular name of the model
    this.ideaModel = mongoose.model("idea", ideaSchema);
  }

  async getQuestions() {
    try {
      return await this.ideaModel.find({});
    } catch (error) {
      console.error("getQuestions:", error.message);
      return {};
    }
  }

  async getQuestion(questionId) {
    try {
      return await this.ideaModel.findById(questionId);
    } catch (error) {
      console.error("getQuestion:", error.message);
      return {};
    }
  }

  async postQuestion(newQuestion) {
    // TODO: Error handling
    let question = new this.ideaModel(newQuestion);
    try {
      return question.save();
    } catch (error) {
      console.error("postQuestion:", error.message);
      return {};
    }
  }

  async postAnswer(questionId, answer) {
    // TODO: Error handling
    const question = await this.getQuestion(questionId);
    answer.votes = 0;
    question.answers.push(answer);

    try {
      return question.save();
    } catch (error) {
      console.error("postAnswer:", error.message);
      return {};
    }
  }

  getAnswer(question, answerId) {
    try {
      console.log(answerId);
      return question.answers.find(answer => answer._id == answerId);
    } catch (error) {
      console.error("getAnswer:", error.message);
      return {};
    }
  }

  async putVote(questionId, answerId) {
    // TODO: Error handling
    const question = await this.getQuestion(questionId);
    const answer = this.getAnswer(question, answerId);
    answer.votes = answer.votes + 1;

    return question.save();
  }

  /** Random test data to the database
   * This method adds a bunch of test data if the database is empty.
   * @param count The amount of questions to add.
   * @returns {Promise} Resolves when everything has been saved.
   */
   async randomQuestions(count = 3) {
    const answers = [
      { text: "This idea requires a lot of research", votes: 2 },
      { text: "I don't know if it's a good idea", votes: 3 },
      { text: "Can you give more details about this idea", votes: 0 }
    ];
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getRandomQuestion() {
      return [
        "Tourism app",
        "Danish-romanian dictionary",
        "9Gag for elder people"
      ][getRandomInt(0, 3)];
    }

    function getRandomAnswers() {
      const shuffled = answers.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, getRandomInt(1, shuffled.length));
    }

    let questionLength = (await this.getQuestions()).length;
    console.log("Question collection size:", questionLength);

    if (questionLength === 0) {
      let promises = [];

      for (let i = 0; i < count; i++) {
        let question = new this.ideaModel({
          text: getRandomQuestion(),
          answers: getRandomAnswers()
        });
        promises.push(question.save());
      }
      return Promise.all(promises);
    }
  } 
}

// We are exporting an async function named 'ConnectDb'.
// It only resolves when the database connection is ready.
// It resolves with an Db object instantiated from the class above.
// The Db object is used for all data access in this app.
module.exports.connectDb = async () => {
  const url = process.env.MONGO_URL ||  "mongodb://localhost/ideas-db";
  return mongoose
    .connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
      console.log("Ideas database connected");
      return new Db();
    })
    .catch(error => {
      console.error(error);
    });
};
