const Rating = ({ isRatting, stars }) => {
    return isRatting && <div className="rating">
        {stars}
    </div>
}
export default Rating;