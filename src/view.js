
import { createRoot } from 'react-dom/client';

import ReviewsFrontEnd from './ReviewsFrontEnd';
import Style from '././Components/Common/Style';
import './style.scss';

// Business Review
document.addEventListener('DOMContentLoaded', () => {
	const allBlockDirectory = document.querySelectorAll('.wp-block-grbb-business-review');
	allBlockDirectory.forEach(reviews => {
		const attributes = JSON.parse(reviews.dataset.attributes);
		const isPremium = Boolean(reviews.dataset.brpipecheck ?? false);

		createRoot(reviews).render(<>
			<Style attributes={attributes} id={reviews?.id} />
			<ReviewsFrontEnd elId={reviews?.id} attributes={attributes} isPremium={isPremium} isBackend={false} clientId={attributes.cId} />
		</>);
		reviews?.removeAttribute('data-attributes');
	});
});