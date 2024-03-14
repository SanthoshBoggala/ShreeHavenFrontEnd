import './singleProductPage.css'

const OtherImages = ({ img, handleMainImage, count, shine }) => {
    return (
        <div className="itemImgs" style={{boxShadow: shine ? '6px 6px 10px rgb(102, 153, 173)': ''}}>
            <img
                src={img}
                alt='productSideImages'
                className="img-fluid"
                onClick={()=> handleMainImage(count)}
            />
        </div>
    )
}

export default OtherImages
