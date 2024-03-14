import { useContext, useState } from 'react'
import GiveReview from './GiveReview'
import SingleReview from './SingleReview'
import './reviews.css'
import { toast, ToastContainer } from 'react-toastify'
import UserContext from '../../contexts/userContext'

const Reviews = ({ reviews , ratings , starRating })=>{
    const [canReview, setCanReview] = useState(false)
    const [viewMore, setViewMore] = useState(2)
    const {user, token} = useContext(UserContext)

    reviews = reviews.filter(one => one.review && one.review.hasOwnProperty('comment'))
    
    const limitedReviews = reviews.slice(0,viewMore)

    // const reviewsData = [
    //     {
    //         user: 'santhosh',
    //         rating: 3.9,
    //         date: Date.now(),
    //         comment: "The quality is great but the arms around is super annoying(tight)its not a regular fit(mention in description)its slim fit don't go for for it if you're not thin i exchange with larger size but still same issue."
    //     },
    //     {
    //         user: 'santhosh',
    //         rating: 2.5,
    //         date: Date.now(),
    //         comment: "The quality is great but the arms around is super annoying(tight)its not a regular fit(mention in description)its slim fit don't go for for it if you're not thin i exchange with larger size but still same issue."
    //     },
    //     {
    //         user: 'santhosh',
    //         rating: 3.5,
    //         date: Date.now(),
    //         comment: "The quality is great but the arms around is super annoying(tight)its not a regular fit(mention in description)its slim fit don't go for for it if you're not thin i exchange with larger size but still same issue."
    //     }
    // ]
    const handleReview = ()=>{
        if(user && user.type === 'customer'){
            setCanReview(prev => !prev)
        }
        else{
            toast.error("Only customer can review... ")
            return
        }
    }
    const showAll = ()=>{
        setViewMore(prev => prev < 3 ? reviews.length : 2)
    }
    return (
        <div className='reviewsPage'>
            <div>
                <div className='reviewHeading'>Ratings & Reviews</div>
                    <div className='reviewBox'> 
                        <div className='starRating'>{starRating}</div>
                        <div className='ratings'>{ratings + ' Ratings &'}</div>
                        <div className='ratings'>{reviews.length + ' Reviews'}</div>
                    </div>
                    {limitedReviews && limitedReviews.length !== 0 ? (
                    <>  
                        {limitedReviews.map((review, index) => <SingleReview  key={index} review={review.review}/>)}
                        <div className='viewAllDiv'>
                            <button className='viewAll' onClick={showAll}>{ limitedReviews.length < 3 ? 'View All' : 'View Less'}</button>
                            <button className='viewAll' onClick={handleReview}>{ canReview ? 'Close Review' : 'Rate Product'}</button>
                        </div>
                    </>
                ) : (
                    <h4 className='leftPadding'>No Reviews Available</h4>
                )
                }
                <div className='giveReview'>
                    { limitedReviews && limitedReviews.length === 0 && (
                        <div>
                            <button className='viewAll' onClick={handleReview}>{ canReview ? 'Close Review' : 'Rate Product'}</button>    
                        </div>  
                    )}
                    {canReview && <GiveReview />}
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Reviews