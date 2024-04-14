import { useContext } from 'react';
import { DataContext } from './DataProvider';

export default function useDataProvider() {
  return useContext(DataContext);
}
