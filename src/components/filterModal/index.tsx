import { useGeneresList } from "../../api/nameSearch";
import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../../store";
export const FilterModal = () => {
  const { data, isLoading } = useGeneresList();
  const myNavigator = useNavigate();
  const [filterGenres, setFilterGenres] = useState<string[]>([]);
  const { setIsModal } = useMainStore();

  const toggleGenre = (name: string) => {
    if (filterGenres.includes(name)) {
      setFilterGenres(filterGenres.filter((genre) => genre !== name));
    } else {
      setFilterGenres([...filterGenres, name]);
    }
  };
  return (
    <>
      {isLoading
        ? ""
        : data && (
            <div className="filterList">
              {data.map((item: { name: string; slug: string }) => (
                <div
                  onClick={() => toggleGenre(item.name)}
                  className={
                    filterGenres.includes(item.name) ? "genre active" : "genre"
                  }
                >
                  {item.name}
                </div>
              ))}
              <div
                className="genre"
                onClick={() => {
                  setIsModal(false);
                  myNavigator("/filters/" + filterGenres.join(","), {
                    state: { key: filterGenres },
                  });
                }}
              >
                Искать по жанрам
              </div>
            </div>
          )}
    </>
  );
};
