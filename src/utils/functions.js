
import { cloneElement } from 'react';
import icons from './icons';
export const getBoxValue = object => Object.values(object).join(" ");

export const getStar = (value, color) => {
    let rating = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= value) {
            rating.push(
                cloneElement(icons.star(color), { key: i })
            );
        } else {
            rating.push(
                cloneElement(icons.outlineStar, { key: i })
            );
        }
    }
    return rating;
}

export const getGoogleFormattedData = (data, google) => {
    const { author_name, author_url, profile_photo_url, rating, relative_time_description, text } = data || {};

    return { name: author_name, photoUrl: profile_photo_url, reviewUrl: author_url, time: relative_time_description, ratingIcon: getStar(rating, google), reviewText: text, providedBy: "Google" }
}

export const getFBFormattedData = (data, facebook) => {

    const { created_time, recommendation_type, review_text, reviewer } = data || {};
    const { name, picture } = reviewer || {};
    const { url } = picture?.data || {};

    var rating = '';
    if (recommendation_type === "positive") {
        rating = 5;
    } else {
        rating = 1;
    }

    return { name, photoUrl: url, time: created_time, ratingIcon: getStar(rating, facebook), reviewText: review_text, providedBy: "facebook" }
}

export const getYelpFormattedData = (data, yelp) => {
    const { rating, text, time_created, user } = data || {};
    const { image_url, profile_url, name } = user || {};

    return { name, photoUrl: image_url, reviewUrl: profile_url, time: time_created, ratingIcon: getStar(rating, yelp), reviewText: text, providedBy: "Yelp" }
}

export const checkLayout = (val) => {

    if ('default' === val) {
        return {
            cardBorder: { "color": "#e1e1e1", "style": "solid", "width": "1px" },
            cardPadding: { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" },
            cardRadius: "5px",
            imgRadius: "50%",
            reviewTextColor: "#646464"
        }
    }

    if ('grid1' === val) {
        return {
            cardBorder: { "color": "#e1e1e1", "style": "solid", "width": "0px" },
            cardPadding: { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" },
            cardRadius: "30px",
            imgRadius: "50%",
            reviewTextColor: "#646464"
        }
    }

    if ('grid2' === val) {
        return {
            cardBorder: { "color": "#e1e1e1", "style": "solid", "width": "1px" },
            cardPadding: { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" },
            cardRadius: "35px",
            imgRadius: "50%",
            reviewTextColor: "#646464"

        }
    }

    if ('grid3' === val) {
        return {
            cardBorder: { "color": "#e1e1e1", "style": "solid", "width": "1px" },
            cardPadding: { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" },
            cardRadius: "5px",
            imgRadius: "50%",
            reviewTextColor: "#fff"
        }
    }

    if ('grid4' === val) {
        return {
            cardBorder: { "color": "#e1e1e1", "style": "solid", "width": "1px" },
            cardRadius: "5px",
            cardPadding: { "top": "35px", "right": "20px", "bottom": "35px", "left": "100px" },
            imgBorder: { "color": "#552fcd", "style": "solid", "width": "2px" },
            imgRadius: "1px",
            reviewTextColor: "#646464"
        }
    }

    if ('masonry' === val) {
        return {
            cardPadding: { "top": "20px", "right": "20px", "bottom": "20px", "left": "20px" },
            reviewTextColor: "#646464"
        }
    }
    if ('slider' === val) {
        return {
            reviewTextColor: "#646464"
        }
    }
}

export const getNumber = (val) => {
    const colGap = val;
    const columnGap = colGap.match(/\d/g);
    const gutterX = parseInt(columnGap.join(""));
    return gutterX;

}

export const getAllReviews = (reviews, isEnabled) => {
    const { facebook, yelp, google } = isEnabled;

    const fbReviews = facebook ? reviews.facebook : [];
    const yelpReviews = yelp ? reviews.yelp : [];
    const googleReviews = google ? reviews.google : [];
    const allReviews = [...fbReviews, ...yelpReviews, ...googleReviews];

    return allReviews;
}

export const getSingleData = (allReviews, index, ratingIconColors) => {
    const { google, facebook, yelp } = ratingIconColors;

    const review = allReviews[index];
    const data = review?.author_url ? getGoogleFormattedData(review, google) :
        review?.id ? getYelpFormattedData(review, yelp) :
            review?.reviewer ? (getFBFormattedData(review, facebook)) :
                {};

    return data;
}



export const generateString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.trim();
}


export const adminUrl = () => {
    return window.location.origin + '/wp-admin/edit.php?post_type=grbb&page=business-review#/pricing';
}


