import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { AppProvider } from './AppContext';

import './styles/global.scss';

export function App() {

  return (
    <AppProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </AppProvider>
  )
}