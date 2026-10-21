import { Fragment } from 'react'
import PhotoCard from './PhotoCard.jsx'
import PhotoModal from './PhotoModal.jsx'

function Gallery({ zdjecia, onUsun }) {
    return (
        <div id="galeria" className="row g-4">
            {zdjecia.map(photo => (
                <Fragment key={photo.id}>
                    <div className="col-12 col-md-6 col-lg-4">
                        <PhotoCard {...photo} onUsun={() => onUsun(photo.id)} />
                    </div>
                    <PhotoModal {...photo} />
                </Fragment>
            ))}
        </div>
    )
}

export default Gallery