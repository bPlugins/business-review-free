import avatar from '../../img/avatar.svg';
import { getFBFormattedData, getGoogleFormattedData, getYelpFormattedData } from '../../utils/functions';

import Image from '../single/Image';
import Name from '../single/Name';
import ProvidedBy from '../single/ProvidedBy';
import Rating from '../single/Rating';
import ReviewText from '../single/ReviewText';
import Time from '../single/Time';
import icons from '../../utils/icons';

const Structure = ({ attributes, review }) => {
    const { isProfileImg, isName, isTime, isIcon, isRatting, isDescription, showText } = attributes;
    const { name, photoUrl, reviewUrl, time, ratingIcon, reviewText, providedBy } = review;

    return <div className='singleWrap grid1Single'>
        <div className="reviewCard">
            <div className="heading">
                <div className="profile">
                    <Image isProfileImg={isProfileImg} url={photoUrl || avatar} name={name} />
                    <div className="nameTime">
                        <Name isName={isName} url={reviewUrl} name={name} />
                        <Rating isRatting={isRatting} stars={ratingIcon} />
                        <Time isTime={isTime} time={time} />
                    </div>
                </div>
            </div>

            <div className="footer">
                <ReviewText showText={showText} isDescription={isDescription} review_text={reviewText} />
                <ProvidedBy isIcon={isIcon} name={providedBy} />
            </div>
        </div>
    </div>
}

const Grid1 = ({ reviews, attributes }) => {
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
export default Grid1;

