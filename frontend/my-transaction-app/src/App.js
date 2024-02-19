import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthDropdown from './components/MonthDropdown';
import SearchInput from './components/SearchInput'; // Assuming we'll create this
import TransactionsTable from './components/TransactionsTable';
import StatisticsCard from './components/StatisticsCard';
import BarChart from './components/BarChart';

function App() {
  const [month, setMonth] = useState('March');
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({});
  const [barChartData, setBarChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data concurrently for efficiency
        const [transactionsResponse, statsResponse, barChartResponse] = await Promise.all([
          axios.get('/products', { params: { month, searchTerm } }),
          axios.get('/statistics', { params: { month } }),
          axios.get('/bar-chart', { params: { month } }),
        ]);

        setTransactions(transactionsResponse.data);
        setStats(statsResponse.data);
        setBarChartData(barChartResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [month, searchTerm]);

  return (
    <div className="container"> 
      <MonthDropdown selected={month} onMonthChange={setMonth} />
      <SearchInput value={searchTerm} onSearchChange={setSearchTerm} /> 
      <TransactionsTable transactions={transactions} /> 
      <StatisticsCard stats={stats} />
      <BarChart data={barChartData} /> 
    </div>
  );
}

export default App;
