import { useEffect, useRef, useState } from 'react';
const $ = jQuery;
import produce from 'immer';

import avatar from '../../img/avatar.svg';
import Image from '../single/Image';
import ReviewText from '../single/ReviewText';
import Rating from '../single/Rating';
import Time from '../single/Time';
import ProvidedBy from '../single/ProvidedBy';
import { getFBFormattedData, getGoogleFormattedData, getYelpFormattedData } from '../../utils/functions';
import Name from '../single/Name';

const Structure = ({ attributes, review }) => {
    const { isProfileImg, isName, isTime, isIcon, isRatting, isDescription } = attributes;
    const { name, photoUrl, reviewUrl, time, ratingIcon, reviewText, providedBy } = review;

    return <div className='singleWrap'>
        <div className="reviewCard">
            <div className="heading">
                <div className="profile">
                    <Image isProfileImg={isProfileImg} url={photoUrl || avatar} name={name} />
                    <div className="nameTime">
                        <Name isName={isName} url={reviewUrl} name={name} />
                        <div className="rating-info">
                            <Rating isRatting={isRatting} stars={ratingIcon} />
                            <Time isTime={isTime} time={time} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="body">
                <ReviewText isDescription={isDescription} review_text={reviewText} />
                <ProvidedBy isIcon={isIcon} name={providedBy} />
            </div>
        </div>
    </div>
}

const Carousel = ({ attributes, allReviews, loading }) => {
    // console.log(allReviews);
    const { ratingIconColors, cId, sliderSettings, align, columns } = attributes;
    const { google, facebook, yelp } = ratingIconColors;
    const [carouselInit, setCarouselInit] = useState(null);
    const carouselRef = useRef(null);


    useEffect(() => {
        if (carouselRef?.current && !loading) {

            if (carouselInit) {
                carouselInit?.[0]?.slick?.unslick();
                carouselInit?.[0]?.slick?.init();

            } else {
                setCarouselInit($(`#grbbBusinessReview-${cId} .grbbSlider`).slick(sliderSettings));
                // Dom Element Get 
                const slickList = document.querySelector(`#grbbBusinessReview-${cId} .grbbSlider .slick-list`);
                if (slickList) {
                    slickList.style.height = `${slickList.offsetHeight}px`;
                }
            }
        }

    }, [allReviews, carouselRef, loading, sliderSettings, columns, align]);

    return <div className="slider grbbSlider" ref={carouselRef} style={{ width: '100%', maxWidth: '100%' }}>
        {allReviews.map((review, index) => {
            const data = review?.author_url ? getGoogleFormattedData(review, google) :
                review?.id ? getYelpFormattedData(review, yelp) :
                    review?.reviewer ? (getFBFormattedData(review, facebook)) :
                        {};

            return <Structure key={index} review={data} attributes={attributes} />
        })}
    </div>
}
export default Carousel;