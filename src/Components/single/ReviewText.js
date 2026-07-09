
import Expanded from './Expanded';

const ReviewText = ({ isDescription, review_text, showText }) => {

    return (isDescription && review_text) ? <div className="reviewText">
        {/* {review_text} */}
        <Expanded showText={showText} review_text={review_text} />
    </div> : <span></span>
}
export default ReviewText; 