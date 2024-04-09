export async function getRecipe(mealId) {
  const response = await fetch(`http://127.0.0.1:8080/kitchen/recipes/${mealId}`, {
    method: 'GET',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}