import { useEffect, useState } from "react";
import User from "../models/User";
import getUsers from "../services/getUsers";

const AddUser = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const addUser = (username: string, password: string) => {
    const user = new User(0, username, password);
    setUsers([...users, user]);
  };

  return <></>;
};
