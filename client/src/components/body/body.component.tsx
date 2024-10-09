import './body.style.scss';
import UserData from "../../utils/schema.ts";
import UserContainer from "./user-container.component.tsx";
import {useCallback, useEffect, useRef} from "react";

interface BodyProps {
    users: UserData[];
    loading: boolean;
    hasNextPage: boolean;
    onIncrementPage: () => void ;
}

export default function UserGrid({ users, loading, hasNextPage, onIncrementPage }: BodyProps) {
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
            </h2>
            <div className="body-wrapper-grid">
                {(users || []).map(({name, img, publicRepos}) => (
                    <UserContainer img={img} key={name} name={name} publicRepos={publicRepos} />
                ))}
            </div>
            {loading && <p>Loading...</p>}
            {!hasNextPage && <p>No more items to load.</p>}
        </main>
    )
}