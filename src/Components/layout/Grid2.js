import avatar from '../../img/avatar.svg';
import { getFBFormattedData, getGoogleFormattedData, getYelpFormattedData } from '../../utils/functions';
import Image from '../single/Image';
import Name from '../single/Name';
import ReviewText from '../single/ReviewText';
import ProvidedBy from '../single/ProvidedBy';
import Time from '../single/Time';
import Rating from '../single/Rating';
import icons from '../../utils/icons';


const Structure = ({ attributes, review }) => {
    const { isProfileImg, isName, isTime, isIcon, isRatting, isDescription, showText } = attributes;
    const { name, photoUrl, reviewUrl, time, ratingIcon, reviewText, providedBy } = review;

    return <div className='singleWrap grid2Single'>
        <div className="reviewCard">
            <div className="info">
                <Rating isRatting={isRatting} stars={ratingIcon} />
                <ReviewText showText={showText} isDescription={isDescription} review_text={reviewText} />
                <ProvidedBy isIcon={isIcon} name={providedBy} />
            </div>
            <span className='angel' />
        </div>

        <div className="profile">
            <Image isProfileImg={isProfileImg} url={photoUrl || avatar} name={name} />
            <div className="nameTime">
                <Name isName={isName} url={reviewUrl} name={name} />
                <Time isTime={isTime} time={time} />
            </div>
        </div>
    </div>;
}

const Grid2 = ({ reviews, attributes }) => {
    const { isReviewType, reviewPosition, ratingIconColors } = attributes;
    const { top, middle, bottom } = reviewPosition;
    const mainFunc = {
        facebook: (review, index) => <Structure key={index} attributes={attributes} review={getFBFormattedData(review, ratingIconColors.facebook)} logo={icons.facebook} />,

        google: (review, index) => <Structure key={index} attributes={attributes} review={getGoogleFormattedData(review, ratingIconColors.google)} logo={icons.google} />,

        yelp: (review, index) => <Structure key={index} attributes={attributes} review={getYelpFormattedData(review, ratingIconColors.yelp)} logo={icons.yelp} />
    }
    return <>
        {isReviewType[top] && reviews[top]?.map(mainFunc[top])}
        {isReviewType[middle] && reviews[middle]?.map(mainFunc[middle])}
        {isReviewType[bottom] && reviews[bottom]?.map(mainFunc[bottom])}
    </>
}
export default Grid2;