import { useState, useEffect } from 'react';

const TimeAgo = ({ DateTimeFromApi: DateTimeFromApi, prefixText }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateDifference = () => {
      const orderTime = new Date(DateTimeFromApi);
      const now = new Date();
      const differenceInMinutes = Math.round((now - orderTime) / 60000); // różnica w minutach
      const hours = Math.floor(differenceInMinutes / 60);
      const minutes = differenceInMinutes % 60;

      let timeAgoText = '';
      if (hours > 0) {
        timeAgoText += `${hours}h `;
      }
      timeAgoText += `${minutes} min`;

      // Dodaj prefixText na początku, jeśli jest dostępny
      setTimeAgo(`${prefixText ? prefixText + ' ' : ''}${timeAgoText}`);
    };

    updateDifference(); // Aktualizuj przy montowaniu

    const intervalId = setInterval(updateDifference, 60000); // Aktualizuj co minutę

    return () => clearInterval(intervalId); // Wyczyść interval przy demontowaniu
  }, [DateTimeFromApi, prefixText]); // Dodaj prefixText do listy zależności

  return <p>{timeAgo}</p>;
};

export default TimeAgo;
