import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const URL = 'http://localhost:5000';

  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedbacks()
      .then((data) => {
        setFeedback(data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error.message));
  }, []);

  // Fetch feedbacks
  const fetchFeedbacks = async () => {
    const response = await fetch(`${URL}/feedbacks?_sort=id&_order=desc`);
    if (!response.ok) {
      throw new Error('something went wrong with the url...');
    }
    return await response.json();
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      const newFeedback = feedback.filter((item) => item.id !== id);

      await fetch(`${URL}/feedbacks/${id}`, { method: 'DELETE' })
        .then((result) => setFeedback(newFeedback))
        .catch((error) => console.log(error.message));
    }
  };

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  // Update feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`${URL}/feedbacks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();
    setFeedback(
      feedback.map((item) => {
        return item.id === id ? { ...item, ...data } : item;
      })
    );
  };

  // Add new feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`${URL}/feedbacks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();
    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
