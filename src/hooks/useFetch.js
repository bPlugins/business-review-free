import { useEffect, useState } from 'react';

const useFetch = (isEnabled) => {
    const { google, facebook, yelp } = isEnabled;

    const [reviews, setReviews] = useState({});
    const [allReviews, setAllReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // const [fetchedReviews, setFetchedReviews] = useState({});

    const fetchAllReviews = async (platform = 'facebook,google,yelp') => {
        setLoading(true);
        try {
            const res = await fetch(`${grbbData?.ajaxUrl}?action=get_all_reviews&nonce=${grbbData?.nonce}&platform=${platform}`);
            const data = await res.json();
            const rev = { ...reviews, ...data }
            setReviews(rev);
            setAllReviews(getAllReviews(rev));

        } catch (error) {
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const getAllReviews = (reviews) => {
        const fbReviews = facebook ? (reviews?.facebook || []) : [];
        const yelpReviews = yelp ? (reviews?.yelp || []) : [];
        const googleReviews = google ? (reviews?.google || []) : [];
        const allRev = [...fbReviews, ...yelpReviews, ...googleReviews];
        return allRev;
    }

    useEffect(() => {
        fetchAllReviews('facebook,google,yelp');
    }, [])

    useEffect(() => {
        const allRev = getAllReviews(reviews);
        const enabled = Object.keys(isEnabled).filter(item => isEnabled[item]).filter(item => {
            return !reviews[item]?.length;
        });

        if (enabled.length > 0 && !loading) {
            fetchAllReviews(enabled.join(','));
        } else {
            if (allRev.length != allReviews.length) {
                setLoading(true);
                setAllReviews(allRev);
                setTimeout(() => {
                    setLoading(false)
                }, 10);
            }
        }

    }, [isEnabled]);


    const reFetchData = (platform = 'facebook,google,yelp') => {
        fetchAllReviews(platform);
    }

    return { reviews, allReviews, reFetchData, loading, error }
}
export default useFetch;