import { BaseModel } from "./BaseModel";
import Quiz from "./Quiz";
import Choice from "./Choice";

export class Question extends BaseModel {
  static get entity() {
    return "questions";
  }

  static get fk() {
    return "question_id";
  }

  static fields() {
    return {
      id: this.attr(null),
      question_type: this.attr(null),
      question_ans: this.attr(null),
      question_name: this.attr(null),
      // question_choice1: this.attr(null),
      // question_choice2: this.attr(null),
      // question_choice3: this.attr(null),
      question_choice: this.hasMany(Choice, 'question_id'),
      question_score: this.attr(null),
      quiz_id: this.attr(null),
      quiz: this.belongsTo(Quiz,'quiz_id'),
      // post_at: this.attr(null),
    };
  }

  static apiConfig = {
    actions: {
      postQuestions(body = {}) {
            return this.post('/questions', body)  
      },
      getQuestions() {
        return this.get('/questions')
      },
      getQuestionById(id, params = {}) {
        return this.get(`/questions/${id}`, params)
      },
    },
  };
}

export default Question;