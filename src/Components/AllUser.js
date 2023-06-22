import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../graphql/UsersQuery";

const AllUser = () => {
    const [allUser, setAllUser] = useState([])
    const {loading, data} = useQuery(GET_USERS, {fetchPolicy: 'no-cache'})

    useEffect(() => {
        if (data?.allUsers) {
            setAllUser(data.allUsers)
        }
    }, [data])

    return (
        <div>
            {
                loading ? "Loading" :
                    allUser.length > 0 && allUser.map((user) => (
                        <h2 key={user.id}>{user.name}</h2>
                    ))
            }
        </div>
    );
};

export default AllUser;
