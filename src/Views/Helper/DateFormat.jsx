export const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};

export const formatDate2 = (date) => {
    const d = new Date(date);
    const dMY = d.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    return dMY?.split(" ").join('-')
}