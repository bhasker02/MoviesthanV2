import React, { useEffect, useState } from 'react'

const Login = ( {onLoginSuccess} ) => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin =() =>{
    //const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
    const systemUSername=import.meta.env.VITE_SYSTEM_USERNAME;
    const systemPassword=import.meta.env.VITE_SYSTEM_PASSWORD;

    if (username === systemUSername && password === systemPassword) {
        setError('');
     
        onLoginSuccess(); // Call the setter function from App.jsx
      } else {
        setError('Invalid username or password!');
      }

  }

  const handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
        e.preventDefault();
      handleLogin();
    }
  };

  return (
    <div>
    <div className="wrapper">
        <section className="login">
        <header>
          <img src="./hero.png" alt="hero banner"/>
        <h1><span className="text-gradient">Welcome!</span></h1>
        
        </header>
        {error && <h3 className="text-gradient">{error}</h3>}
            <div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}
                className="login-input bg-light-100/5  p-3 rounded-lg text-gray-200 placeholder-light-200" onKeyDown={handleKeyDown}/>
            </div>
            <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={handleKeyDown}
            className="login-input bg-light-100/5  p-3 rounded-lg text-gray-200 placeholder-light-200"/>
            </div>
            
            <button className="login-input bg-light-100/40  p-3 rounded-lg text-gray-200 placeholder-light-200" onClick={handleLogin}>
                Login
            </button>
        </section>
    </div>
    </div>
  )
}

export default Login