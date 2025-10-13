import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favoriteNumbers, setFavoriteNumbers] = useState([]);
  const [favoriteStores, setFavoriteStores] = useState([]);

  useEffect(() => {
    // 로컬스토리지에서 즐겨찾기 불러오기
    const savedNumbers = localStorage.getItem('favoriteNumbers');
    const savedStores = localStorage.getItem('favoriteStores');
    
    if (savedNumbers) {
      setFavoriteNumbers(JSON.parse(savedNumbers));
    }
    
    if (savedStores) {
      setFavoriteStores(JSON.parse(savedStores));
    }
  }, []);

  const addFavoriteNumbers = (numbers) => {
    const numberSet = {
      id: Date.now(),
      numbers: [...numbers].sort((a, b) => a - b),
      createdAt: new Date().toISOString(),
      name: `번호조합 ${favoriteNumbers.length + 1}`
    };
    
    const updated = [numberSet, ...favoriteNumbers];
    setFavoriteNumbers(updated);
    localStorage.setItem('favoriteNumbers', JSON.stringify(updated));
  };

  const removeFavoriteNumbers = (id) => {
    const updated = favoriteNumbers.filter(item => item.id !== id);
    setFavoriteNumbers(updated);
    localStorage.setItem('favoriteNumbers', JSON.stringify(updated));
  };

  const addFavoriteStore = (store) => {
    if (favoriteStores.find(s => s.name === store.name)) {
      return; // 이미 즐겨찾기에 있음
    }
    
    const updated = [...favoriteStores, { ...store, favoriteAt: new Date().toISOString() }];
    setFavoriteStores(updated);
    localStorage.setItem('favoriteStores', JSON.stringify(updated));
  };

  const removeFavoriteStore = (storeName) => {
    const updated = favoriteStores.filter(store => store.name !== storeName);
    setFavoriteStores(updated);
    localStorage.setItem('favoriteStores', JSON.stringify(updated));
  };

  const isFavoriteStore = (storeName) => {
    return favoriteStores.some(store => store.name === storeName);
  };

  return {
    favoriteNumbers,
    favoriteStores,
    addFavoriteNumbers,
    removeFavoriteNumbers,
    addFavoriteStore,
    removeFavoriteStore,
    isFavoriteStore
  };
}