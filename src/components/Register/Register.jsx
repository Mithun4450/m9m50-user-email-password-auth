import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { Link } from "react-router-dom";

const Register = () => {

    const handleRegister = e =>{
        e.preventDefault();
        
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // Create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result =>{
                
                console.log(result.user)
            })
            .catch(error =>{
                console.log(error)
            })
        
        
        
    }
    return (
        <div className="border">
         <div className="mx-auto  md:w-1/2">
                <h2 className="3xl">Register now</h2>
                <br />
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-3/4 py-2 px-4 border" type="email" name="email" placeholder="Email Address"/>
                    <br />
                    <input className="mb-4 w-3/4 py-2 px-4 border" type="password" placeholder="Password" name="password"/>
                    <input className="btn btn-secondary w-3/4" type="submit" value="Register" />
                    
                </form>
         </div> 
            
        </div>
    );
};

export default Register;