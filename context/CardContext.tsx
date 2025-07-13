import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '../types/Card';

const STORAGE_KEY = 'savedCards';

interface CardContextType {
  savedCards: Card[];
  addCard: (card: Card) => void;
  clearCards: () => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [savedCards, setSavedCards] = useState<Card[]>([]);

  // Download cards from memory of phone
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        try {
          const parsed: Card[] = JSON.parse(data);
          setSavedCards(parsed);
        } catch {
          console.warn('Error parsing of saved cards');
        }
      }
    })();
  }, []);

  const saveToStorage = async (cards: Card[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    } catch (e) {
      console.error('Cannot save cards', e); 
    }
  };

  const addCard = (card: Card) => {
    setSavedCards((prev) => {
      const updated = [...prev, card];
      saveToStorage(updated);
      return updated;
    });
  };

  const clearCards = async () => {
    await AsyncStorage.removeItem(STORAGE_KEY);
    setSavedCards([]);
  };

  return (
    <CardContext.Provider value={{ savedCards, addCard, clearCards }}>
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext(): CardContextType {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
}
