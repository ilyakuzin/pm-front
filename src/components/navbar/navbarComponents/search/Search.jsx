import searchIcon from "../../../../resources/icons/searchIcon.svg";
import "./search.scss"

const Search = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Поиск"/>
      <img src={searchIcon} alt="" />
    </div>
  )
}

export default Search;