import { useMainStore } from "../../store";
import "./style.css";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { FilterModal } from "../../components/filterModal";
import { RandomMovies } from "../../components/randomMovies";
import { RootHeader } from "../../components/rootHeader";

export const Root = () => {
  const params = useParams();
  const { isThemeDark, backgroundUrl, setBackgroundUrl } = useMainStore();
  const { isModal } = useMainStore();
  const location = useLocation();
  if (location.pathname === "/" && backgroundUrl !== "") {
    setBackgroundUrl("");
  }
  return (
    <div className={`root-cont ${isThemeDark ? "dark-theme" : "light-theme"}`}>
      <RootHeader />
      <>
        <img
          style={{
            left: "0",
            width: `${backgroundUrl === "" ? "50%" : "25%"}`,
          }}
          src={
            backgroundUrl === ""
              ? isThemeDark
                ? "https://img.razrisyika.ru/kart/85/1200/339801-kinoteatr-34.jpg"
                : "https://avatars.mds.yandex.net/get-altay/492546/2a0000015e5335bad431c2c5776e07747126/XXL_height"
              : backgroundUrl
          }
          className="backgroundMain"
        />
        <img
          style={{
            right: "0",
            width: `${backgroundUrl === "" ? "50%" : "25%"}`,
          }}
          src={
            backgroundUrl === ""
              ? isThemeDark
                ? "https://img.razrisyika.ru/kart/85/1200/339801-kinoteatr-34.jpg"
                : "https://avatars.mds.yandex.net/get-altay/492546/2a0000015e5335bad431c2c5776e07747126/XXL_height"
              : backgroundUrl
          }
          className="backgroundMain"
        />
      </>
      <main>
        {isModal && <FilterModal />}
        {params.movieId ? <Outlet /> : <RandomMovies />}
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
