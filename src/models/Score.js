import { BaseModel } from "./BaseModel";
import Quiz from "./Quiz";
import User from "./User";

export class Score extends BaseModel {
  static get entity() {
    return "scores";
  }

  static get fk() {
    return "score_id";
  }

  static fields() {
    return {
        id: this.attr(null),
        student_score: this.attr(null),
        student_id: this.attr(null),
        student: this.belongsTo(User, 'student_id'),
        quiz_id: this.attr(null),
        quiz: this.belongsTo(Quiz,'quiz_id'),
        
    };
  }

  static apiConfig = {
    actions: {
          postScores(body = {}) {
            return this.post('/scores',body)
          },
          getScores() {
            return this.get('/scores')
        }
    },
  };
}

export default Score;
