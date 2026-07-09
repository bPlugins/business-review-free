
import { elementorTabIcon, gutenbergTabIcon, phpTabIcon, shortcodeTabIcon } from './icons';

const slug = 'business-review';

export const dashboardInfo = (info) => {
    const { version, isPremium, hasPro, licenseActiveNonce, adminUrl, deleteDataOnUninstall = false, uninstallNonce = '' } = info;


    const proSuffix = isPremium ? ' Pro' : '';

    return {
        name: `Business Reviews${proSuffix}`,
        displayName: `Business Reviews${proSuffix} - Display Customer Reviews from Popular Sites`,
        description: 'Business Reviews helps you display Google, Facebook, and Yelp reviews easily on your WordPress site to build trust and boost your business reputation.',
        slug,
        version,
        isPremium,
        hasPro,
        displayOurPlugins: true,
        media: {
            logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`,
            banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
            thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
            // proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
            video: 'https://www.youtube.com/watch?v=izJKf8Lj1xE',
            isYoutube: true
        },
        pages: {
            org: `https://wordpress.org/plugins/${slug}/`,
            // landing: `https://bplugins.com/products/${slug}/`,
            docs: `https://bplugins.com/docs/${slug}/`,
            pricing: `https://bplugins.com/products/${slug}/pricing`,
        },
        freemius: {
            product_id: 12846,
            plan_id: 34409,
            public_key: 'pk_fc967390d964ec916d711a9a03a91'
        },
        adminUrl,
        licenseActiveNonce,
        deleteDataOnUninstall,
        uninstallNonce,
        startButton: {
            label: 'Start Now',
            url: `${adminUrl}post-new.php?post_type=grbb`
        }
    }
}

export const demoInfo = {
    allInOneLabel: 'See All Demos',
    allInOneLink: 'https://bplugins.com/products/lightbox-block/#demos',
    demos: [
        {
            icon: '',
            title: 'Default',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-default/'
        },
        {
            icon: '',
            title: 'Grid 1',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-grid-1/'
        },
        {
            icon: '',
            title: 'Grid 2',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-grid-2/'
        },
        {
            icon: '',
            title: 'Grid 3',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-grid-3/'
        },
        {
            icon: '',
            title: 'Grid 4',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-grid-4/'
        },
        {
            icon: '',
            title: 'Masonry',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-masonry/'
        },
        {
            icon: '',
            title: 'Toast',
            type: 'iframe',
            url: 'https://bblockswp.com/demo/business-review-toastify/'
        },
    ]
}

export const pricingInfo = {
    logo: `https://ps.w.org/${slug}/assets/icon-256x256.png`, // Optional
    pluginId: 12846,
    planId: 34409,
    licenses: [
        1,
        3,
        null
    ],
    button: {
        label: 'Buy Now ➜'
    },
    featured: {
        selected: 3, // choose from licenses item
    }
}

