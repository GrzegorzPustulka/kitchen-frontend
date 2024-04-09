import ActionButton from '../ActionButton/ActionButton.jsx';
import TimeAgo from "../TimeAgo/TimeAgo.jsx";
import styles from './OrderCard.module.css';
import MealSelectorAlert from "../MealSelectorAlert/MealSelectorAlert.jsx";
import {useState} from "react";
import {getRecipe} from "../../api/recipes.jsx";


const OrderCard = ({ order, onDeleteOrder }) => {
  const [isMealSelectorOpen, setIsMealSelectorOpen] = useState(false);

  const handleRecipesClick = () => {
    setIsMealSelectorOpen(true); // Otwieramy modal
  };

  const handleClose = () => {
    setIsMealSelectorOpen(false); // Zamykamy modal
  };

    const handleMealSelect = async (mealId) => {
      try {
        const recipe = await getRecipe(mealId); // Pobierz przepis
        // Przykład wyświetlenia przepisu w alert - zakładam, że otrzymujesz obiekt z przepisem
        // Musisz dostosować poniższy kod do struktury danych, jaką zwraca Twoje API.
        alert(`Przepis: ${recipe.name}\nOpis: ${recipe.steps}`);
      } catch (error) {
        console.error('Failed to fetch recipe:', error);
        alert('Nie udało się pobrać przepisu.');
      }
    };


    return (
        <div className={styles.orderCard}>
            <div>
                <h2>Numer zamówienia: {order.id.split('-')[0]}</h2>
                    <TimeAgo DateTimeFromApi={order.orderDateTime} prefixText="Czas od złożenia zamówienia:"/>
                    <TimeAgo DateTimeFromApi={order.preparationTime} prefixText="Czas przygotowywania:"/>
                <h1>Zamówienie:</h1>
                    <ul>
                        {order.meals.map((meal, index) => (
                        <li key={index}>{meal.meal}: {meal.count}</li>
                        ))}
                    </ul>
                <h1>Uwagi:</h1>
                <p>{order.notes}</p>
            </div>
            <div className={styles.actions}>
                <div>
                    {/* ... reszta kodu OrderCard */}
                    <ActionButton label="PRZEPISY" color="blue" onClick={handleRecipesClick}/>
                    <MealSelectorAlert
                        isOpen={isMealSelectorOpen}
                        meals={order.meals}
                        onSelect={handleMealSelect}
                        onClose={handleClose}
                    />
                </div>

                <ActionButton label="GOTOWE" color="green" onClick={() => onDeleteOrder(order.id, "COMPLETED")}/>
                <ActionButton label="ANULUJ" color="red" onClick={() => onDeleteOrder(order.id, "CANCELLED")}/>
            </div>
        </div>
    );
};

export default OrderCard;
