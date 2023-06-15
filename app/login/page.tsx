'use client'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {validateLogin} from './loginApiCalls'

import { toast } from 'react-toastify';

//import { useRouter } from "next/navigation";


export type LoginData = {
  email: string;
  password: string;
};

function Login() {
  //const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  
  const onSubmit = handleSubmit((data:LoginData) => {
    console.log(data);
    validateLogin(data).then(()=>{
        //router.push('/dashboard');
        toast.success('Logged in successfully');
    })
    .catch(()=>{
        toast.error('Invalid credentials');
    })
    
  });

  return(
     
    <div className="container">
      <form onSubmit={onSubmit} className="form">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          className="input"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Email should be in proper format: abc@example.com",
            },
          })}
        />
        {errors.email && <div className="errorText">{errors.email.message}</div>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          className="input"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters long",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message:
                "Password should contain at least 1 number, lowercase and uppercase letter",
            },
          })}
        />
        {errors.password && <div className="errorText">{errors.password.message}</div>}

        <button type="submit" className="button">Login</button>
        <div>
        <span>
          Don't have an account?
          <Link href="/register">Register</Link>
        </span>
      </div>
      </form>
     
    </div>
  );
}


export default Login;