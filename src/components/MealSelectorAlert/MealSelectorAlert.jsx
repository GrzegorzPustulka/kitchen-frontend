
// Styl dla tła modala
const backdropStyle = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0,0,0,0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100,
};

// Styl dla samego modala
const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const MealSelectorAlert = ({ meals, onSelect, onClose, isOpen }) => {
  if (!isOpen) return null;

  const handleMealClick = (mealId) => {
    onSelect(mealId);
    onClose();
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2>Wybierz posiłek:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {meals.map((meal) => (
            <li key={meal.id} style={{ margin: '10px 0' }}>
              <button onClick={() => handleMealClick(meal.mealId)}>
                {meal.meal}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} style={{ marginTop: '20px' }}>
          Zamknij
        </button>
      </div>
    </div>
  );
};

export default MealSelectorAlert;
