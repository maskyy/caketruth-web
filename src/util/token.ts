import jwtDecode from "jwt-decode";
import { AuthResponse } from "../types/api";

interface DecodedToken {
  exp: number;
  iat: number;
  jti: string;
  token_type: "access" | "refresh";
  user_id: number;
}

export class Token {
  private static _access = "ct-access";
  private static _refresh = "ct-refresh";
  private static _id = "ct-id";

  private static getItem = (name: string) => localStorage.getItem(name) ?? "";

  static getAccess = () => this.getItem(this._access);
  static getRefresh = () => this.getItem(this._refresh);
  static getId = () => Number(this.getItem(this._id));

  static save = ({ access, refresh }: AuthResponse) => {
    localStorage.setItem(this._access, access);
    localStorage.setItem(this._refresh, refresh);
    localStorage.setItem(this._id, jwtDecode<DecodedToken>(access).user_id.toString());
  }

  static drop = () => {
    localStorage.removeItem(this._access);
    localStorage.removeItem(this._refresh);
    localStorage.removeItem(this._id);
  }
}
