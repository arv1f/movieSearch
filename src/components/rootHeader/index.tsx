import { useState, ChangeEvent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import { useMainStore } from "../../store";
import "../../rootes/root/style.css";

export const RootHeader = () => {
  const [value, setValue] = useState("");
  const myNavigator = useNavigate();
  const { isThemeDark, toggleTheme } = useMainStore();
  const { isModal, setIsModal } = useMainStore();
  return (
    <header className="top_panel">
      <div>PosuduMovie</div>
      {/* <div>{params.movieId ? params.movieId : ""}</div> */}
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
            onClick={(e) => {
              e.preventDefault();
              if (value !== "") {
                setIsModal(false);
                myNavigator(`/movie/${value}`);
              }
            }}
          >
            <img src="https://www.pngall.com/wp-content/uploads/8/Vector-Search.png" />
          </button>
          <button
            className="buttonHeader"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setIsModal(!isModal);
            }}
            style={{ right: "30px" }}
          >
            <img src="https://cdn0.iconfinder.com/data/icons/basic-glyph/1024/filter-1024.png" />
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

      <div></div>
    </header>
  );
};
