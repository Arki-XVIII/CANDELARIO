import axios from "axios";
import { useEffect, useState } from "react";


function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("")
  const [course, setCourse] = useState("")
  const [age, setAge] = useState("")
  const [updateStudent, setUpdateStudent] = useState(null)
  
  useEffect(() => {
    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });


  }, []);

  // This is for the Add Feature
  const handleCreateStudent = (newStudent) => {
    setStudents([...students, newStudent]);
    axios.post("http://localhost:5000/students", newStudent)
    .then(response => console.log('Student Created:', response.data))
    .catch(error => console.error('error creating student:', error));
  };

  // This is for the Update Feature
  const handleUpdateStudent = (studentId) => {
    const updateStudent = {
      name,
      course,
      age,
    };
    axios.put(`http://localhost:5000/students/${studentId}`, updateStudent)
      .then(response => {
        console.log('Student updated:', response.data);
        setStudents(students.map(student => student.id === studentId ? response.data : student));
      })
      .catch(error => console.error('Error updating student:', error));
  };
  

  //This is for the Delete Feature
    const handleDeleteStudent = (studentId) => {
        setStudents(students.filter(student => student.id !== studentId));
        axios.delete(`http://localhost:5000/students/${studentId}`)
      .then(response => console.log('Note deleted:', response.data))
      .catch(error => console.error('Error deleting note:', error));
  };


  return (
      <div>
        <h1>Student Management Sytem</h1>
        <h2>Students</h2>

        <p>Enter your Name: </p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <br></br>

        <p>Enter your Course: </p>
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)}></input>


        <p> Enter your Age: </p>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}></input>

        <br></br>

        <button onClick={() => {
          const newStudent = {
            name: name,
            course: course,
            age: age,
          };
          handleCreateStudent(newStudent);
        }}> Add Student</button>

        <br></br>

        {students.map((student) => (
          <div key={student.id}> 
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
            <button onClick = {() => handleUpdateStudent(student.id)}>UpdateStudent</button>
            <button onClick = {() => handleDeleteStudent(student.id)}>Delete Student</button>
          </div>
        ))}

      </div>
  );

}

export default App


