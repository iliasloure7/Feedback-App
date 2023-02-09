function RatingSelect({ selected, handleRatingChange }) {
  const totalRating = 10;

  return (
    <ul className='rating'>
      {Array.from(Array(totalRating)).map((_, index) => {
        return (
          <li key={index + 1}>
            <input
              type='radio'
              id={`num${index + 1}`}
              value={index + 1}
              onChange={handleRatingChange}
              checked={selected === index + 1}
            ></input>
            <label htmlFor={`num${index + 1}`}>{index + 1}</label>
          </li>
        );
      })}
    </ul>
  );
}

export default RatingSelect;
