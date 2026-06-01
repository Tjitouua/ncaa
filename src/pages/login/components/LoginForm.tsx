import { useState } from "react";
import { useNavigate } from "react-router-dom";




const LoginForm = () => {


    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
       if (!username || !password) {
         alert("Please fill in all fields");
         return;
       }

       try {
         const response = await fetch("http://localhost/ncaa/login.php", {
             method: "POST",
             headers: {
                "Content-Type": "application/json",
             },
             body: JSON.stringify({
               username,
               password,
             }),
         });

         const data = await response.json();

         if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));

            if (data.user.role === "admin") {
              navigate("/admin/dashboard");
            } else if (data.user.role === "staff") {
              navigate("/staff/dashboard");
            } else {
              alert("Uknown user role")
            }

            // navigate("/admin/dashboard");
         } else {
           alert(data.message);
         }
       } catch (error) {
           console.log(error);
           alert("Server error");
       }

      };



     return (
        <div className=" min-h-screen flex flex-col gap-2 text-gray-600 px-5 xl:px-5 3xl:px-30 justify-center py-5">
          <div className="flex flex-col gap-2 min-w-90 bg-white text-gray-700 3xl:px-30 justify-center shadow-md shadow-black/30">
            <div className="w-full py-3 bg-primaryy flex pt-6 px-5 xl:px-7 justify-start"><div className="w-50 h-28 mb-5 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div></div>
            {/* Form  */}
            <div className="flex flex-col gap-1 text-gray-600 px-5 xl:px-8 justify-center pb-10 py-5">
            <label className="font-extrabold font-serif text-2xl">Sign In</label>
            <label className="mb-4 text-xs text-gray-400">Use your NCAA credentials to access the system.</label>

            {/* Username  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-sm">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full py-2 border rounded-lg px-3 border-black/50 placeholder:text-sm outline-none " type="text" placeholder="e.g. hangula.e" />
                <label className="text-xs text-red-600 hidden">Please enter username</label>
            </div>

            {/* Password  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-sm">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 border rounded-lg px-3 border-black/50 outline-none" type="password" placeholder="••••••••" />
                <label className="text-xs text-red-600 hidden">Please enter password</label>
            </div>

            {/* Sign in as  */}
            {/* <div className="flex flex-col gap-1 mb-5">
                <label className="font-bold text-sm">Sign in as</label>
                <select className="w-full cursor-pointer text-sm text-gray-500 border-black/50 py-2 border rounded-lg px-3 pr-20 outline-none">
                    <option>Employee</option>
                    <option>Training officer</option>
                    <option>Administrator</option>
                </select>
            </div> */}

            <button 
              onClick={login}
            className="w-full mt-5 py-2 cursor-pointer rounded-lg bg-primary text-white font-bold hover:bg-primary/70">Sign In</button>

            <div className="w-full flex items-center justify-center text-xs mt-5">
              <label>Forgot Password? <span className="font-bold cursor-pointer hover:underline">Click here</span></label>
            </div>
            </div>
          </div>
        </div>
     )
}

export default LoginForm;