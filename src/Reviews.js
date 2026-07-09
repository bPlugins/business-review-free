import { __ } from '@wordpress/i18n';
import { useEffect, useRef } from 'react';
import { withSelect } from '@wordpress/data';
import 'react-toastify/dist/ReactToastify.css';

import Default from './Components/layout/Default';
import Grid1 from './Components/layout/Grid1';
import Grid2 from './Components/layout/Grid2';
import Grid3 from './Components/layout/Grid3';
import icons from './utils/icons';

const Reviews = (props) => {
	const { attributes, isBackend = false, reFetch, apiData, isLoading, reviews, reFetchData, loading } = props;
	const { columns, layout } = attributes;

	const { setConfig } = wp.data.dispatch('business-review');
	const initDom = useRef();

	useEffect(() => {
		if (reFetch) {
			reFetchData();
			setConfig({ reFetch: false });
		}
	}, [reFetch]);

	if (loading || reFetch) {
		return <div className='grbbPreloader'>{icons.preLoader}</div>
	}

	if (!isLoading) {
		if (!(apiData?.googlePlaceID && apiData?.googlePlaceKey) && !(apiData?.yelpBusinessURL && apiData?.yelpKey)
			&& !(apiData?.fbAccessToken)) {
			if (isBackend) {
				return <div className='grbb-authorization'>
					<div className='grbb-authorization__icon'>
						<svg width='28' height='28' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<rect x='4' y='11' width='16' height='10' rx='2' stroke='currentColor' strokeWidth='1.8' />
							<path d='M8 11V7a4 4 0 0 1 8 0v4' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
							<circle cx='12' cy='16' r='1.6' fill='currentColor' />
						</svg>
					</div>
					<h3 className='grbb-authorization__title'>{__('Authorization Or Access Token Required', 'business-review')}</h3>
					<p className='grbb-authorization__desc'>{__('Connect your Google, Facebook, or Yelp account by adding an API key to start displaying your reviews.', 'business-review')}</p>
					<button className='grbb-authorization__btn' onClick={() => {
						wp.data.dispatch('core/edit-post').openGeneralSidebar('business-review/business-review');
					}}>
						<svg width='16' height='16' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
							<path d='M12 5v14M5 12h14' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
						</svg>
						{__('Configure Api Key', 'business-review')}
					</button>
				</div>
			}
			return <span></span>;
		}
	}

	const apiErrors = isBackend && reviews?.errors && typeof reviews.errors === 'object' ? Object.entries(reviews.errors) : [];

	return <>
		{apiErrors.length > 0 && <div className='grbb-api-errors' style={{ background: '#fcf0f1', border: '1px solid #d63638', borderRadius: 4, padding: '8px 12px', marginBottom: 10 }}>
			{apiErrors.map(([platform, message]) => (
				<p key={platform} style={{ margin: '4px 0', color: '#d63638' }}>
					<strong>{platform.charAt(0).toUpperCase() + platform.slice(1)}: </strong>{message}
				</p>
			))}
		</div>}
		<div ref={initDom} className={`grbbBusinessReview ${layout} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>

			{'default' === layout &&
				<Default attributes={attributes} reviews={reviews} />
			}
			{'grid1' === layout &&
				<Grid1 attributes={attributes} reviews={reviews} />
			}
			{'grid2' === layout &&
				<Grid2 attributes={attributes} reviews={reviews} />
			}
			{'grid3' === layout &&
				<Grid3 attributes={attributes} reviews={reviews} />
			}
		</div>
	</>
}

export default withSelect((select) => {
	const { reFetch, isLoading } = select('business-review').getConfig();
	const apiData = select('business-review').getData();

	return {
		reFetch, apiData, isLoading
	}
})(Reviews);

