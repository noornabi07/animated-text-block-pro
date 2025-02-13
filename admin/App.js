import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Support from './Pages/Support';

import { useState } from 'react';



const App = ({ mainEl }) => {

  const [templates, setTemplates] = useState();
  const [theme, setTheme] = useState('theme9');

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<Dashboard mainEl={mainEl} {...{ templates, setTemplates, theme, setTheme }} />} />
        <Route path="/helps" element={<Support mainEl={mainEl} />} />

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