const Name = ({ isName, url, name }) => {
    return isName && <a href={url} className='authorName'>{name}</a>
}
export default Name;