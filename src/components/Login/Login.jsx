import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef(null);

    const handleLogIn = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        setRegisterError('');
        setSuccess('');

        signInWithEmailAndPassword(auth, email, password)
            .then(result =>{
                console.log(result.user)
                if(result.user.emailVerified){
                    setSuccess('User logged in successfully')
                }
                else{
                    alert('Please verify your email')
                }
            })
            .catch(error =>{
                console.log(error)
                setRegisterError(error.message)
            })
    }

    const handlePasswordForget = e =>{
        e.preventDefault();

        const email = emailRef.current.value; 
        if(!email){
            console.log('Please provide email', emailRef.current.value )
            return;
        }
        else if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)){
            console.log('please provide valid email')
            return;

        }

        sendPasswordResetEmail(auth, email)
            .then(() =>{
                alert('Please check your email')
            })
            .catch(error =>{
                console.log(error)
            })
        
    }

  

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogIn}>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Email</span>
                                </label>
                                <input 
                                 type="text"
                                 ref={emailRef}
                                 placeholder="email"
                                 name="email"
                                 className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                <span className="label-text">Password</span>
                                </label>
                                <input type="text" placeholder="password" name="password" className="input input-bordered" />
                                <label className="label">
                                <a onClick={handlePasswordForget} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                                
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            {
                                registerError && <p className="text-red-600">{registerError}</p>
                            }
                            {
                                success && <p className="text-green-600">{success}</p>
                            }
                            <p>New to this website? Please <Link to="/heroRegister">Register</Link></p>
                            
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;