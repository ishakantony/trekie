import { type User } from "@/types";
import { UserCard } from "./user-card";

export const UserList = ({ users }: { users: Array<User> }) =>
  users.map((user: User) => <UserCard key={user.id} user={user} />);
