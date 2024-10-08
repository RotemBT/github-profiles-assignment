import './header.style.scss';
import React, {useMemo, useState} from "react";
import debounce from "../../utils/utlis.ts";

interface HeaderProps {
    onChangeFilter: (newFilter: string) => void;
    filter: string;
}

function Header({ filter, onChangeFilter }: HeaderProps) {
    const [searchInput, setSearchInput] = useState<string>(filter || '');
    const debounceFunc = useMemo(() => debounce((func, props) => func(...props), 200), []);
    const onSearch = (value: string) => {
        setSearchInput(value);
        debounceFunc(() => onChangeFilter(value), [onChangeFilter, filter])
    };
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            console.log("pressed");
        }
    }
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
                onKeyDown={onKeyDown}
                onChange={e => onSearch(e.target.value)}
            />
        </header>
    );
}

export default Header;
