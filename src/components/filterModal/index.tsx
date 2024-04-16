import { useGeneresList } from "../../api/nameSearch";
import { useState } from "react";
import "./style.css";
export const FilterModal = () => {
  const { data, isLoading } = useGeneresList();

  const [filterGenres, setFilterGenres] = useState<string[]>([]);

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
              {data.map((item: { name: string }) => (
                <div
                  onClick={() => toggleGenre(item.name)}
                  className={filterGenres.includes(item.name) ? "active" : ""}
                >
                  {item.name}
                </div>
              ))}
              <div>Искать по жанрам</div>
            </div>
          )}
    </>
  );
};
