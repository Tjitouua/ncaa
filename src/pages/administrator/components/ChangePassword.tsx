import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import PrimaryButt from "../../../ui/PrimaryButt";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { ImCross } from "react-icons/im";




interface HR {
  id: number;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}




const ChangePassword = () => {



    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [saving, setSaving] = useState(false);
    const [showAddHR, setShowAddHR] = useState(false);
    const [HR, setHR] = useState<HR[]>([]);
    const [loading, setLoading] = useState(true);


    const [hrFirstName, setHrFirstName] = useState("");
    const [hrLastName, setHrLastName] = useState("");
    const [hrEmail, setHrEmail] = useState("");
    const [addingHR, setAddingHR] = useState(false);





    useEffect(() => {
       fetch("http://localhost/ncaa/admin/get_admin.php", {
          credentials: "include"
       })
       .then((response) => response.json())
       .then((data) => {
           if (data.success) {
              setEmail(data.admin.email);
           } else {
              alert(data.message);
           }
       })
       .catch ((error) => {
           console.error("Error fetching admin details: ", error);
       });
    }, []);








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











      const handleAddHR = async () => {
         if (!hrFirstName || !hrLastName || !hrEmail) {
            alert("Please fill in all fields");
            return;
         }

         setAddingHR(true);

         try {
            const response = await fetch(
                "http://localhost/ncaa/staff/addHR.php",
                {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     first_name: hrFirstName.trim(),
                     last_name: hrLastName.trim(),
                     email: hrEmail.trim()
                  }),
                }
            );


            const data = await response.json();

            if (data.success) {
               alert("HR member added successfully");

               window.location.reload();

               setHrFirstName("");
               setHrLastName("");
               setHrEmail("");
               setShowAddHR(false);
            } else {
               alert(data.message || "Failed to add member");


            }
         } catch (error) {
           console.error(error);
           alert("Server error.");
         } finally {
           setAddingHR(false);
         }
      };






      // Get HR Members 
      useEffect(() => {
         fetch("http://localhost/ncaa/staff/get_hr.php")
         .then((response) => response.json())
         .then((data) => {
            if (data.success) {
               setHR(data.data);
            }
         })
         .catch((error) => {
            console.error("Error fetching HR members: ", error);
         })
         .finally(() => {
            setLoading(false);
         });
      }, []);







      // Delete HR Member 
      const handleDelete = (id: number) => {
         if (!window.confirm("Are you sure you want to delete this HR Member?")) return;

         fetch("http://localhost/ncaa/staff/delete_hr.php", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ id }),
         })
         .then((res) => res.json())
         .then((data) => {
             if (data.success) {
                setHR((prev) => prev.filter((emp) => emp.id !== id));
             } else {
                alert(data.message || "Failed to delete");
             }
         })
         .catch((err) => {
            console.error("Delete error ", err);
         })
      }











     return (
      <div className="min-h-screen w-full flex flex-col">









      <div className="min-h-screen flex justify-between items-start py-5 gap-5 w-full">


        {/* Changing Admin details  */}
        <div className="flex flex-col bg-red-400 text-gray-600">
          <div className="flex flex-col gap-2 bg-white min-w-90 text-gray-700 3xl:px-30 justify-center shadow-md shadow-black/20">
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





        {/* HR Members  */}
        <div className="w-full md:w-[70%] py-12 flex flex-col min-h-[40vh] bg-white px-9 pb-14 shadow-sm shadow-secondary/30">
          <div className="w-full flex items-center justify-between">
             <div className="flex flex-col">
                <label className="font-bold text-lg">HR Team</label>
                <label className="text-xs text-secondary/60">HR members have full administration access, except managing other HR members.</label>
             </div>
             <PrimaryButt onClick={() => setShowAddHR(true)}><IoMdAdd />Add HR Member</PrimaryButt>
          </div>

          {/* Employees Table  */}
          <table className="w-full mt-7 border text-xs border-secondary/30">
                       <thead>
                          <tr className="bg-secondary/10 border-b border-secondary/20">
                             <th className="text-left p-3">First Name</th>
                             <th className="text-left p-3">Last Name</th>
                             <th className="text-left p-3">Email</th>
                             <th className="text-left p-3">Role</th>
                             <th className="text-center p-3">Actions</th>
                          </tr>
                       </thead>
                       <tbody>
                         {loading ? (
                             <tr>
                                <td colSpan={5} className="text-center py-15 text-secondary/60">
                                  <label>Loading HR Members...</label>
                                </td>
                             </tr>
                         ) : HR.length === 0 ? (
                             <tr>
                                <td colSpan={5} className="text-center py-8 text-secondary/60">
                                  <label>No HR members available.</label>
                                </td>
                             </tr>
                         ) : (
                         HR.map((hr, index) => (
                          <tr key={index} className="border-t border-secondary/20 bg-white/60">
                             <td className="px-3 py-3">{hr.first_name}</td>
                             <td className="px-3 py-3">{hr.last_name}</td>
                             <td className="px-3 py-3">{hr.email}</td>
                             <td className="px-3 py-3">HR Member</td>
                             <td className="px-3 py-3 "><div className="flex items-center justify-center"><RiDeleteBin6Line onClick={() => handleDelete(hr.id)} className="cursor-pointer hover:text-red-600" /></div></td>
                          </tr>
                          ))
                         )}
                       </tbody>
                    </table>

       </div>



       </div>










       {/* Adding HR Members */}
       {showAddHR && (
       <div onClick={() => setShowAddHR(false)} className="w-full min-h-screen bg-black/50 -mt-7 overflow-y-auto py-7 left-15 backdrop-blur-lg flex flex-col items-center fixed">
            <div className="w-[89%] flex justify-end">
                <ImCross onClick={() => setShowAddHR(false)} className="text-white cursor-pointer hover:text-secondaryy" />
            </div>
            {/* Form  */}
            {/* Changing Admin details  */}
        <div onClick={(e) => e.stopPropagation()} className="flex flex-col text-gray-600">
          <div className="flex flex-col gap-2 bg-white min-w-90 text-gray-700 3xl:px-30 justify-center shadow-md shadow-black/20">
            <div className="w-full py-3 bg-primaryy flex pt-6 px-5 xl:px-7 justify-start"><div className="w-50 h-28 mb-5 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div></div>
            {/* Form  */}
            <div className="flex flex-col gap-1 text-secondary/70 px-5 xl:px-8 justify-center pb-10 py-5">
            <label className="font-extrabold font-serif text-xl">New HR Account</label>
            <label className="mb-4 text-xs text-gray-400">Add a new HR member.</label>

            {/* First Name  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">First Name</label>
                <input value={hrFirstName} onChange={(e) => setHrFirstName(e.target.value)} className="w-full py-2 border rounded-sm px-3 border-black/20 text-sm outline-none " type="text" placeholder="John" />
                <label className="text-xs text-red-600 hidden">Please enter email</label>
            </div>

            {/* Last Name  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">Last Name</label>
                <input value={hrLastName} onChange={(e) => setHrLastName(e.target.value)} className="w-full py-2 border rounded-sm px-3 border-black/20 text-sm outline-none " type="text" placeholder="Doe" />
                <label className="text-xs text-red-600 hidden">Please enter last name</label>
            </div>

            {/* Username  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">Email</label>
                <input value={hrEmail} onChange={(e) => setHrEmail(e.target.value)} className="w-full py-2 border rounded-sm px-3 border-black/20 text-sm outline-none " type="text" placeholder="doeJ@ncaa.na" />
                <label className="text-xs text-red-600 hidden">Please enter email</label>
            </div>

            <button 
                onClick={handleAddHR}
                disabled={addingHR}
                className="w-full mt-5 text-sm py-2 cursor-pointer flex items-center justify-center rounded-lg bg-primary text-white font-bold hover:bg-primary/70"
            >
                {addingHR ? "Adding..." : "Add"}
            </button>
            

            <div className="w-full flex items-center justify-center text-xs mt-5">
              <label>Complete the form to add a new HR member.</label>
            </div>
            </div>
          </div>
        </div>
       </div>
       )}












       </div>
     )
}

export default ChangePassword;
