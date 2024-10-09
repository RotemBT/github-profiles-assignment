import UserData from "../../utils/schema.ts";
import UserContainer from "./user-container.component.tsx";
import {useCallback, useEffect, useRef} from "react";
import './users-grid.style.scss';

interface UsersGridProps {
    users: UserData[];
    loading: boolean;
    hasNextPage: boolean;
    onIncrementPage: () => void ;
}

export default function UsersGrid({ users, loading, hasNextPage, onIncrementPage }: UsersGridProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleScroll = useCallback( () => {
        const scrollableContainer = ref.current;
        if (loading || !hasNextPage || !scrollableContainer ) return;
        const bottom = scrollableContainer.scrollTop + scrollableContainer.clientHeight >= scrollableContainer.scrollHeight - 100;
        if (bottom) {
            onIncrementPage();
        }
    }, [loading, hasNextPage, onIncrementPage, ref]);

    useEffect(() => {
        const scrollableContainer = ref.current;
        if (scrollableContainer) {
            scrollableContainer.addEventListener('scroll', handleScroll);
            return () => {
                scrollableContainer.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll, ref]);

    return (
        <main className="body-wrapper" ref={ref}>
            <h2>
                Search Results
                {hasNextPage && <span>(Scroll down for more results)</span>}
            </h2>
            <div className="body-wrapper-grid">
                {users.map(({name, img, publicRepos}) => (
                    <UserContainer
                        key={name}
                        img={img}
                        name={name}
                        publicRepos={publicRepos}
                    />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!hasNextPage && !loading && <p>No more items to load.</p>}
        </main>
    )
}