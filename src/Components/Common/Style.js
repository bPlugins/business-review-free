
import { getBoxValue } from '../../utils/functions';
import { getBackgroundCSS, getTypoCSS, getShadowCSS } from '../../../../bpl-tools/utils/getCSS';

const Style = ({ attributes, id }) => {
	const { wrapperBgColor, wrapperPadding, cardBackground, cardPadding, cardBorder, cardRadius, cardShadow, cardHoverShadow, secondaryBg, quoteIconColor, nameTypo, nameColor, nameHoverColor, imgBgColor, imgBorder, imgPadding, imgRadius, imgShadow, timeTypo, timeColor, reviewTextTypo, reviewTextColor, columnGap, rowGap, postedTextColor, postedTextTypo, postedAuthor, postedAuthorTypo, showBtnColor, showBtnHoverColor } = attributes;

	const mainEle = `#${id}`;

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', nameTypo)?.googleFontLink}
		${getTypoCSS('', reviewTextTypo)?.googleFontLink}
		${getTypoCSS('', timeTypo)?.googleFontLink}
		${getTypoCSS('', postedTextTypo)?.googleFontLink}
		${getTypoCSS('', postedAuthorTypo)?.googleFontLink}

		${getTypoCSS(`${mainEle} .singleWrap .authorName`, nameTypo)?.styles}
		${getTypoCSS(`${mainEle} .singleWrap .reviewText p`, reviewTextTypo)?.styles}
		${getTypoCSS(`${mainEle} .singleWrap .reviewTime`, timeTypo)?.styles}
		${getTypoCSS(`${mainEle} .singleWrap .providedBy p`, postedTextTypo)?.styles}
		${getTypoCSS(`${mainEle} .singleWrap .providedBy a`, postedAuthorTypo)?.styles}
		
		${mainEle} {
			${getBackgroundCSS(wrapperBgColor)};
			padding: ${getBoxValue(wrapperPadding)};
		}
		${mainEle} .grbbBusinessReview{
			grid-gap: ${rowGap} ${columnGap};
		}
		${mainEle} .reviewCard {
			${getBackgroundCSS(cardBackground)};
			padding: ${getBoxValue(cardPadding)};
			border: ${getBoxValue(cardBorder)};
			border-radius: ${cardRadius};
			box-shadow: ${getShadowCSS(cardShadow)};
			transition: 0.3s;
		}
		${mainEle} .reviewCard:hover {
			box-shadow: ${getShadowCSS(cardHoverShadow)};
			transition: 0.3s;
		}
		${mainEle} .grid2Single .reviewCard .angel {
			${getBackgroundCSS(cardBackground)}
		}
		${mainEle} .grid2Single .reviewCard::after {
			left: calc(40px - ${cardBorder?.width});
			border: calc(8px + ${cardBorder?.width}) solid transparent;
			border-top: calc(14px + ${cardBorder?.width}) solid ${cardBorder?.color};
		}
		${mainEle} .singleWrap .grid3Heading {
			${getBackgroundCSS(secondaryBg)};
		}
		${mainEle} .singleWrap .grid3Heading:before{
			color:${quoteIconColor}
		}
		${mainEle} .singleWrap .authorName{
			color:${nameColor};
		}
		${mainEle} .singleWrap .authorName:hover{
			color:${nameHoverColor};
		}
		${mainEle} .singleWrap .img img{
			background:${imgBgColor};
			border:${getBoxValue(imgBorder)};
			border-radius: ${imgRadius};
			box-shadow: ${getShadowCSS(imgShadow)};
			padding:${getBoxValue(imgPadding)};
		}

		${mainEle} .grid4Single .reviewCard .img::after, ${mainEle} .grid4Single .reviewCard .img::before {
			background:${imgBorder.color}
		}
		${mainEle} .singleWrap .reviewTime{
			color:${timeColor};
		}
		${mainEle} .singleWrap .reviewText p{
			color:${reviewTextColor};
		}
		${mainEle} .singleWrap .providedBy p{
			color:${postedTextColor};
		}
		${mainEle} .singleWrap .providedBy a{
			color:${postedAuthor};
		}
		${mainEle} .expandedBtn {
			color:${showBtnColor};
		}
		${mainEle} .expandedBtn:hover {
			color:${showBtnHoverColor}
		}
		`.replace(/\s+/g, ' ')
	}} />;
}
export default Style;