import { BaseModel } from "./BaseModel";
import Question from "./Question";

export class Choice extends BaseModel {
  static get entity() {
    return "choices";
  }

  static get fk() {
    return "choice_id";
  }

  static fields() {
    return {
      id: this.attr(null),
      choice: this.attr(null),
      question_id: this.attr(null),
      question: this.belongsTo(Question,'question_id'),
      created_at: this.attr(null),
      updated_at: this.attr(null),
    };
  }

  static apiConfig = {
    actions: {
      getChoice() {
        return this.get('/choices')
          },
      postChoice(body = {}) {
            return this.post('/choices', body)  
      }, 
    },
  };
}

export default Choice;