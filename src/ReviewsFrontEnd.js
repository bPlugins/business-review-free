
import Default from './Components/layout/Default';
import Grid1 from './Components/layout/Grid1';
import Grid2 from './Components/layout/Grid2';
import Grid3 from './Components/layout/Grid3';
import icons from './utils/icons';
import useFetch from './hooks/useFetch';

const ReviewsFrontEnd = (props) => {
	const { attributes, reFetch } = props;
	const { columns, layout, isReviewType: isEnabled } = attributes;
	const { reviews, loading } = useFetch(isEnabled);

	if (loading || reFetch) {
		return <div className='grbbPreloader'>{icons.preLoader}</div>
	}

	return <div className={`grbbBusinessReview ${layout} columns-${columns.desktop} columns-tablet-${columns.tablet} columns-mobile-${columns.mobile}`}>
		{'default' === layout && <Default attributes={attributes} reviews={reviews} />}
		{'grid1' === layout && <Grid1 attributes={attributes} reviews={reviews} />}
		{'grid2' === layout && <Grid2 attributes={attributes} reviews={reviews} />}
		{'grid3' === layout && <Grid3 attributes={attributes} reviews={reviews} />}
	</div>
}
export default ReviewsFrontEnd