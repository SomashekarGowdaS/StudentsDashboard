import React,{ useState } from 'react'
import { v4 } from 'uuid'
import { Link, Route } from 'react-router-dom'
import _ from 'lodash'
import FileUpload from './FileUpload'
import StudentsList from './StudentsList'
import StudentDetails from './StudentDetails'

function App() {
  const [values, setValues] = useState([]);
  const [login, setLogin] = useState(false);
  let reader;

  const handleLogin = () => {
    setLogin(true);
  }

  const handleFileRead = (e) => {
    const data = reader.result.split('\n');
    const ListOfData = [];

    for(let i = 0; i <= data.length-1; i++) {
      if(data[i].length !== 0) {
        const eachStudent = {};
        eachStudent.id = v4();
        eachStudent.time = data[i].slice(0, 8);
        if(data[i].includes('privately')) {
          eachStudent.private = true;
          const limit = data[i].slice(15).indexOf(':');
          const arr = data[i].slice(15, 15 + limit).split(' ');
          const name = arr.slice(0, arr.indexOf('To'));
          eachStudent.name = name.join(' ').trim();
          const message = data[i].slice(15 + limit + 1);
          eachStudent.message = message.trim();
        } else {
          eachStudent.private = false;
          const limit = data[i].slice(15).indexOf(':');
          const name = data[i].slice(15, 15 + limit);
          eachStudent.name = name.trim();
          const message = data[i].slice(15 + limit + 1);
          eachStudent.message = message.trim();
        }
        ListOfData.push(eachStudent);
      }
    }
    setValues(ListOfData);

  }

  const onFileUpload = (file) => {
    reader = new FileReader();
    reader.onloadend = handleFileRead;
    reader.readAsText(file);
  }

  return (
    <div className="container" >
      
      <FileUpload onFileUpload={onFileUpload} login={login} handleLogin={handleLogin} />


      <Route path='/' render={(props) => <StudentsList values={values} {...props} />} exact={true} />
      <Route path='/:id' render={(props) => <StudentDetails values={values} {...props} />} />
    </div>
  );
}

export default App;

