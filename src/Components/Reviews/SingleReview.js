import './reviews.css'

const SingleReview = ({review})=>{


    function timeAgo(fromDate, toDate = new Date()) {
        const timeDifference = toDate - new Date(fromDate);
        
        const seconds = Math.floor(timeDifference / 1000);
    
        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
        }
    
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        }
    
        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        }
    
        const days = Math.floor(hours / 24);
        if (days < 30) {
            return `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    
        const months = Math.floor(days / 30);
        if (months < 12) {
            return `${months} month${months !== 1 ? 's' : ''} ago`;
        }
    
        const years = Math.floor(months / 12);
        return `${years} year${years !== 1 ? 's' : ''} ago`;
    }

    const reviewRatingColor = Number(review.starRating) > 3.0 ? 'primary' : 'danger'
    
    return (
        <div className='singleReview'>
            <div className='reviewUserDetails'>
                <div>
                    <img
                        className='userRevieImage'
                        alt='review'
                        src='https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg' 
                    />
                    <span className='reviewUser'>{review.user.username}</span>
                    <span className={`badge bg-${reviewRatingColor} productStarRating`}>{review.starRating + '★'}</span>
                </div>
                <div className='reviewDate'>{timeAgo(review.date)}</div>
            </div>
            <div className='reviewDescription'>
                {review.comment}
            </div>
        </div>
    )
}

export default SingleReview