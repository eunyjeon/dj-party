import React from "react";
import { useQuery } from '@apollo/client'
import { GET_ME } from './graphql'

const UserContext = React.createContext({});

export const UserProvider = props => {
  const { loading, data } = useQuery(GET_ME)
  const user = loading || !data.me.gotUser ? null: data.me.user
  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  )
}

export const UserConsumer = UserContext.Consumer;
export default UserContext;

