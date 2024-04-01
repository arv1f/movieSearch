import { ChangeEvent, useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import cn from "classnames";
import { useMainStore } from "../../store";
import "./style.css";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { randomMovie } from "../../api/nameSearch";

export const Root = () => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [value, setValue] = useState("");
  const myNavigator = useNavigate();
  const params = useParams();
  const { isThemeDark, toggleTheme } = useMainStore();
  const randomMovieList = randomMovie();

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft !== scrollWidth - clientWidth);
    }
  };
  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance: number) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  return (
    <div className={`root-cont ${isThemeDark ? "dark-theme" : "light-theme"}`}>
      <header className="top_panel">
        <div>PosuduMovie</div>
        <div>{params.name ? params.name : ""}</div>
        <div className="mainSearch">
          <form className="formHeader">
            <input
              className="inputHeader"
              type="text"
              placeholder="Search movie by name"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setValue(event.target.value);
              }}
            />
            <button
              className="buttonHeader"
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
        <div className="scrollableContainer">
          {randomMovieList && (
            <ul className="movieS_Container" ref={listRef}>
              {randomMovieList.map((movie) => {
                const { data, isLoading, isError, error } = movie;
                console.log(data);
                return (
                  <>
                    {isLoading ? (
                      ""
                    ) : data ? (
                      <li
                        key={data.name}
                        className="movieContainer"
                        onClick={() => myNavigator("/" + data.name)}
                      >
                        <div className="posterContainer">
                          <img
                            src={data.poster.url}
                            style={{ width: "100%", height: "100%" }}
                          />
                          {data.ageRating ? (
                            <p className="ageRating">{data.ageRating}+</p>
                          ) : (
                            ""
                          )}
                          <p className="rating">
                            {data.rating.kp ? (
                              <>{data.rating.kp}</>
                            ) : data.rating.imdb ? (
                              <>{data.rating.imdb}</>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                        <h4>
                          {data.name ? (
                            <>{data.name}</>
                          ) : data.alternativeName ? (
                            <>{data.alternativeName}</>
                          ) : (
                            "Название отсутствует"
                          )}
                        </h4>
                        <p>
                          {data.genres[0] ? (
                            <>{data.genres[0].name}</>
                          ) : (
                            "Жанры отсутствуют"
                          )}
                          , {data.genres[1] ? <>{data.genres[1].name}</> : ""}
                        </p>
                        <p>
                          {data.year ? <>{data.year}</> : "Год отсутствует"}
                        </p>
                      </li>
                    ) : isError ? (
                      error.message
                    ) : (
                      ""
                    )}
                  </>
                );
              })}
            </ul>
          )}
          <button
            type="button"
            disabled={!canScrollLeft}
            onClick={() => scrollContainerBy(-400)}
            className={cn("button", "buttonLeft", {
              "button--hidden": !canScrollLeft,
            })}
          >
            ←
          </button>
          <button
            type="button"
            disabled={!canScrollRight}
            onClick={() => scrollContainerBy(400)}
            className={cn("button", "buttonRight", {
              "button--hidden": !canScrollRight,
            })}
          >
            →
          </button>
          {canScrollLeft ? (
            <div className="shadowWrapper leftShadowWrapper">
              <div className="shadow leftShadow" />
            </div>
          ) : null}
          {canScrollRight ? (
            <div className="shadowWrapper rightShadowWrapper">
              <div className="shadow rightShadow" />
            </div>
          ) : null}
        </div>
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
