import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store/index";
import { useThunk } from "../hooks/useThunk";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";

function UsersList() {
    // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    // const [isLoadingUsersError, setIsLoadingUsersError] = useState(null);
    // const [isCreatingUser, setIsCreatingUser] = useState(false);
    // const [isCreatingUserError, setIsCreatingUserError] = useState(null);
    const [ runThunkLoadingUsers, isLoadingUsers, loadingUsersError ] = useThunk(fetchUsers);
    const [ runThunkCreatingUser, isCreatingUser, creatingUserError ] = useThunk(addUser);

    // const dispatch = useDispatch();
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
        runThunkLoadingUsers();
    }, [runThunkLoadingUsers]);

    const handleUserAdd = () => {
        runThunkCreatingUser();
    };

    let content;
    if(isLoadingUsers) {
        content = <Skeleton times={5} className="h-10 w-full"/>;
    } else if(loadingUsersError) {
        content = <div>Error fetching data...</div>;
    } else {
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user}/>
        });

    }

    return (
        <div>
            <div className="flex flex-row justify-between m-3 items-center">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} onClick={handleUserAdd}>
                    + Add User
                </Button>
                {creatingUserError && "Error creating user"}
            </div>
            {content}
        </div>
    );
}

export default UsersList;