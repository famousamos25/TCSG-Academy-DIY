import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => (
    <div className="relative w-[300px]">
        <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
);

export default SearchBar;