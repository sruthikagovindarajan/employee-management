import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [employee, setEmployee] = useState([])

  useEffect(() => {
    async function fetchEmployees() {
      const response = await fetch('http://localhost:8090/people').then(response => response.json()).then(data => {
        setEmployee(data._embedded.people)
      });
      const json = await response.json();
      setEmployee(json.data);
    }
    fetchEmployees();
  }, [])


  const submit = (event) => {
    event.preventDefault();
    const fname = document.getElementById('fname')
    const lname = document.getElementById('lname')
    fetch('http://localhost:8090/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: fname.value, lastName: lname.value })
    }).then(response => response.json()).then(data => console.log(data))
    fetch('http://localhost:8090/people').then(response => response.json()).then(data => {
      setEmployee(data._embedded.people)
      // console.log(data._embedded.people)
      console.log(employee);
    })
  }

  return (
    <div className="App">
      <h1>   Employee Management</h1>
      <header className="App-header">

        <br />
        <div className='col'>
          <div className='row'>
            <form onSubmit={(event) => { submit(event) }} id='user-form'>
              <div class="row">
                <div class="col">
                  <input type="text" id='fname' class="form-control" placeholder="First name" aria-label="First name" />
                </div>
                <div class="col">
                  <input type="text" id='lname' class="form-control" placeholder="Last name" aria-label="Last name" />
                </div>
                <div className='col'><button type="submit" class="btn btn-primary">Add User</button></div>
              </div>
            </form>
          </div>
          <br />
          <div className='row'>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                </tr>
              </thead>
              <tbody>
                {employee.map((data, index) =>
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{data.firstName}</td>
                    <td>{data.lastName}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </header>
    </div>

  );
}

export default App;


