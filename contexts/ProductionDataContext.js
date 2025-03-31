import React, { createContext, useState, useEffect } from 'react';
import { dummyData as initialDummyData } from '@/constants/DummyData';

export const ProductionDataContext = createContext();

export const ProductionDataProvider = ({ children }) => {
  const [data, setdata] = useState(initialDummyData);
  const [dataPin, setdataPin] = useState(initialDummyData.filter((item) => item.isPin === true));

  useEffect(() => {
    setdataPin(data.filter((item) => item.isPin === true));
  }, [data]);

  const updatePin = (idItem) => {
    const newData = data.map((item) => {
      if (item.id === idItem) {
        return { ...item, isPin: !item.isPin };
      }
      return item;
    });
    setdata(newData);
  };

  const unpinAll = () => {
    const newData = data.map((item) => ({ ...item, isPin: false }));
    setdata(newData);
  };

  return (
    <ProductionDataContext.Provider value={{ data, updatePin, unpinAll }}>
      {children}
    </ProductionDataContext.Provider>
  );
};