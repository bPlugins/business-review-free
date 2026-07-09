import avatar from '../../img/avatar.svg';
import icons from '../../utils/icons';
import { getFBFormattedData, getGoogleFormattedData, getYelpFormattedData } from '../../utils/functions';

import Image from '../single/Image';
import ProviderLogo from '../single/ProviderLogo';
import Name from '../single/Name';
import Rating from '../single/Rating';
import Time from '../single/Time';
import ReviewText from '../single/ReviewText';

const Structure = ({ attributes, review, logo }) => {
    const { isProfileImg, isName, isTime, isIcon, isRatting, isDescription, showText } = attributes;
    const { name, photoUrl, reviewUrl, time, ratingIcon, reviewText } = review;

    return <div className='singleWrap defaultSingle'>
        <div className='reviewCard'>
            <div className="heading">
                <div className='profile'>
                    <Image isProfileImg={isProfileImg} url={photoUrl || avatar} name={name} />
                    <div className='nameTime'>
                        <Name isName={isName} url={reviewUrl} name={name} />
                        <Time isTime={isTime} time={time} />
                    </div>
                </div>
                <div className='logoRating'>
                    <ProviderLogo isIcon={isIcon} icon={logo} />
                    <Rating isRatting={isRatting} stars={ratingIcon} />
                </div>
            </div>

            <div className="footer">
                <ReviewText showText={showText} isDescription={isDescription} review_text={reviewText} />
            </div>
        </div>
    </div>
}

const Default = ({ attributes, reviews }) => {
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
export default Default;


