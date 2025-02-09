import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Support from './Pages/Support';



const App = ({ mainEl }) => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard mainEl={mainEl} />} />
        <Route path="/support" element={<Support mainEl={mainEl} />} />

        {/* When no routes match, it will redirect to this route path. Note that it should be registered above. */}
        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Routes>
    </>
  )
}

export default App;