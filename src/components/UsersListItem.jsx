import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store/index";
import { useThunk } from "../hooks/useThunk";
import ExpandablePanel from "./ExpandablePanel";
import { Fragment } from "react";
import AlbumsList from "./AlbumsList";

function UsersListItem({ user }) {
    const [runThunkDeleteUser, isDeletingUser, deletingUserError] = useThunk(removeUser);

    const handleClick = () => {
        console.log("delete click");
        runThunkDeleteUser(user);
    };

    const header = (
        <Fragment>
            <Button className="mr-3" loading={isDeletingUser} onClick={handleClick}>
                <GoTrashcan/>
            </Button>
            {user.name}
            {deletingUserError && <div>Error deleting user</div>}
        </Fragment>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;