export const welcomeInfo = (adminUrl) => ({
    keywords: ['Facebook', 'Google', 'Yelp'],
    keywordsLabel: 'Business Review Type',
    gettingStarted: {
        tabs: [
            {
                key: 'gutenberg',
                label: 'Gutenberg',
                icon: gutenbergTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Add the business reviews block',
                        body: 'Open the block editor on any post or page. Click the <strong>+</strong> icon in the top-left corner or type <strong>/business-review</strong> to find and insert the business review block.',
                        link: { url: `${adminUrl}/post-new.php`, label: 'Open Editor' }
                    },
                    {
                        num: 2,
                        title: 'Select Reviews Source',
                        body: 'Choose your preferred review source to configure your review.'
                    },

                    {
                        num: 3,
                        title: 'Publish',
                        body: 'Once everything is configured, click Publish. Make sure you have select the <strong>Reviews Source</strong>.'
                    }
                ]
            },
            {
                key: 'shortcode',
                label: 'ShortCode',
                icon: shortcodeTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Open ShortCode Generator',
                        body: 'Go to <strong>Business Reviews &rsaquo; ShortCode Generator</strong> in your WordPress admin and click <strong>Add New ShortCode</strong>.',
                        link: { url: `${adminUrl}edit.php?post_type=grbb`, label: 'ShortCode Generator' }
                    },
                    {
                        num: 2,
                        title: 'Select review type',
                        body: 'Choose your preferred review type.'
                    },
                    {
                        num: 3,
                        title: 'Configure and Publish',
                        body: 'Configure your review settings and publish the shortcode.'
                    },
                    {
                        num: 4,
                        title: 'Paste Anywhere',
                        body: 'Paste the copied shortcode (e.g. <code>[business-review id=2465]</code>) into any post, page, widget area, or block using the <strong>Shortcode</strong> block.'
                    }
                ]
            },
            {
                key: 'elementor',
                label: 'Elementor',
                icon: elementorTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a ShortCode',
                        body: 'Go to <strong>Business reviews &rsaquo; ShortCode Generator</strong>, click <strong>Add New ShortCode</strong>, configure your layout and query, then publish. Note the shortcode from the list table.',
                        link: { url: `${adminUrl}edit.php?post_type=grbb`, label: 'ShortCode Generator' }
                    },
                    {
                        num: 2,
                        title: 'Add a Shortcode Widget',
                        body: 'Open the Elementor editor on any page. Search for the <strong>Shortcode</strong> widget and drag it to your desired location on the canvas.'
                    },
                    {
                        num: 3,
                        title: 'Enter & Preview',
                        body: 'Type <code>[business-review id=2465]</code> into the widget\'s Shortcode field (replace <em>YOUR_ID</em> with your actual post ID) and click <strong>Preview</strong> to see the posts rendered live.'
                    }
                ]
            },
            {
                key: 'php',
                label: 'Theme / PHP',
                icon: phpTabIcon,
                steps: [
                    {
                        num: 1,
                        title: 'Create a ShortCode',
                        body: 'Go to <strong>Business reviews &rsaquo; ShortCode Generator</strong>, click <strong>Add New ShortCode</strong>, configure your layout and query, then publish. Note the post ID shown in the list table.',
                        link: { url: `${adminUrl}edit.php?post_type=grbb`, label: 'ShortCode Generator' }
                    },
                    {
                        num: 2,
                        title: 'Open Your Template',
                        body: 'Open the theme template file where you want to display the posts block — for example <code>single.php</code>, <code>page.php</code>, or a custom template part.'
                    },
                    {
                        num: 3,
                        title: 'Render via do_shortcode',
                        body: 'Add <code>&lt;?php echo do_shortcode(\'[business-review id=2465]\'); ?&gt;</code> in your template (replace <em>YOUR_ID</em> with your actual post ID) to render the block on the front end.'
                    }
                ]
            }
        ]
    },

    changelogsLimit: 6,
    changelogsReadMoreLabel: 'View More Changelogs',
    changelogs: [
        {
            version: '1.0.18 - 9 July, 2026',
            type: 'new',
            list: [
                'Enhancement: If an API call fails, a user-friendly error message will be displayed.',
                'Fix: The Yelp API issue has been resolved; the reason it was failing was that it could not fetch the reviews.',
                'Update: Redesigned the shortcode and authorization areas.',
                'Update: A modern dashboard has been added to both the Pro and Free versions of the Business Reviews plugin.'
            ]
        },
        {
            version: '1.0.17 – 12 April, 2026',
            type: 'new',
            list: [
                'Shortcode feature added.',
                'New modern dashboard added.'
            ]
        },
        {
            version: '1.0.16 – 17 Nov, 2025',
            type: 'update',
            list: [
                'sdk updated;'
            ]
        },
        {
            version: '1.0.15 – 31 Oct, 2025',
            type: 'fix',
            list: [
                'Fixed all issues'
            ]
        },
        {
            version: '1.0.14 – 30 Oct, 2025',
            type: 'fix',
            list: [
                'Fixed trademark issues'
            ]
        },
        {
            version: '1.0.13 – 12 April, 2026',
            type: 'fix',
            list: [
                'Some problem fixed;'
            ]
        },
        {
            version: '1.0.12 – 24 Feb, 2025',
            type: 'fix',
            list: [
                'Solved Layout Problem and shadow control.',
            ]
        },
        {
            version: '1.0.11 – 19 Feb, 2025',
            type: 'fix',
            list: [
                'ShortCode problem solved;',
            ]
        },
        {
            version: '1.0.10 – 18 Dec, 2024',
            type: 'new',
            list: [
                'singleton patters implement',
            ]
        },
        {
            version: '1.0.9 – 23 Nov, 2024',
            type: 'fix',
            list: [
                '_load_textdomain_just_in_time notice solved',
            ]
        }
    ],
    proFeatures: [
        'Unlimited Facebook reviews',
        'Multiple layout styles',
        'Toast notifications',
        'Advanced typography controls',
        'Review text limit',
        'Improved performance and styling',
        'Review Text Show limit'
    ],
})