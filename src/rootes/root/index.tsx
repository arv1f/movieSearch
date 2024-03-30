import { ChangeEvent, useState } from "react";
import { useMainStore } from "../../store";
import "./style.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { randomMovie } from "../../api/nameSearch";

export const Root = () => {
  const [value, setValue] = useState("");
  const myNavigator = useNavigate();
  const params = useParams();
  const { isThemeDark, toggleTheme } = useMainStore();
  const { data, isLoading, isError, error } = randomMovie();
  console.log(data);
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
      <img
        style={{ left: "0" }}
        src={
          isThemeDark
            ? "https://img.razrisyika.ru/kart/85/1200/339801-kinoteatr-34.jpg"
            : "https://avatars.mds.yandex.net/get-altay/492546/2a0000015e5335bad431c2c5776e07747126/XXL_height"
        }
        className="backgroundMain"
      />
      <img
        style={{ right: "0" }}
        src={
          isThemeDark
            ? "https://img.razrisyika.ru/kart/85/1200/339801-kinoteatr-34.jpg"
            : "https://avatars.mds.yandex.net/get-altay/492546/2a0000015e5335bad431c2c5776e07747126/XXL_height"
        }
        className="backgroundMain"
      />
      <main>
        {isLoading ? (
          "Loading..."
        ) : data ? (
          <div
            className="movieContainer"
            onClick={() => myNavigator("/" + data.name)}
          >
            <div className="posterContainer">
              <img src={data.poster.url} />
              <h5>{data.ageRating ? data.ageRating : "0"}+</h5>
              <h3>{data.rating.kp}</h3>
            </div>
            <h2>Название: {data.name ? data.name : data.alternativeName}</h2>
            <h3>Год: {data.year}</h3>
            <h4>
              Жанры: {data.genres[0].name},{" "}
              {data.genres[1] ? data.genres[1].name : null}
            </h4>
          </div>
        ) : isError ? (
          error.message
        ) : null}
        <Outlet />
      </main>
      <footer>
        <div>© 2024 — 2024, НеКинопоиск 18+</div>
        <div>Все права зачищены</div>
        <a href="https://www.afisha.ru">Телепрограмма</a>
        <a href="https://music.yandex.ru/home">Музыка</a>
        <a href="https://afisha.yandex.ru">Афиша</a>
        <a href="https://bookmate.ru/">Букмейт</a>
        <div>Проект компании localhost</div>
      </footer>
    </div>
  );
};
