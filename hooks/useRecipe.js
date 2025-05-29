import { useEffect, useState } from 'react';

const useRecipes = (limit = 30) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/recipes?limit=${limit=0}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.recipes);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch recipes:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshRecipes = () => {
    setRefreshing(true);
    fetchRecipes();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/recipes?limit=${limit}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRecipes(data.recipes);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch recipes:', err);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
    fetchData();
  }, [limit]);

  return { 
    recipes, 
    loading, 
    error, 
    refreshing,
    refreshRecipes 
  };
};

export default useRecipes;