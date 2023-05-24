export const redirectToNewPage = (url) => {
    window.location.href = url;
};

export const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};