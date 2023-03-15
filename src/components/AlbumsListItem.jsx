import Button from "./Button";
import { Fragment } from "react";
import PhotosList from "./PhotosList";
import { useRemoveAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";

function AlbumsListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleDeleteAlbumClick = () => {
        removeAlbum(album);
    };

    const header = (
        <Fragment>
            <Button onClick={handleDeleteAlbumClick} loading={results.isLoading}>
                <GoTrashcan/>
            </Button>
            {album.title}
        </Fragment>
    );
    return (
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    );
}

export default AlbumsListItem;