import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./style.css";
import {
  useFilterList,
  useNameSearch,
  useRandomMovie,
} from "../../api/nameSearch";
import { useMainStore } from "../../store";

const useApi = (queryKey: number, type: string) => {
  const location = useLocation();
  if (type === "random") {
    const useRandomMovieList = useRandomMovie();
    return useRandomMovieList[location.state.key];
  } else {
    if (type === "filter") {
      const {
        data: useRandomMovieList,
        isLoading,
        isError,
        error,
      } = useFilterList(location.state.generes);
      return {
        data: useRandomMovieList.docs[queryKey],
        isLoading: isLoading,
        isError: isError,
        error: error,
      };
    } else {
      return useNameSearch(type);
    }
  }
};

export const MovieRoot = () => {
  const myNavigator = useNavigate();
  const params = useParams();
  const location = useLocation();
  const { setBackgroundUrl, backgroundUrl } = useMainStore((state) => state);
  const { data, isLoading, isError, error } = useApi(
    location.state.type === "filter" || location.state.type === "random"
      ? location.state.key
      : params.movieId,
    location.state.type,
  );
  if (
    !isLoading &&
    data &&
    data.poster.url &&
    backgroundUrl !== data.poster.url
  ) {
    setBackgroundUrl(data.poster.url);
  }
  console.log(data);
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : data ? (
        <>
          <div className="mainContainer">
            <h6
              onClick={() => {
                if (
                  location.state.url &&
                  location.state.url.includes("/filters/")
                ) {
                  setBackgroundUrl("");
                  myNavigator(location.state.url, {
                    state: {
                      key: location.state.generes,
                    },
                  });
                } else {
                  setBackgroundUrl("");
                  myNavigator("/");
                }
              }}
            >
              🠔
            </h6>
            <img src={data.poster.url} />
            <div className="textContainer">
              <h1>
                {data.name ? data.name : data.alternativeName} ({data.year})
                {data.alternativeName === null ||
                data.alternativeName === undefined
                  ? data.ageRating
                    ? ` ${data.ageRating}+`
                    : ""
                  : ""}
              </h1>
              {data.alternativeName ? (
                <h2>
                  {data.alternativeName}{" "}
                  {data.ageRating ? `${data.ageRating}+` : ""}
                </h2>
              ) : (
                ""
              )}
              {data.countries ? (
                <h4>
                  {data.countries.map((el: { name: string }) => ` ${el.name},`)}
                </h4>
              ) : (
                ""
              )}
              {data.budget && data.budget.value && data.budget.currency ? (
                <h4>
                  {/* <h3
                    style={{ display: "inline", color: "var(--fg_main_blur)" }}
                  >
                    Бюджет{" "}
                  </h3> */}
                  {data.budget.value}
                  {data.budget.currency}
                </h4>
              ) : (
                ""
              )}
              {data.genres ? (
                <h4>
                  {" "}
                  {data.genres.map(
                    (el: { name: string }) => ` ${el.name},`,
                  )}{" "}
                </h4>
              ) : (
                ""
              )}
              {data.description ? <p>{data.description}</p> : ""}
              {/* {data.persons ? (
                <div className="persons">
                  {data.persons.map((el: any) => {
                    return (
                      <>
                        {el.photo && (
                          <div className="person">
                            <img src={el.photo} />
                            {el.description && el.name ? (
                              <p>
                                Роль {el.description}: Исполнял {el.name}
                              </p>
                            ) : el.name ? (
                              <p>Исполнял {el.name}</p>
                            ) : el.description ? (
                              <p>Роль {el.description}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </>
                    );
                  })}
                </div>
              ) : (
                ""
              )} */}
            </div>
          </div>
        </>
      ) : isError ? (
        error.message
      ) : null}
    </>
  );
};
