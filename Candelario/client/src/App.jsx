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

    setName("");
    setCourse("");
    setAge("");
  };

  // This is to show the student details in the field
  const handleUpdateStudent = (student) => {

    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
    setUpdateStudent(student._id);
  };

  const handleSaveUpdate = () => {
    axios
    .put("http://localhost:5000/students/" + updateStudent, {
      name: name,
      course: course,
      age: age,
    })
    .then(() => {
      axios
      .get("http://localhost:5000/students")
      .then((response) => {
        setStudents(response.data);
      });

    setName("");
    setCourse("");
    setAge("");

    });

    setUpdateStudent(null);
  };

  //This is for the Delete Feature
    function handleDeleteStudent (id) {
    axios
    .delete("http://localhost:5000/students/" + id)
    .then(() => {
    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });

    });
  };


  return (
      <div>
        <h1>Student Management System</h1>
        <h2>Students</h2>

        <p>Enter your Name: </p>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}></input>
        <br></br>

        <p>Enter your Course: </p>
        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)}></input>


        <p> Enter your Age: </p>
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)}></input>

        <br></br>

        {updateStudent === null &&
          <button onClick={() => {
          const newStudent = {
            name: name,
            course: course,
            age: age,
          };
          handleCreateStudent(newStudent);
        }}> Add Student</button>
            
        }

        {updateStudent !== null &&  <button onClick={handleSaveUpdate}>Save Update</button>}


        {students.map((student) => (
          <div key={student._id}> 
            <p>Name: {student.name}</p>
            <p>Course: {student.course}</p>
            <p>Age: {student.age}</p>
            <button onClick = {() => handleUpdateStudent(student)}>UpdateStudent</button>
            <button onClick = {() => handleDeleteStudent(student._id)}>Delete Student</button>
          </div>
        ))}

      </div>
  );

}

export default App


