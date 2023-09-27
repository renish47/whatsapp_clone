import { FC, InputHTMLAttributes } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
  searchFunction: (keyword: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, searchFunction }) => {
  return (
    <section className="  flex h-16 items-center px-3  py-3">
      <div className=" flex flex-grow items-center gap-5 rounded-lg border-b border-white/70 bg-primary px-3 py-2 ">
        <input
          type="text"
          placeholder={placeholder}
          className=" h-6 w-full bg-transparent text-sm text-white focus:outline-none "
          onChange={(e) => searchFunction(e.currentTarget.value)}
        />
        <BiSearchAlt2
          className=" text-xl text-panel-header-icon"
          title="Search"
        />
      </div>
    </section>
  );
};

export default SearchBar;
