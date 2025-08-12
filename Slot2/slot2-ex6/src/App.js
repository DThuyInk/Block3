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

  const numbers = [1, 2, 3, 4];

  // Find the first teenager
  const firstTeenager = people.find(p => p.age >= 10 && p.age <= 20);

  // Find all teenagers
  const allTeenagers = people.filter(p => p.age >= 10 && p.age <= 20);

  // Check if every person is a teenager
  const isEveryTeenager = people.every(p => p.age >= 10 && p.age <= 20);

  // Check if any person is a teenager
  const isAnyTeenager = people.some(p => p.age >= 10 && p.age <= 20);

  // Reduce function to calculate the sum of numbers
  const sumOfNumbers = numbers.reduce((acc, curr) => acc + curr, 0);

  // Reduce function to calculate the product of numbers
  const productOfNumbers = numbers.reduce((acc, curr) => acc * curr, 1);
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
      <h2>Number Queries</h2>
      <div>
        <strong>Sum of numbers:</strong> {sumOfNumbers}
      </div>
      <div>
        <strong>Product of numbers:</strong> {productOfNumbers}
      </div>
    </div>
  );
}

export default App;
