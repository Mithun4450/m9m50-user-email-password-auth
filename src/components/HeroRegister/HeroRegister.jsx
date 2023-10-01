import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { Link } from "react-router-dom";


const HeroRegister = () => {

    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleHeroRegister = e =>{
    
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(name, email, password, accepted);
        setRegisterError('');
        setSuccess('');

        if(password.length < 6){
            setRegisterError('Password must be of 6 digit or longer');
            return
        }
        else if(!/[A-Z]/.test(password)){
            setRegisterError('Your password must have at least one uppercase');
            return;
        }
        else if(!accepted){
            setRegisterError('Please accept our terms and conditions');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
           

            .then(result =>{
                console.log(result.user)
                setSuccess('User created successfully')

               updateProfile(result.user, {
                displayName: name, 
                photoURL: "https://example.com/jane-q-user/profile.jpg"
               })
                    .then(() => console.log('Profile updated'))
                    .catch(error =>
                        console.log(error))



            sendEmailVerification(result.user)
                    .then(() =>{
                        alert("Check your email and verify the email")
                    })
            })
            .catch(error =>{
                console.log(error)
                setRegisterError(error.message)
            })
    }
  




    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
            
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                       <form onSubmit={handleHeroRegister}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="name" name="name" placeholder="name" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                               <div className="relative border">
                                    <input 
                                            type={showPassword? "text" : "password"} 
                                            name="password" 
                                            placeholder="password" 
                                            className="input input-bordered w-full" 
                                            required 
                                    />
                                    <span className="absolute top-4 right-4" onClick={() =>setShowPassword(!showPassword)}>
                                                {
                                                    showPassword? <BsEyeSlash></BsEyeSlash> : <BsEye></BsEye>
                                                }
                                    </span>
                               </div>
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div>
                                <input className="mr-2" type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms">Accept our terms & conditions</label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                            {
                                registerError && <p className="text-red-600">{registerError}</p>
                            }
                            {
                                success && <p className="text-green-600">{success}</p>
                            }
                            <p>Already have an account? Please <Link to="/login">Login</Link> </p>
                            
                       </form>
                    </div>
                    </div>
                </div>
                </div>
            
        </div>
    );
};

export default HeroRegister;