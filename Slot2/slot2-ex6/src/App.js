import logo from './logo.svg';
import './App.css';


function App() {
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9},
    {name: 'John', age: 40},
    {name: 'Ann', age: 19},
    {name: 'Elisabeth', age: 16}
  ];

  // Find the first teenager
  const firstTeenager = people.find(p => p.age >= 10 && p.age <= 20);

  // Find all teenagers
  const allTeenagers = people.filter(p => p.age >= 10 && p.age <= 20);

  // Check if every person is a teenager
  const isEveryTeenager = people.every(p => p.age >= 10 && p.age <= 20);

  // Check if any person is a teenager
  const isAnyTeenager = people.some(p => p.age >= 10 && p.age <= 20);

  return (
    <div className="App" style={{ padding: "40px" }}>
      <h2>Teenager Queries</h2>
      <div>
        <strong>First teenager:</strong> {firstTeenager ? `${firstTeenager.name} (${firstTeenager.age})` : 'None'}
      </div>
      <div>
        <strong>All teenagers:</strong> {allTeenagers.length > 0 ? allTeenagers.map(p => `${p.name} (${p.age})`).join(', ') : 'None'}
      </div>
      <div>
        <strong>Is every person a teenager?</strong> {isEveryTeenager ? 'True' : 'False'}
      </div>
      <div>
        <strong>Is any person a teenager?</strong> {isAnyTeenager ? 'True' : 'False'}
      </div>
    </div>
  );
}

export default App;
