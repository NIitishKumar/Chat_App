const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser") || "") : null;
    return user || null
}

export {getCurrentUser};