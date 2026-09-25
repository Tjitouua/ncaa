import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";




const ChangePassword = () => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [saving, setSaving] = useState(false);








      const saveChanges = async () => {

        if (!email || !password || !confirmPassword) {
            alert("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setSaving(true);

        try {

            const response = await fetch(
                "http://localhost/ncaa/admin/update_admin.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                alert("Account details updated successfully");
                setConfirmPassword("");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
            alert("Server error");
        } finally {
            setSaving(false);
        }
         

      };














     return (
        <div className=" min-h-screen flex flex-col gap-2 text-gray-600 px-5 xl:px-5 3xl:px-30 justify-center py-5">
          <div className="flex flex-col gap-2 min-w-90 bg-white text-gray-700 3xl:px-30 justify-center shadow-md shadow-black/20">
            <div className="w-full py-3 bg-primaryy flex pt-6 px-5 xl:px-7 justify-start"><div className="w-50 h-28 mb-5 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div></div>
            {/* Form  */}
            <div className="flex flex-col gap-1 text-secondary/70 px-5 xl:px-8 justify-center pb-10 py-5">
            <label className="font-extrabold font-serif text-xl">Account Settings</label>
            <label className="mb-4 text-xs text-gray-400">Update your administrator account details.</label>

            {/* Username  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 border rounded-sm px-3 border-black/20 text-sm outline-none " type="text" placeholder="doeJ@ncaa.na" />
                <label className="text-xs text-red-600 hidden">Please enter email</label>
            </div>

            {/* Password  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">Password</label>
                  <div className="w-ful flex items-center justify-between gap-1 border border-black/20 px-3 rounded-sm">
                     <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full py-2 text-sm outline-none" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                     <FaRegEye onClick={() => setShowPassword(!showPassword)} className="text-secondary/50 cursor-pointer" />
                  </div>
                <label className="text-xs text-red-600 hidden">Please enter password</label>
            </div>

            {/* Confirm Password  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">Confirm Password</label>
                  <div className="w-ful flex items-center justify-between gap-1 border border-black/20 px-3 rounded-sm">
                     <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full py-2 text-sm outline-none" type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" />
                     <FaRegEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-secondary/50 cursor-pointer" />
                  </div>
                <label className="text-xs text-red-600 hidden">Please enter password</label>
            </div>

            <button 
              disabled={saving}
              onClick={saveChanges}
              className="w-full mt-5 text-sm py-2 cursor-pointer flex items-center justify-center rounded-lg bg-primary text-white font-bold hover:bg-primary/70">
                {saving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>Save changes</>
                )}
            </button>
            

            <div className="w-full flex items-center justify-center text-xs mt-5">
              <label>Your changes will take effect immediately.</label>
            </div>
            </div>
          </div>
        </div>
     )
}

export default ChangePassword;
