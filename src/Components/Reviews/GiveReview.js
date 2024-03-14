import './reviews.css'
import { useContext, useState } from 'react'
import useModifyData from '../../customHooks/useModifyData'
import UserContext from '../../contexts/userContext'
import { ProductContext } from '../../contexts/ProductContext'
import { toast, ToastContainer } from 'react-toastify'
import RefetchProductContext from '../../contexts/RefetchProductContext'
import grn from '../../Images/ratedStar.png'
import wte from '../../Images/notRatedStar.png'


const GiveReview = () => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const [ err, setErr] = useState("")
    const { token } = useContext(UserContext)
    const { setRefetch } = useContext(RefetchProductContext)
    const { key } = useContext(ProductContext)
    const url = `http://localhost:5000/api/reviews`
    const { modifyData } = useModifyData({ url , method : "POST", token })
    let stars = []
    let lastStar = rating
    while (lastStar !== 0) {
        stars.push(1)
        lastStar = lastStar - 1
    }

    let notRated = 5 - rating
    while (notRated !== 0) {
        stars.push(0)
        notRated = notRated - 1
    }

    const handleStar = (n, isStar) => {
        if (isStar === 1) {
            setRating(n)
        }
        else setRating(n)
    }
    const validate = ()=>{
        if(rating == 0){
            setErr("Select a valid rating")
            return false
        }

        return true
    }

    const sendReview = async()=>{

        if(!validate()) return

        let formData = { starRating:rating, ...key }

        if(comment.length !== 0){
            formData = {...formData, comment }
        }

        const { isSending, error,  data } = await modifyData(formData)


        if(error){
            toast.error("Review failed! Try again...")
        }
        else{
            toast.success("Reviewed Successfully")
            setRefetch(prev => {
                return (
                    {refetch: prev.refetch + 1}
                )
            })
        }

    }
    return (
        <>
            <div className='giveStarRating'>
                <div className='giveReviewHeading'>
                    Review Product
                </div>
                <div className='starSet'>
                    <div className='star'>
                        <img
                            src={stars[0] === 1 ? grn : wte}
                            alt='startIcon'
                            className='img-fluid'
                            onClick={() => handleStar(1, stars[0])}
                        />
                    </div>
                    <div className='star'>
                        <img
                            src={stars[1] === 1 ? grn : wte}
                            alt='startIcon'
                            className='img-fluid'
                            onClick={() => handleStar(2, stars[1])}
                        />
                    </div>
                    <div className='star'>
                        <img
                            src={stars[2] === 1 ? grn : wte}
                            alt='startIcon'
                            className='img-fluid'
                            onClick={() => handleStar(3, stars[2])}
                        />
                    </div>
                    <div className='star'>
                        <img
                            src={stars[3] === 1 ? grn : wte}
                            alt='startIcon'
                            className='img-fluid'
                            onClick={() => handleStar(4, stars[3])}
                        />
                    </div>
                    <div className='star'>
                        <img
                            src={stars[4] === 1 ? grn : wte}
                            alt='startIcon'
                            className='img-fluid'
                            onClick={() => handleStar(5, stars[4])}
                        />
                    </div>
                </div>
            </div>
            <div className='writeReview'>
                <div className='giveReviewHeading'>Write a Review</div>
                <textarea
                    value={comment}
                    onChange={(e)=> setComment(e.target.value)}
                    placeholder='How is the product? What do you like?What do you hate?'>
                </textarea>
                <div className='error'>
                    {err}
                </div>
                <button 
                    onClick={sendReview} 
                >
                    Finish
                </button>
            </div>
            <ToastContainer />
        </>
    )
}

export default GiveReview
