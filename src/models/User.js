import { BaseModel } from "./BaseModel";
import Role from "./Role";

export class User extends BaseModel {
  static get entity() {
    return "users";
  }

  static get fk() {
    return "user_id";
  }

  static fields() {
    return {
      id: this.attr(null),
      email: this.attr(null),
      user_role_id: this.attr(null),
      user_role: this.belongsTo(Role, 'user_role_id'),
    };
  }

  static apiConfig = {
    actions: {
      getUsers(params = {}) {
        return this.get('/users', {
          params
        })
      },

      register(body = {}) {
        return this.post('/users', body)  
      },
    },
  };
}

export default User;
