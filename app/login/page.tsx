'use client'
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { validateLogin } from './LoginApiCalls';
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Email should be in proper format: abc@example.com",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
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
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Login</button>
      </form>
      <div>
        <span>
          Don't have an account?
          <Link href="/register">Register</Link>
        </span>
      </div>
    </>
  );
}


export default Login;