// Calculate days until departure
export function getDaysUntilDeparture(departureDate) {
    const today = new Date();
    const departure = new Date(departureDate);
    const diffTime = departure - today;
    const daysUntilTrip = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return daysUntilTrip;
}

// Calculate trip duration
export function getTripDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return duration;
}
