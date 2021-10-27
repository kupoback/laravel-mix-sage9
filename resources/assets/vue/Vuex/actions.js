import axios from "axios";

/**
 * API call to grab the navigation items from the Rest API
 * @param store
 * @param opts
 * @returns {Promise<AxiosResponse<any> | void>}
 */
export function getNavigation (store, opts) {
    return axios
        .get(
            NAV.api,
            {
                params: {
                    navLocation: opts.navLocation,
                    viewport: opts.viewport
                }
            }
        )
        .then(({data, status}) => {
            if (status === 200 && data.status !== 404) {
                store.commit("buildNavigation", {
                    viewport: opts.viewport,
                    data: data || null,
                });
            }
        })
        .catch(err => console.error(err));
}
