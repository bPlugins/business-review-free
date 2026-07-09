
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, ToggleControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalBorderControl as BorderControl, __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { PremiumBadge, PremiumPanel } from '../../../../../bpl-tools/ProControls';

// Settings Components
import { Label, ColorControl, Background, HelpPanel, Notice } from '../../../../../bpl-tools/Components';
import { BDevice, ShadowControl } from '../../../../../bpl-tools/Components/Deprecated';
import { tabController } from '../../../../../bpl-tools/utils/functions';

import { adminUrl, checkLayout } from '../../../utils/functions';
import options from '../../../utils/options';

const { generalStyleTabs, pxUnit, perUnit, emUnit } = options;

const Settings = ({ attributes, setAttributes }) => {
    const [device, setDevice] = useState('desktop');

    const { isReviewType, reviewPosition, layout, wrapperBgColor, isProfileImg, isName, isTime, isIcon, isRatting, isDescription, cardBackground, cardPadding, cardBorder, cardRadius, cardShadow, cardHoverShadow, secondaryBg, quoteIconColor, imgBgColor, imgPadding, imgBorder, imgRadius, imgShadow, nameColor, nameHoverColor, timeColor, reviewTextColor, ratingIconColors, wrapperPadding, columnGap, rowGap, columns, postedTextColor, postedAuthorColor, showBtnColor, showBtnHoverColor } = attributes;

    return <>
        <InspectorControls>
            <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={() => tabController()}>{tab => <>
                {'general' === tab.name && <>

                    <HelpPanel slug="business-review" docsLink="https://bplugins.com/docs/business-reviews" />

                    <PanelBody className='bPlPanelBody grbbPanelBody' title={__('Review Type', 'business-review')} initialOpen={false}>
                        <ToggleControl label={__('Google', 'business-review')} className='mt20' labelPosition="side" checked={isReviewType.google}
                            onChange={(val) => { setAttributes({ isReviewType: ({ ...isReviewType, google: val }) }) }} />

                        <ToggleControl label={__('Facebook', 'business-review')} className='mt20' checked={isReviewType.facebook} onChange={(val) => { setAttributes({ isReviewType: ({ ...isReviewType, facebook: val }) }) }} />

                        <ToggleControl label={__('Yelp', 'business-review')} className='mt20' checked={isReviewType.yelp} onChange={(val) => { setAttributes({ isReviewType: ({ ...isReviewType, yelp: val }) }) }} />

                        <SelectControl label={__('Top Position', 'business-review')} value={reviewPosition.top}
                            options={options.reviewPositionSelect} labelPosition="side" onChange={(val) => { setAttributes({ reviewPosition: ({ ...reviewPosition, top: val }) }) }} />

                        <SelectControl label={__('Middle', 'business-review')} value={reviewPosition.middle} options={options.reviewPositionSelect} labelPosition="side" onChange={(val) => {
                            setAttributes({ reviewPosition: ({ ...reviewPosition, middle: val }) })
                        }} />

                        <SelectControl label={__('Bottom', 'business-review')} value={reviewPosition.bottom}
                            options={options.reviewPositionSelect} labelPosition="side" onChange={(val) => {
                                setAttributes({ reviewPosition: ({ ...reviewPosition, bottom: val }) })
                            }} />

                    </PanelBody>


                    <PanelBody className='bPlPanelBody' title={<> {__('Clear Cache', 'business-review')}<PremiumBadge />
                    </>} initialOpen={false}>
                        <PremiumPanel title={__('Clear Cache', 'business-review')} description={__('The Business Reviews plugin caches data from Google, Facebook, and Yelp to improve loading speed. Once enabled, you can clear the cache anytime to fetch the latest reviews.', 'business-review')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/business-reviews/#demos' />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={<> {__('Toast', 'business-review')}<PremiumBadge />
                    </>} initialOpen={false}>
                        <PremiumPanel title={__('Toast', 'business-review')} description={__('Add a notification toast to your website that displays new reviews as they come in. This helps to show social proof and encourage more people to leave reviews.(Toast Position, Toast Duration, Toast Animation)', 'business-review')} pricingUrl={adminUrl()} demoUrl='https://bplugins.com/products/business-reviews/#demos' />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Elements', 'business-review')} initialOpen={false}>
                        <ToggleControl label={__('Image', 'business-review')} className='mt20' checked={isProfileImg}
                            onChange={(val) => { setAttributes({ isProfileImg: val }); }}
                        />
                        <ToggleControl label={__('Name', 'business-review')} className='mt20' checked={isName}
                            onChange={(val) => { setAttributes({ isName: val }); }}
                        />
                        <ToggleControl label={__('Time', 'business-review')} className='mt20' checked={isTime}
                            onChange={(val) => { setAttributes({ isTime: val }); }}
                        />
                        <ToggleControl label={__('Icon', 'business-review')} className='mt20' checked={isIcon}
                            onChange={(val) => { setAttributes({ isIcon: val }); }}
                        />
                        <ToggleControl label={__('Ratting', 'business-review')} className='mt20' checked={isRatting}
                            onChange={(val) => { setAttributes({ isRatting: val }); }}
                        />
                        <ToggleControl label={__('Review Text', 'business-review')} className='mt20' checked={isDescription} onChange={(val) => { setAttributes({ isDescription: val }); }} />


                        <Notice status='premium' isIcon={true}>{__('Review Text Limit option is available in the Premium version.', 'business-review')}</Notice>
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Layouts', 'business-review')} initialOpen={false}>

                        <SelectControl label={__('Select Layout', 'business-review')} labelPosition="side" value={layout} options={options.layouts} onChange={(val) => {
                            setAttributes({ layout: val, ...checkLayout(val) })
                        }} />

                        {/* column define option  */}
                        <PanelRow className='mt20'>
                            <Label mt='0'>{__('Columns:', 'business-review')}</Label>
                            <BDevice device={device} onChange={val => setDevice(val)} />
                        </PanelRow>
                        <RangeControl value={columns[device]} onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }} min={1} max={6} step={1} beforeIcon='grid-view' />

                        {/* column Gap  */}
                        <UnitControl className='mt20' label={__('Column Gap:', 'business-review')} labelPosition='left' value={columnGap} onChange={val => setAttributes({ columnGap: val })} units={[pxUnit(30), perUnit(3), emUnit(2)]} isResetValueOnUnitChange={true} />

                        {/* row Gap  */}
                        <UnitControl className='mt20' label={__('Row Gap:', 'business-review')} labelPosition='left' value={rowGap} onChange={val => setAttributes({ rowGap: val })} units={[pxUnit(40), perUnit(3), emUnit(2.5)]} isResetValueOnUnitChange={true} />

                        <Notice status='premium' isIcon={true}>{__('Layout Grid 4, Masonry and Toast options is available in the Premium version.', 'business-review')}</Notice>
                    </PanelBody>
                </>}

                {'style' === tab.name && <>
                    <PanelBody className='bPlPanelBody' title={__('Wrapper', 'business-review')} initialOpen={false}>
                        <Background className='mb10' label={__('Background:', 'business-review')} value={wrapperBgColor} onChange={val => setAttributes({ wrapperBgColor: val })} />

                        <BoxControl label={__('Padding', 'business-review')} values={wrapperPadding} onChange={val => setAttributes({ wrapperPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />

                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Card', 'business-review')} initialOpen={false}>
                        <Background className='mb10' label={__('Background:', 'business-review')} value={cardBackground} onChange={val => setAttributes({ cardBackground: val })} />

                        {'grid3' === layout &&
                            <Background label={__('Header background:', 'business-review')} value={secondaryBg} onChange={val => setAttributes({ secondaryBg: val })} />
                        }

                        <BoxControl label={__('Padding', 'business-review')} values={cardPadding} onChange={val => setAttributes({ cardPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />

                        <BorderControl className='mt10' label={__('Border', 'business-review')} value={cardBorder} onChange={(val) => setAttributes({ cardBorder: val })} />

                        <UnitControl className='mt20' label={__('Radius:', 'business-review')} labelPosition='left' value={cardRadius} onChange={val => setAttributes({ cardRadius: val })} units={[pxUnit(10), emUnit(2)]} isResetValueOnUnitChange={true} />

                        <ShadowControl label={__('Shadow:', 'business-review')} value={cardShadow} onChange={val => setAttributes({ cardShadow: val })} />

                        <ShadowControl label={__('Hover Shadow:', 'business-review')} value={cardHoverShadow} onChange={val => setAttributes({ cardHoverShadow: val })} />
                    </PanelBody>

                    {'grid3' === layout &&
                        <PanelBody className='bPlPanelBody' title={__('Quote Icon', 'business-review')} initialOpen={false}>
                            <ColorControl label={__('Color', 'business-review')} value={quoteIconColor}
                                onChange={val => setAttributes({ quoteIconColor: val })} />
                        </PanelBody>
                    }

                    <PanelBody className='bPlPanelBody' title={__('Image', 'business-review')} initialOpen={false}>

                        <ColorControl className='mb10' label={__('Background Color', 'tiktok')} value={imgBgColor} onChange={val => setAttributes({ imgBgColor: val })} defaultColor={{ color: '#000' }} />

                        <BoxControl label={__('Padding', 'business-review')} values={imgPadding} onChange={val => setAttributes({ imgPadding: val })} resetValues={{ top: 0, right: 0, bottom: 0, left: 0 }} units={[pxUnit(3), emUnit(2)]} />

                        <BorderControl className='mt10' label={__('Border', 'business-review')} value={imgBorder} onChange={(val) => setAttributes({ imgBorder: val })} />

                        <UnitControl className='mt10' label={__('Radius:', 'business-review')} labelPosition='left' value={imgRadius} onChange={val => setAttributes({ imgRadius: val })} units={[pxUnit(10), perUnit(100)]} isResetValueOnUnitChange={true} />

                        <ShadowControl label={__('Shadow:', 'business-review')} value={imgShadow} onChange={val => setAttributes({ imgShadow: val })} />
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Name', 'business-review')} initialOpen={false}>
                        <ColorControl label={__('Color', 'business-review')} value={nameColor}
                            onChange={val => setAttributes({ nameColor: val })} defaultColor='#000' />

                        <ColorControl label={__('Hover Color', 'business-review')} value={nameHoverColor}
                            onChange={val => setAttributes({ nameHoverColor: val })} defaultColor='#777' />

                        <Notice status='premium' isIcon={true}>{__('Typography options are available in the Premium version.', 'business-review')}</Notice>
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Time', 'business-review')} initialOpen={false}>
                        <ColorControl label={__('Color', 'business-review')} value={timeColor}
                            onChange={val => setAttributes({ timeColor: val })} defaultColor='#8c8c8c' />

                        <Notice status='premium' isIcon={true}>{__('Typography options are available in the Premium version.', 'business-review')}</Notice>
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Review Text', 'business-review')} initialOpen={false}>
                        <ColorControl label={__('Color', 'business-review')} value={reviewTextColor}
                            onChange={val => setAttributes({ reviewTextColor: val })} defaultColor='#8c8c8c' />
                        <Notice status='premium' isIcon={true}>{__('Typography options are available in the Premium version.', 'business-review')}</Notice>
                    </PanelBody>

                    <PanelBody className='bPlPanelBody' title={__('Rating Icon', 'business-review')} initialOpen={false}>
                        <ColorControl label={__('Google', 'business-review')} value={ratingIconColors.google}
                            onChange={val => setAttributes({ ratingIconColors: { ...ratingIconColors, google: val } })} />
                        <ColorControl label={__('Facebook', 'business-review')} value={ratingIconColors.facebook}
                            onChange={val => setAttributes({ ratingIconColors: { ...ratingIconColors, facebook: val } })} />
                        <ColorControl label={__('Yelp', 'business-review')} value={ratingIconColors.yelp}
                            onChange={val => setAttributes({ ratingIconColors: { ...ratingIconColors, yelp: val } })} />
                    </PanelBody>

                    {(layout === 'grid1' || layout === 'grid2' || layout === 'slider') && <>
                        <PanelBody className='bPlPanelBody' title={__('Posted On', 'business-review')} initialOpen={false}>
                            <ColorControl label={__('Text Color', 'business-review')} value={postedTextColor}
                                onChange={val => setAttributes({ postedTextColor: val })} defaultColor='#ffffff80' />


                            <ColorControl label={__('Author Color', 'business-review')} value={postedAuthorColor}
                                onChange={val => setAttributes({ postedAuthorColor: val })} />

                            <Notice status='premium' isIcon={true}>{__('Typography options are available in the Premium version.', 'business-review')}</Notice>
                        </PanelBody>
                    </>}
                    <PanelBody className='bPlPanelBody' title={__('Show Text', 'business-review')} initialOpen={false}>
                        <ColorControl label={__('Color', 'business-review')} value={showBtnColor}
                            onChange={val => setAttributes({ showBtnColor: val })} />
                        <ColorControl label={__('Hover Color', 'business-review')} value={showBtnHoverColor}
                            onChange={val => setAttributes({ showBtnHoverColor: val })} />
                    </PanelBody>

                </>}
            </>}</TabPanel>
        </InspectorControls>
    </>;
};

export default withSelect((select) => {
    const { isSavingPost } = select("core/editor");
    return {
        isSaving: isSavingPost()
    }
})(Settings);



