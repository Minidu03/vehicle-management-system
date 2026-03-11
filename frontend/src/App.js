import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import { DarkModeProvider } from './contexts/DarkModeContext';
import Layout from './components/Layout'; 
import Dashboard from './pages/Dashboard'; 
import Customers from './pages/Customers'; 
import Vehicles from './pages/Vehicles'; 
import Bookings from './pages/Bookings'; 
import Mechanics from './pages/Mechanics'; 
import Inventory from './pages/Inventory'; 
import Invoices from './pages/Invoices'; 
import Reports from './pages/Reports'; 
import Settings from './pages/Settings'; 
const queryClient = new QueryClient(); 
function App() { 
  return ( 
    <QueryClientProvider client={queryClient}> 
      <DarkModeProvider>
        <Router> 
          <Layout> 
            <Routes> 
              <Route path="/" element={<Dashboard />} /> 
              <Route path="/customers" element={<Customers />} /> 
              <Route path="/vehicles" element={<Vehicles />} /> 
              <Route path="/bookings" element={<Bookings />} /> 
              <Route path="/mechanics" element={<Mechanics />} /> 
              <Route path="/inventory" element={<Inventory />} /> 
              <Route path="/invoices" element={<Invoices />} /> 
              <Route path="/reports" element={<Reports />} /> 
              <Route path="/settings" element={<Settings />} /> 
            </Routes> 
          </Layout> 
        </Router> 
      </DarkModeProvider>
    </QueryClientProvider> 
  ); 
} 
export default App; 
