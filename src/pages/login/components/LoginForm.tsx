



const LoginForm = () => {
     return (
        <div className="w-full min-h-screen lg:w-2/8 flex flex-col gap-2 text-gray-700 px-14 justify-center">
            <div className="w-full flex justify-center"><div className="w-50 ml-15 h-28 mb-7 bg-[url('images/ncaa-logo.png')] bg-center bg-cover"></div></div>
            <label className="font-extrabold font-serif text-3xl">Sign In</label>
            <label className="mb-4 text-sm">Use your NCAA credentials to access the system.</label>
            {/* Username  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold">Username</label>
                <input className="w-full py-2 border rounded-lg px-3 border-gray-300 placeholder:text-sm outline-none " type="text" placeholder="e.g. hangula.e" />
            </div>
            {/* Password  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold">Password</label>
                <input className="w-full py-2 border rounded-lg px-3 border-gray-300 outline-none" type="password" placeholder="••••••••" />
            </div>
            {/* Sign in as  */}
            <div className="flex flex-col gap-1 mb-5">
                <label className="font-bold">Sign in as</label>
                <select className="w-full cursor-pointer text-sm text-gray-400 py-2 border rounded-lg px-3 pr-20 border-gray-300 outline-none">
                    <option>Employee</option>
                    <option>Training officer</option>
                    <option>Administrator</option>
                </select>
            </div>
            <button className="w-full py-2 cursor-pointer rounded-lg bg-blue-300 text-white font-bold hover:bg-blue-300/70">Sign In</button>
        </div>
     )
}

export default LoginForm;