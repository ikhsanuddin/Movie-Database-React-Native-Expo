import { Provider as PaperProvider } from 'react-native-paper';
import { SearchNavigation } from './navigation/SearchNavigation';

const AppRoot = () => {
  return (
    <PaperProvider>
      <SearchNavigation />
    </PaperProvider>
  );
};

export default AppRoot;
