import { useState } from 'react'
import './singleProductPage.css'
import OtherImages from './OtherImages'

const SingleProductImages = ({images}) => {
    const [currentImg, setCurrentImg] = useState(0)
    const imgs = images.split(',')
    return (
        <>
            <div className="col-sm-3 col-10 otherImages">
                {imgs && imgs.length !== 0 && (
                    imgs.map((img, index) => (
                    <OtherImages 
                        key={index}
                        count={imgs.indexOf(img)}
                        shine={currentImg === imgs.indexOf(img)}
                        img={img}
                        handleMainImage={(cur)=> setCurrentImg(cur)} 
                    /> 
                    ))
                )}
            </div>
            <div className="col-sm-9 col-10 mainImage">
                <div className="itemImg1">
                    <img
                        src={imgs[currentImg]}
                        alt={imgs[currentImg]}
                        className="img-fluid"
                    />
                </div>
            </div>
        </>
    )
}

export default SingleProductImages
