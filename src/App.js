import Home from './components/Home';
import NotFound from './components/NotFound';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PatientDetailsView from './components/PatientDetailsView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<NotFound />} />
        <Route
          path="/:hospitalNumber"
          element={<PatientDetailsView />}
          errorElement={<NotFound />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
