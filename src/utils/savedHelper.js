export function getAllUserSaved() {
    const allSaved = JSON.parse(localStorage.getItem('savedArticlesByUser')) || {};
    return allSaved;
}

export function getUserSaved(username) {
    const allSaved = getAllUserSaved();
    return allSaved[username] || [];
}

export function getUserStats() {
    const allSaved = getAllUserSaved();
    return Object.keys(allSaved).map(username => ({
        username,
        savedCount: allSaved[username].length,
        saved: allSaved[username]
    }));
}

