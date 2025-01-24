
// import React, { useState, useEffect } from 'react';
// import { db } from "../firebase/firebase";  // Corrected import path
// import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
// import './StudentsPage.css';  // Import the CSS file for styling

// const StudentsPage = () => {
//   const [students, setStudents] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [studentInfo, setStudentInfo] = useState({
//     name: '',
//     class: '',
//     section: '',
//     rollNumber: '',
//     age: '',
//     address: '',
//     phone: '',
//     email: '',
//     parentName: '',
//     parentPhone: '',
//     guardianName: '',
//     guardianPhone: ''
//   });
//   const [editingStudent, setEditingStudent] = useState(null);

//   // Fetch students from Firestore
//   useEffect(() => {
//     const fetchStudents = async () => {
//       const querySnapshot = await getDocs(collection(db, 'students'));
//       const studentsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//       setStudents(studentsData);
//     };
//     fetchStudents();
//   }, []);

//   // Handle adding or updating student
//   const handleAddStudent = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingStudent) {
//         // If editing, update the student data
//         const studentRef = doc(db, 'students', editingStudent.id);
//         await updateDoc(studentRef, studentInfo);
//       } else {
//         // If adding, add a new student
//         await addDoc(collection(db, 'students'), studentInfo);
//       }
//       setModalOpen(false);
//       resetForm();
//     } catch (err) {
//       console.error('Error adding/updating student: ', err);
//     }
//   };

//   // Handle deleting a student
//   const handleDeleteStudent = async (id) => {
//     try {
//       const studentRef = doc(db, 'students', id);
//       await deleteDoc(studentRef);
//       setStudents(students.filter(student => student.id !== id)); // Update the local state
//     } catch (err) {
//       console.error('Error deleting student: ', err);
//     }
//   };

//   // Handle editing a student
//   const handleEditStudent = (student) => {
//     setEditingStudent(student);
//     setStudentInfo(student);
//     setModalOpen(true);
//   };

//   // Reset the student form
//   const resetForm = () => {
//     setStudentInfo({
//       name: '',
//       class: '',
//       section: '',
//       rollNumber: '',
//       age: '',
//       address: '',
//       phone: '',
//       email: '',
//       parentName: '',
//       parentPhone: '',
//       guardianName: '',
//       guardianPhone: ''
//     });
//     setEditingStudent(null);
//   };

//   return (
//     <div className="students-container">
//       <h2>Students List</h2>
//       <button className="add-student-btn" onClick={() => setModalOpen(true)}>Add Student</button>
      
//       {modalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>{editingStudent ? 'Edit Student' : 'Add Student'}</h3>
//             <form onSubmit={handleAddStudent}>
//               <input 
//                 type="text" 
//                 placeholder="Name" 
//                 value={studentInfo.name} 
//                 onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
//                 required 
//               />
//               <input 
//                 type="text" 
//                 placeholder="Class" 
//                 value={studentInfo.class} 
//                 onChange={(e) => setStudentInfo({ ...studentInfo, class: e.target.value })}
//                 required 
//               />
//               <input 
//                 type="text" 
//                 placeholder="Section" 
//                 value={studentInfo.section} 
//                 onChange={(e) => setStudentInfo({ ...studentInfo, section: e.target.value })}
//                 required 
//               />
//               <input 
//                 type="text" 
//                 placeholder="Roll Number" 
//                 value={studentInfo.rollNumber} 
//                 onChange={(e) => setStudentInfo({ ...studentInfo, rollNumber: e.target.value })}
//                 required 
//               />
//               {/* Add other fields as needed */}
//               <button type="submit">{editingStudent ? 'Update' : 'Submit'}</button>
//             </form>
//             <button className="close-modal" onClick={() => setModalOpen(false)}>Close</button>
//           </div>
//         </div>
//       )}

//       <table className="students-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Roll Number</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map(student => (
//             <tr key={student.id}>
//               <td>{student.id}</td>
//               <td>{student.name}</td>
//               <td>{student.class}</td>
//               <td>{student.section}</td>
//               <td>{student.rollNumber}</td>
//               <td>
//                 <button onClick={() => handleEditStudent(student)}>Edit</button>
//                 <button onClick={() => handleDeleteStudent(student.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default StudentsPage;
import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase'; // Ensure Firebase is configured and exported here
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import './StudentsPage.css';

const StudentsPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    address: '',
    email: '',
    phone: '',
    dob: '',
    guardian: '',
    guardianPhone: '',
    admissionDate: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing a student

  // Fetch students from Firestore on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const studentsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsList);
    };
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudentData({ ...studentData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing student
        await updateDoc(doc(db, 'students', studentData.id), studentData);
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.id === studentData.id ? { ...student, ...studentData } : student
          )
        );
        alert('Student updated successfully!');
      } else {
        // Add new student
        const docRef = await addDoc(collection(db, 'students'), studentData);
        setStudents([...students, { id: docRef.id, ...studentData }]);
        alert('Student added successfully!');
      }
      setModalOpen(false);
      setIsEditing(false); // Reset editing state after submit
      setStudentData({
        name: '',
        class: '',
        section: '',
        rollNumber: '',
        address: '',
        email: '',
        phone: '',
        dob: '',
        guardian: '',
        guardianPhone: '',
        admissionDate: '',
        status: '',
      });
    } catch (error) {
      console.error('Error submitting student:', error);
    }
  };

  // Delete student from Firestore and update the UI state
  const handleDelete = async (id) => {
    console.log('Deleting student with id:', id);
    try {
      // Delete the document from Firestore
      await deleteDoc(doc(db, 'students', id));

      // Remove the deleted student from the UI (update state)
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));

      alert('Student deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  // Open the modal and load data for editing
  const handleEdit = (student) => {
    setStudentData(student);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Open the modal for adding a new student
  const handleAdd = () => {
    setStudentData({
      name: '',
      class: '',
      section: '',
      rollNumber: '',
      address: '',
      email: '',
      phone: '',
      dob: '',
      guardian: '',
      guardianPhone: '',
      admissionDate: '',
      status: '',
    });
    setIsEditing(false);
    setModalOpen(true);
  };

  return (
    <div className="students-page">
      <h1>Student List</h1>
      <button className="add-student-btn" onClick={handleAdd}>
        Add Student
      </button>
      <table className="students-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <button onClick={() => alert(`Viewing: ${JSON.stringify(student, null, 2)}`)}>
                  View
                </button>
                <button onClick={() => handleEdit(student)}>Edit</button>
                <button onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding/editing student */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-header">
            <h3>{isEditing ? 'Edit Student' : 'Add Student'}</h3>
            <button className="close-btn" onClick={() => setModalOpen(false)}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={studentData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="class"
              placeholder="Class"
              value={studentData.class}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="section"
              placeholder="Section"
              value={studentData.section}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              id="rollNumber"
              placeholder="Roll Number"
              value={studentData.rollNumber}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="address"
              placeholder="Address"
              value={studentData.address}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={studentData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              value={studentData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              id="dob"
              value={studentData.dob}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="guardian"
              placeholder="Guardian Name"
              value={studentData.guardian}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="guardianPhone"
              placeholder="Guardian Phone"
              value={studentData.guardianPhone}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              id="admissionDate"
              placeholder="Admission Date"
              value={studentData.admissionDate}
              onChange={handleInputChange}
              required
            />
            <select
              id="status"
              value={studentData.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button type="submit" className="submit-btn">
              {isEditing ? 'Update Student' : 'Submit'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;
