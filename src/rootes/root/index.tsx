import { ChangeEvent, useState } from "react";
import { useMainStore } from "../../store";
import "./style.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
export const Root = () => {
  const [value, setValue] = useState("");
  const myNavigator = useNavigate();
  const params = useParams();
  const { isThemeDark, toggleTheme } = useMainStore();
  return (
    <div className={`root-cont ${isThemeDark ? "dark-theme" : "light-theme"}`}>
      <header className="top_panel">
        <div>PosuduMovie</div>
        <div>{params.name ? params.name : ""}</div>
        <div className="mainSearch">
          <form className="form">
            <input
              className="input"
              type="search"
              placeholder="Search movie by name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
              }}
            />
            <button
              className="button"
              type="submit"
              onClick={() => value !== "" && myNavigator(`/${value}`)}
            >
              <img src="https://www.pngall.com/wp-content/uploads/8/Vector-Search.png" />
            </button>
          </form>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            onChange={() => toggleTheme()}
            className="switch__input"
            defaultChecked={isThemeDark}
          />
          <span className="switch__slider"></span>
        </label>

        <div>Menu</div>
      </header>
      <main>
        main
        <Outlet />
      </main>
      <footer>
        <div>© 2024 — 2024, НеКинопоиск 18+</div>
        <div>Все права зачищены</div>
        <a href="https://www.afisha.ru">Телепрограмма</a>
        <a href="https://music.yandex.ru/home">Музыка</a>
        <a href="https://afisha.yandex.ru">Афиша</a>
        <a href="https://bookmate.ru/">Букмейт</a>
        <div>Проект компании Vova</div>
      </footer>
    </div>
  );
};
