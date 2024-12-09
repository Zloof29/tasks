import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import css from "./Header.module.css";

export function Header(): JSX.Element {
  return (
    <div className={css.Header}>
      <div className={css.Title}>
        Task manager
        <div className={css.User}>
          <UserMenu />
        </div>
      </div>
    </div>
  );
}
