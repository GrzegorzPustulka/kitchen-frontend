import { useState, useEffect } from 'react';

const TimeAgo = ({ DateTimeFromApi: DateTimeFromApi, prefixText }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateDifference = () => {
      const orderTime = new Date(DateTimeFromApi);
      const now = new Date();
      const differenceInMinutes = Math.round((now - orderTime) / 60000);
      const hours = Math.floor(differenceInMinutes / 60);
      const minutes = differenceInMinutes % 60;

      let timeAgoText = '';
      if (hours > 0) {
        timeAgoText += `${hours}h `;
      }
      timeAgoText += `${minutes} min`;

      setTimeAgo(`${prefixText ? prefixText + ' ' : ''}${timeAgoText}`);
    };

    updateDifference();

    const intervalId = setInterval(updateDifference, 60000);

    return () => clearInterval(intervalId);
  }, [DateTimeFromApi, prefixText]);

  return <p>{timeAgo}</p>;
};

export default TimeAgo;
