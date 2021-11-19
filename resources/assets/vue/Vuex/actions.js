import axios from "axios";

/**
 * API call to grab the navigation items from the Rest API
 * @param store
 * @param {string} navLocation 
 * @param {string} viewport
 * @returns {Promise<AxiosResponse<any> | void>}
 */
export async function getNavigation (store, {navLocation, viewport}) {
    return await axios
        .get(
            NAV.api,
            {
                params: {
                    navLocation: navLocation,
                    viewport: viewport
                }
            }
        )
        .then(({data, status}) => {
            if (status === 200 && data.status !== 404) {
                store.commit("buildNavigation", {
                    viewport,
                    data: data || null,
                });
            }
        })
        .catch(err => console.error(err));
}
