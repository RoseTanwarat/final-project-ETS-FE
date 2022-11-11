import { BaseModel } from "./BaseModel";
import Question from "./Question";
 import User from "./User";

export class Quiz extends BaseModel {
    static get entity() {
      return "Quizzes";
    }
  
    static get fk() {
      return "quiz_id";
    }
  
    static fields() {
      return {
        id: this.attr(null),
        quiz_title: this.attr(null),
        quiz_total_score: this.attr(null),
        questions: this.hasMany(Question, 'quiz_id'),
        quiz_status: this.attr(null),
        teacher_id: this.attr(null),
        teacher: this.belongsTo(User, 'teacher_id'),
        created_at: this.attr(null),
        updated_at: this.attr(null),
        post_at: this.attr(null),
      };
    }
  
    static apiConfig = {
      actions: {
        titleQuiz(body = {}) {
          return this.post('/quizzes', body)
        },
        getQuiz(params = {}) {
          return this.get('/quizzes', {
            params: params
          })
        },
        getQuizById(id, params = {}) {
          return this.get(`/quizzes/${id}`, params)
        },
      },
    };
  }
  
  export default Quiz;