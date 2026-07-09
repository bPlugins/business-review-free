import { format } from 'timeago.js';

const Time = ({ isTime, time }) => {
    window.format = format;

    return isTime && <div className="reviewTime">
        {time?.includes('ago') ? time : format(time)}
    </div>
}
export default Time; 