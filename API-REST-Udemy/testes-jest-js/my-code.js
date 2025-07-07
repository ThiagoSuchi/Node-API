const sum = (a, b) => {
    return a + b;
}

const isOnHour = () => {
    const now = Date.now();
    const onHourInMili = 1 * 60 * 60 * 1000;
    return now + onHourInMili;
}

module.exports = { sum, isOnHour }