import {SetStateAction, useCallback, useEffect, useState} from 'react';
import Header from "./components/header/header.component.tsx";
import UserGrid from "./components/body/body.component.tsx";
import getUsers from "./utils/users.service.ts";
import UserData from "./utils/schema.ts";
import './App.css';

function App() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [hasNextPage, setHasNextPage] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const onChangeFilter = useCallback((value: SetStateAction<string>) => {
      setFilter(value);
      setUsers([]);
      setPage(1);
  }, []);
    const onIncrementPage = useCallback(() => setPage((prevState: number) => prevState + 1), []);

  useEffect(() => {
      const fetchUsers = async (pageNumber: number) => {
          setLoading(true);
          const newUsers: UserData[] = (await getUsers(filter, pageNumber))?.data;
          setUsers(prevState => [...prevState, ...newUsers]);
          setHasNextPage(!!newUsers.length);
          setLoading(false);
      }
      if (filter) {
          fetchUsers(page);
      }
  }, [filter, page]);

  return (
    <>
        <Header onChangeFilter={onChangeFilter} filter={filter} />
        <UserGrid users={users} loading={loading} hasNextPage={hasNextPage} onIncrementPage={onIncrementPage} />
    </>
  );
}

export default App;
