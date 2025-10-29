import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Img from "../assets/Logo.png";
import { Menu } from "lucide-react";

type NavProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Nav = ({ search, setSearch }: NavProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleButtonClick = () => {
    console.log("Searching for:", search);
  
  };

  return (
    <nav className="w-full shadow bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img className="h-[45px] sm:h-[55px]" src={Img} alt="Logo" />
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-3">
            <Input
              value={search}
              onChange={handleSearch}
              placeholder="Search..."
              className="w-[180px] sm:w-[220px] bg-gray-200 border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              onClick={handleButtonClick}
              className="bg-amber-300 hover:bg-amber-400 text-black"
            >
              Search
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="flex flex-col gap-2 mt-2 pb-3 md:hidden">
          <Input
            value={search}
            onChange={handleSearch}
            placeholder="Search..."
            className="bg-gray-200 border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            onClick={handleButtonClick}
            className="bg-amber-300 hover:bg-amber-400 text-black"
          >
            Search
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
