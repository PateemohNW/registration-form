import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    Requirements: '',
  });

  //const [isFormComplete, setIsFormComplete] = useState(false);//
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    /*const { firstName, lastName, email, password, Requirements } = formData;
    setIsFormComplete(firstName !== '' && lastName !== '' && email !== '' && password !== '' && Requirements !== '');*/
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // ตรวจสอบความยาวของชื่อและนามสกุล
    if (formData.firstName.length < 2 || formData.lastName.length < 2) {
      alert('ชื่อและนามสกุลควรมีความยาวอย่างน้อย 2 ตัวอักษร');
      return;
    }

    // ตรวจสอบความยาวของรหัสผ่าน
    if (formData.password.length < 6) {
      alert('รหัสผ่านควรมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }
    console.log(formData)
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('ลงทะเบียนผู้ใช้เรียบร้อยแล้ว');
      } else {
        alert('ไม่สามารถลงทะเบียนผู้ใช้ได้');
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
    }
  };

  return (
    <div className="form-register">
      <form onSubmit={handleSubmit}>
        <div className="register">
          <h2>Register</h2>
          <div className="form-holder">
            <div className="input-box">
              <input type="text" className="input" placeholder="Name" onChange={handleInputChange} name="firstName" />
            </div>

            <div className="input-box">
              <input type="text" className="input" placeholder="Lastname" onChange={handleInputChange} name="lastName" />
            </div>

            <div className="input-box">
              <input type="email" className="input" placeholder="Email" onChange={handleInputChange} name="email" />
            </div>

            <div className="input-box">
              <input type="password" className="input" placeholder="Password" onChange={handleInputChange} name="password" />
            </div>

            <div className="input-box">
              <input type="text" className="input" placeholder="Requirements:" onChange={handleInputChange} name="Requirements" />
            </div>

          </div>
          <div className="button-container">
            <button type="submit">ลงทะเบียน</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App
