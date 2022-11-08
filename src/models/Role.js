import { BaseModel } from "./BaseModel";
import User from "./User";

export class Role extends BaseModel {
  static get entity() {
    return "userRoles";
  }

  static get fk() {
    return "user_role_id";
  }

  static fields() {
    return {
      id: this.attr(null),
      role_name: this.attr(null),
      user_ids: this.attr(null),
      users: this.hasManyBy(User, 'user_ids', 'user_role_id'),
      created_at: this.attr(null),
      updated_at: this.attr(null),
    };
  }

  static apiConfig = {
    actions: {
      getRoles() {
        return this.get('/user-roles')
      }
    },
  };
}

export default Role;
