import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import css from "./Layout.module.css";

export function Layout(): JSX.Element {
    return (
        <div className={css.Layout}>
			<header className={css.Header}>
                <Header />
            </header>
            <aside className={css.Aside}>
                <Menu />
            </aside>
            <main className={css.Main}>
                <Routing />
            </main>
            <footer className={css.Footer}>
                <Footer />
            </footer>
        </div>
    );
}
