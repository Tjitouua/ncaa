import LoginForm from "./components/LoginForm";





const Login = () => {
    return (
       <div className="w-full min-h-screen flex">
            <LoginForm />
            <div className="hidden lg:flex w-6/8 min-h-screen bg-[url('images/ncaa.jpg')] bg-[center_50%] bg-cover">
               <div className="w-full h-full bg-gray-600/40">

               </div>
            </div>

       </div>
    );
}

export default Login;