import { SetStateAction, useCallback, useEffect, useState } from 'react';
import Header from "./components/header/header.component.tsx";
import UsersGrid from "./components/users-grid/users-grid.component.tsx";
import getUsers from "./utils/users.service.ts";
import UserData from "./utils/schema.ts";
import './App.css';

function App() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [search, setSearch] = useState<string>("");
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const onChangeSearch = useCallback((value: SetStateAction<string>) => {
      setSearch(value);
      setUsers([]);
      setPage(1);
    }, []);

    const onIncrementPage = useCallback(() => setPage((prevState: number) => prevState + 1), []);

    useEffect(() => {
        const fetchUsers = async (pageNumber: number) => {
          setLoading(true);
          try {
              const newUsers: UserData[] = (await getUsers(search, pageNumber))?.data;
              setUsers(prevState => [...prevState, ...newUsers]);
              setHasNextPage(!!newUsers.length);
          } catch (e) {
              console.error(e);
          } finally {
              setLoading(false);
          }
        }
        if (search) {
          fetchUsers(page);
        }
    }, [search, page]);

  return (
    <>
        <Header onChangeSearch={onChangeSearch} search={search} />
        <UsersGrid
            users={users}
            loading={loading}
            hasNextPage={hasNextPage}
            onIncrementPage={onIncrementPage}
        />
    </>
  );
}

export default App;
