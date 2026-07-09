import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import { withSelect } from "@wordpress/data";
// import { useBlockProps } from '@wordpress/block-editor';

// Settings Components
import { MediaPlaceholder } from '../../../../bpl-tools/Components';
import { tabController } from '../../../../bpl-tools/utils/functions';

import Style from '../Common/Style';
import Reviews from '../../Reviews';
import useFetch from '../../hooks/useFetch';
import Settings from './Settings/Settings';
import ClipBoard from './ClipBoard';


const Edit = props => {
	const { className, attributes, setAttributes, clientId, isSelected, CPTType, currentPostId } = props;

	const shortcode = `[business-review id=${currentPostId}]`;
	const { reviews, allReviews, reFetchData, loading } = useFetch(attributes.isReviewType || {});
	const { setConfig } = wp.data.dispatch('business-review');

	useEffect(() => { clientId && setAttributes({ cId: clientId.substring(0, 10) }); }, [clientId]); // Set & Update clientId to cId

	useEffect(() => tabController(), [isSelected]);
	const [activeIndex, setActiveIndex] = useState(0);

	const id = `grbbBusinessReview-${clientId}`

	return <div {...useBlockProps()}>
		{CPTType === "grbb" && <ClipBoard shortcode={shortcode} />}
		<Settings loading={loading} reFetchData={reFetchData} attributes={attributes} setAttributes={setAttributes} clientId={clientId} activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

		<div id={id}>
			<Style attributes={attributes} id={id} />

			<Reviews reviews={reviews} allReviews={allReviews} loading={loading} reFetchData={reFetchData} attributes={attributes} setAttributes={setAttributes} isBackend={true} wp={{ __, RichText, Spinner, isBlobURL, setAttributes }} custom={{ MediaPlaceholder, activeIndex, setActiveIndex }} shortcode={shortcode} CPTType={CPTType} elId={id} />
		</div>
	</div>;
};
export default withSelect((select) => {
	const currentPostId = select('core/editor').getCurrentPostId();
	const CPTType = select('core/editor').getCurrentPostType?.();
	return {
		currentPostId,
		CPTType
	};
})(Edit);