import './header.style.scss';
import { useMemo, useState} from "react";
import debounce from "../../utils/utlis.ts";

interface HeaderProps {
    onChangeFilter: (newFilter: string) => void;
    filter: string;
}

function Header({ filter, onChangeFilter }: HeaderProps) {
    const [searchInput, setSearchInput] = useState<string>(filter || '');
    const debounceFunc = useMemo(() => debounce((func, props) => func(...props), 300), []);
    const onSearch = (value: string) => {
        setSearchInput(value);
        debounceFunc(() => onChangeFilter(value), [onChangeFilter])
    };
    return (
        <header className="header">
            <h1>
                GibHub User Search
            </h1>
            <input
                placeholder="Search by name..."
                type="text"
                className="search-input"
                value={searchInput}
                onChange={e => onSearch(e.target.value)}
            />
        </header>
    );
}

export default Header;
