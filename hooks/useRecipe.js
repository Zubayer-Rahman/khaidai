import { useEffect, useState } from 'react';

const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;