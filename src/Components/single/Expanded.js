import { useState } from 'react';

const Expanded = ({ review_text, showText }) => {
    const [expanded, setExpanded] = useState(false);
    const textLength = review_text?.length;
    const dataForDisplay = expanded ? review_text : review_text.slice(0, showText);
    return <>  <p>{dataForDisplay}</p>
        {textLength > showText &&
            <button className='expandedBtn' type="button" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Show Less" : "Show More"}
            </button>
        }
    </>
}
export default Expanded;