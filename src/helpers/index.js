// Funcion que formatea fechas
export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    return formattedDate;
};
export function formatTime(dateStr) {
    const date = new Date(dateStr);

    const formattedTime = date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return formattedTime;
};

export function calculateTimeDifference(start, end) {
    function convertTo24Hour(time) {
        let [hourStr, minuteStr, period] = time.split(/[:\s]+/); // Split usando : o espacio como separador
        let hours = parseInt(hourStr);
        let minutes = parseInt(minuteStr);

        if (period.toLowerCase() === 'p.m.' && hours !== 12) {
            hours += 12;
        } else if (period.toLowerCase() === 'a.m.' && hours === 12) {
            hours = 0;
        }

        return hours * 60 + minutes;
    }

    function convertTo12HourFormat(minutes) {
        let hours = Math.floor(minutes / 60);
        let mins = minutes % 60;
        let period = hours < 12 ? 'a. m.' : 'p. m.';
        
        if (hours === 0) {
            hours = 12; // Convertir 0 horas a 12 a. m.
        } else if (hours > 12) {
            hours -= 12; // Convertir horas de 13 a 23 a formato 12 horas
        }

        return `${hours} horas y ${mins.toString().padStart(2, '0')} minutos`;
    }

    const startTime = convertTo24Hour(start);
    const endTime = convertTo24Hour(end);

    let difference = endTime - startTime;
    if (difference < 0) {
        difference += 24 * 60; // Añadir 24 horas en minutos si la diferencia es negativa
    }

    const differenceInHours = Math.floor(difference / 60);

    return convertTo12HourFormat(difference)
    
}
