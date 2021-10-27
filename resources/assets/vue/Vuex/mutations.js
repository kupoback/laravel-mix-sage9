/**
 * Used for building out the sites navigation
 * @param currentState
 * @param data
 * @constructor
 */
export function buildNavigation (currentState, {viewport, data}) {
    if (viewport === 'desktop') currentState.desktopNav = data;
    if (viewport === 'mobile') currentState.mobileNav = data;
}
