import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store/index";
import Button from "./Button";
import Skeleton from "./Skeleton";

function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();

    const runThunk = useCallback(() => {
        setIsLoading(true);

        dispatch(thunk())
        .unwrap()
        .catch((err) => setError(err))
        .finally(() => setIsLoading(false));
    }, [dispatch, thunk]);

    return { runThunk, isLoading, error };
}

function UsersList() {
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingUsersError, setIsLoadingUsersError] = useState(null);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isCreatingUserError, setIsCreatingUserError] = useState(null);

    const dispatch = useDispatch();
    // const { isLoading, data, error } = useSelector((state) => {
    //     return state.users; // {data: [], isLoading: false, error: null}
    // });
    const { data } = useSelector((state) => {
        return state.users; // {data: [], isLoading: false, error: null}
    });

    // useEffect(() => {
    //     dispatch(fetchUsers()); //change the state
    // }, [dispatch]); //[dispatch] is not strictly necessary
    useEffect(() => {
        setIsLoadingUsers(true);

        dispatch(fetchUsers())
        .unwrap()
        .catch((err) => setIsLoadingUsersError(err)) //if error
        .finally(() => setIsLoadingUsers(false)); //do this in any case
    }, [dispatch]); //[dispatch] is not strictly necessary

    const handleUserAdd = () => {
        setIsCreatingUser(true);

        dispatch(addUser())
        .unwrap()
        .catch((err) => setIsCreatingUserError(err))
        .finally(() => setIsCreatingUser(false));
    };


    if(isLoadingUsers) {
        return <Skeleton times={5} className="h-10 w-full"/>
    }
    
    if(isLoadingUsersError) {
        return <div>Error fetching data...</div>
    }

    const renderedUsers = data.map((user) => {
        return (
            <div key={user.id} className="mb-2 border rounded">
                <div className="flex p-2 justify-between items-center cursor-pointer">
                    {user.name}
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                {
                    isCreatingUser ? 
                    "Creating user" :
                    <Button onClick={handleUserAdd}>
                        + Add User
                    </Button>
                }
                {isCreatingUserError && "Error creating user"}
            </div>
            {renderedUsers}
        </div>
    );
}

export default UsersList;