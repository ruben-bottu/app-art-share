const handleResponseErrors = (error, errorCallback) => {
    if (error.errors && error.errors.length && error.errors[0].title) {
        errorCallback(error.errors[0].title);
    } else {
        if (error.status == 403) {
            errorCallback(`You don't have access to this application`);
        } else errorCallback(`Something went wrong. Please try again later.`);
    }
};

export { handleResponseErrors };
