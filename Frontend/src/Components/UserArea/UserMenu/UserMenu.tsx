import { useSelector } from "react-redux";
import css2 from "./UserMenu.module.css";
import { AppState } from "../../../Redux/store";
import { UserModel } from "../../../Models/UserModel";
import { NavLink } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/notify";
import { css } from "@emotion/react";

export function UserMenu(): JSX.Element {
  const user = useSelector<AppState, UserModel>((store) => store.user);

  function logout() {
    userService.logout();
    notify.success("Bye bye");
  }

  return (
    <div className={css2.UserMenu}>
      {!user && (
        <>
          <span>Hello Guest | </span>
          <NavLink className={css2.Register} to="/register">
            Register
          </NavLink>
          <span> | </span>
          <NavLink className={css2.LogIn} to="/login">
            Login
          </NavLink>
        </>
      )}

      {user && (
        <>
          <span>
            Hello {user.firstName} {user.lastName} |{" "}
          </span>
          <NavLink className={css2.LogOut} to="/logIn" onClick={logout}>
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}
