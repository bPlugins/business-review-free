import { createReduxStore, register } from "@wordpress/data";

const reducer = (state = {}, action) => {
    const { data } = state;
    const { fbAccessToken, fbPageAccessToken, ...otherData } = data;

    switch (action.type) {
        case 'SET_DATA':
            return { ...state, data: { ...state.data, ...action.payload } }
        case 'SET_CONFIG':
            return { ...state, ...action.payload }
        case 'REMOVE_ACCESS_TOKEN':
            return { ...state, data: otherData }
        default:
            return state;
    }
};

const initialState = {
    data: {},
    fbAuthorized: false,
    reFetch: false,
    reviews: {},
    allReviews: [],
    isLoading: true
};

const store = createReduxStore("business-review", {
    initialState,
    reducer,
    actions: {
        setData: (payload) => {
            if (typeof payload !== "object") {
                return {};
            }
            return {
                type: "SET_DATA",
                payload,
            }
        },
        setConfig: (payload) => {
            if (typeof payload !== "object") {
                return {};
            }
            return {
                type: "SET_CONFIG",
                payload,
            }
        },
        removeToken: (payload) => {
            return {
                type: "REMOVE_ACCESS_TOKEN",
                payload,
            }
        },
        setReviews: (payload) => {
            return {
                type: 'lsdk',
                payload
            }
        }
    },

    selectors: {
        getData: (state) => state.data,
        getConfig: ({ data, ...other }) => other,
        getReviews: (state) => {
            return state.reviews;
        }
    },
});

register(store);
