// "use server";


// import { redirect } from "next/navigation";
// import {hash} from "bcryptjs";
// import User from "@/models/User";
// import { CredentialsSignin } from "next-auth";
// import { signIn } from "@/auth";
// import dbConnect from '@/lib/dbConnect';

// const login = async (formData: FormData) => {
//     const email = formData.get("email") as string;
//     const password = formData.get("password") as string;
  
//     try {
//       await signIn("credentials", {
//         redirect: false,
//         callbackUrl: "/",
//         email,
//         password,
//       });
//     } catch (error) {
//       const someError = error as CredentialsSignin;
//       return someError.cause;
//     }
//     redirect("/dashboard");
//   };
// const doSocialLogin=async(formData:FormData)=>{
//   const action =formData.get('action');
// }
// const doLogout = async ()=>{

// }
// const register = async (formData: FormData) => {


//     const firstName = formData.get('firstname') as string;
//     const lastName = formData.get('lastname') as string;
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;
//     const confirmPassword = formData.get('confirmpassword') as string;
//     await dbConnect();
//     //searching for existing user
//     const existingUser = await User.findOne({email})
//     if(existingUser) throw new Error("User already Exists");

//     const hashedPassword = await hash(password, 12)
//     await User.create({firstname: firstName, lastname: lastName, email, password: hashedPassword})
//     console.log("user created successfully");
//     redirect('/login');
// };
// export {register, login};