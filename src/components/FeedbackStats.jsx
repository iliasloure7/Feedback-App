import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackStats() {
  const { feedback } = useContext(FeedbackContext);

  const avgRating =
    feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length;

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(avgRating) ? 0 : avgRating.toFixed(1)} </h4>
    </div>
  );
}

export default FeedbackStats;
