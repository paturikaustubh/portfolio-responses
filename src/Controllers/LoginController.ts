export class LoginController {
  private _username = "";
  private _password = "";
  private _setAuthenticated: React.Dispatch<React.SetStateAction<boolean>> =
    () => {};

  constructor(setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>) {
    this._setAuthenticated = setAuthenticated;
  }

  public handleLogin = () =>
    this._username.trim() === import.meta.env.VITE_USERNAME &&
    this._password.trim() === import.meta.env.VITE_PASSWORD;

  public handleUsernameChange = (username: string) =>
    (this._username = username);

  public handlePasswordChange = (password: string) =>
    (this._password = password);

  public logOut = () => {
    this._setAuthenticated(false);
    sessionStorage.setItem("authenticated", "false");
  };
}
