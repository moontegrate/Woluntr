import './gallery.scss';
import { Flowbite, Modal } from "flowbite-react";

import { GalleryModalTheme } from '../../style/flowbiteThemes';

const Gallery = ({photo, show, onClose}) => {
    return <Flowbite theme={{ theme: GalleryModalTheme }}>
        <Modal show={show} className='gallery' dismissible onClose={onClose}>
            <Modal.Body>
            <img src={photo} alt="order"/>
            </Modal.Body>
        </Modal>
    </Flowbite>
};

export default Gallery;