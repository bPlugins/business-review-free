const Image = ({ isProfileImg, url, name }) => {
    return isProfileImg && <div className="img">
        <img decoding="async" loading="lazy" src={url.replaceAll('amp;', '')} data-src={url} alt={name}></img>
    </div>
}
export default Image;
