import debounce from "lodash.debounce";
import cn from "classnames";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Movie, useFilterList } from "../../api/nameSearch";
import { useMainStore, useMovieRandomeStore } from "../../store";
import "../../rootes/root/style.css";

export const FilterRoot = () => {
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const listRef = useRef<HTMLUListElement>(null);
  const location = useLocation();
  const params = useParams();
  const { data: useRandomMovieList, isLoading } = useFilterList(
    location.state.key,
  );
  console.log(useRandomMovieList, location.state.key.join("&genres.name="));
  const { idList, addIdList } = useMovieRandomeStore();
  const { current } = listRef;
  const myNavigator = useNavigate();
  const { setIsModal } = useMainStore();
  const checkForScrollPosition = () => {
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
  }, [params]);
  return (
    <>
      <div className="scrollableContainer">
        {useRandomMovieList && !isLoading && (
          <ul className="movieS_Container" ref={listRef}>
            {useRandomMovieList.docs.map((data: Movie, index: number) => {
              if (data && data.id && data.name && !idList.includes(data.id)) {
                addIdList(data.id);
              }
              debounceCheckForScrollPosition();
              return (
                <>
                  {isLoading ? (
                    ""
                  ) : data ? (
                    <li
                      className="movieContainer"
                      onClick={() => {
                        setIsModal(false);
                        myNavigator("/movie/" + data.name, {
                          state: { key: index, url: location.pathname },
                        });
                      }}
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
                          <>{data.genres[0].name},</>
                        ) : (
                          "Жанры отсутствуют"
                        )}
                        {data.genres[1] ? <>{data.genres[1].name},</> : ""}{" "}
                        {data.genres[2] ? <>{data.genres[2].name}</> : ""}
                      </p>
                      <p>{data.year ? <>{data.year}</> : "Год отсутствует"}</p>
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
          <p>←</p>
        </button>
        <button
          type="button"
          disabled={!canScrollRight}
          onClick={() => scrollContainerBy(400)}
          className={cn("button", "buttonRight", {
            "button--hidden": !canScrollRight,
          })}
        >
          <p>→</p>
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
    </>
  );
};
