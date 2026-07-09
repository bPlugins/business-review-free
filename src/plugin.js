
import { withSelect } from '@wordpress/data';
import useWPOptionMutation from './utils/useWPOptionMutation';
import useWPOptionQuery from './utils/useWPOptionQuery';
import icons from './utils/icons';
import { generateString } from './utils/functions';
import fb_prompt from './utils/fb_prompt';
import { Label } from '../../bpl-tools/Components';

// Using ESNext syntax
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { PanelBody, __experimentalInputControl as InputControl, Button, PanelRow } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';

import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

const Component = (props) => {
    const { setData, stateApiData, setConfig, removeToken } = props;
    const [accessToken, setAccessToken] = useState(null);

    const { data, isLoading: loading, saveData } = useWPOptionMutation('grbb_apis', { dataType: 'object' });
    const { data: apisData = {}, isLoading } = useWPOptionQuery('grbb_apis');
    const { googlePlaceKey, googlePlaceID, yelpKey, yelpBusinessURL, fbAccessToken, fbPageAccessToken } = stateApiData || {};

    // set data to store after get data from database first-time
    useEffect(() => {
        if (!isLoading) {
            setData({ ...apisData });
            setConfig({ isLoading: false });
        }
    }, [isLoading]);

    // set data to store after save on database
    useEffect(() => {
        if (!loading) {
            setData({ ...data });
        }
    }, [data]);

    const handleClearCache = async () => {
        const res = await fetch(`${grbbData?.ajaxUrl}?action=grbb_remove_cache&nonce=${grbbData?.nonce}`);
        await res.json();
        setConfig({ reFetch: true });
    }

    const handleSaveData = () => {
        if (!loading) {
            saveData(stateApiData);
            handleClearCache();
            // setTimeout(() => {
            //     setConfig({ reFetch: true });
            // }, 300);

        }
    }

    const handleRemoveAuthorization = async () => {
        if (!loading) {
            const { fbAccessToken, pageID, fbPageAccessToken, ...others } = stateApiData;
            saveData({ ...others });
            const res = await fetch(`${grbbData?.ajaxUrl}?action=grbb_remove_cache&nonce=${grbbData?.nonce}`);
            await res.json();
            setTimeout(() => {
                removeToken();
                setConfig({ reFetch: true });
            }, 300);
        }
    }

    useEffect(() => {
        if (accessToken && !isLoading) {
            setAccessToken(false);
            saveData(stateApiData);
        }
    }, [accessToken, stateApiData]);

    useEffect(() => {
        if (!loading) {
            setConfig({ reFetch: true })
        }
    }, [loading])

    return (
        <Fragment>
            <PluginSidebarMoreMenuItem target="business-review">{__("Business Review", "business-review")}</PluginSidebarMoreMenuItem>
            <PluginSidebar name="business-review" title={__("Business Review", "business-review")}>
                <PanelBody className='bPlPanelBody' title={__('Facebook', 'business-review')} initialOpen={true}>

                    {fbPageAccessToken || fbAccessToken ? <div className='ttpAuthorization'><Button className='fbLogout' disabled={loading} onClick={handleRemoveAuthorization}>{__('Remove Authorization', 'business-review')}</Button></div> : <>

                        <PanelRow className='grbbGetHelpButton'>
                            <Label className='mt0 mb0'>{__('Connect your Facebook Page by clicking the button below.', 'business-review')}</Label>
                            <a className='grbbTarget' href='https://bplugins.com/docs/business-reviews/guides/authorization-facebook/' rel='noreferrer' target="_blank">{__('Get Help', 'business-review')}</a>
                        </PanelRow>

                        <div className='ttpAuthorization mt15'><Button className='fbAuthBtn' onClick={async () => {
                            const state = generateString(15);
                            const url = `https://api.bplugins.com/facebook-auth/?state=${state}`
                            fb_prompt(url, 670, 520, function () {
                                fetch(`${grbbData?.ajaxUrl}?action=grbb_get_access_token&state=${state}&nonce=${grbbData?.nonce}`).then(res => res.json()).then((data) => {
                                    const { access_token, page_access_token, page_id } = data;
                                    setData({ fbAccessToken: access_token, fbPageAccessToken: page_access_token, pageID: page_id });
                                    setConfig({ isLoading: false });
                                    setAccessToken(access_token);
                                })
                            });

                        }} > {__('Login with facebook', 'business-review')}</Button></div> </>}

                </PanelBody>

                <PanelBody className='bPlPanelBody grbbPanelBody' title={__('Google', 'business-review')} initialOpen={true}>
                    <PanelRow className='grbbGetHelpButton'>
                        <Label className='mt0 mb0'>{__('Google Place API Key', 'business-review')}</Label>
                        <a className='grbbTarget' href='https://bplugins.com/docs/business-reviews/guides/authorization-google/' rel='noreferrer' target="_blank">{__('Get Help', 'business-review')}</a>
                    </PanelRow>
                    <InputControl value={googlePlaceKey} onChange={val => setData({ googlePlaceKey: val })} />
                    <InputControl label={__('Google Place ID', 'business-review')} value={googlePlaceID} onChange={(val) => setData({ googlePlaceID: val })} />
                </PanelBody>

                <PanelBody className='bPlPanelBody grbbPanelBody' title={__('Yelp', 'business-review')} initialOpen={true}>
                    <PanelRow className='grbbGetHelpButton'>
                        <Label className='mt0 mb0'>{__(' Yelp API Key', 'business-review')}</Label>
                        <a className='grbbTarget' href='https://bplugins.com/docs/business-reviews/guides/authorization-yelp/' rel='noreferrer' target="_blank">{__('Get Help', 'business-review')}</a>
                    </PanelRow>
                    <InputControl value={yelpKey} onChange={val => setData({ yelpKey: val })} />
                    <InputControl label={__('Yelp Business URL', 'business-review')} value={yelpBusinessURL} onChange={val => setData({ yelpBusinessURL: val })} />
                </PanelBody>

                <div className='ttpAuthorization'><Button className='ttpAuthBtn mt10' disabled={loading} onClick={handleSaveData}>{__('Save Information', 'business-review')}</Button></div>
            </PluginSidebar>
        </Fragment >
    );
};

registerPlugin("business-review", {
    icon: icons.businessReview,

    render: compose(
        withDispatch((dispatch) => {
            const { setData, setConfig, removeToken } = dispatch('business-review') || {}
            return {
                setData, setConfig, removeToken
            }
        }),
        withSelect((select) => {
            const stateApiData = select('business-review').getData();
            const { fbAuthorized } = select('business-review').getConfig();
            return {
                stateApiData,
                fbAuthorized
            }
        })
    )(Component)
});

