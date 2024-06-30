import './App.css';
import { Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import { useState } from 'react';
import Alert from './components/Alert';
import Loading from './components/Loading';

function App() {
	const [alert, setAlert] = useState({
        color:'',
        text:'',
        show:false,
    });

	const [loading, setLoading] = useState(false);

  return (
	  <main>
	  <div className='main-container' >
	  { loading ? <Loading /> : false}
	  { alert.show ? <Alert {...alert} /> : false }
		<Routes>
			<Route  
			path='/'
			element={<Registration setLoading={setLoading} setAlert={setAlert} />} 
			/>
		</Routes>
    </div>
	</main>
  );
}

export default App;
