import { useState } from "react";
import { useNavigate } from "react-router-dom";




const ForgotForm = () => {


    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);


    
    const handleSubmit = async () => {
        if (!email) {
            alert("Please enter your email");
            return;
        }

        setSending(true);

        try {
            const response = await fetch(
                "http://localhost/ncaa/login/send_reset.php",
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify({
                        email
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
               alert("Password reset email sent. Please check your email to reset your password.");
               navigate("/login");
            } else {
                alert(data.message);
                setSending(false);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to connect to server");
        } finally {
            setSending(false);
        }


    };






     return (
        <div className=" min-h-screen flex flex-col gap-2 text-gray-600 px-5 xl:px-5 3xl:px-30 justify-center py-5">
          <div className="flex flex-col gap-2 min-w-90 bg-white text-gray-700 3xl:px-30 justify-center shadow-md shadow-black/20">
            <div className="w-full py-3 bg-primaryy flex pt-6 px-5 xl:px-7 justify-start"><div className="w-50 h-28 mb-5 bg-[url('/images/ncaa-logo.png')] bg-center bg-cover"></div></div>
            {/* Form  */}
            <div className="flex flex-col gap-1 text-secondary/70 px-5 xl:px-8 justify-center pb-10 py-8">
            <label className="font-extrabold font-serif text-xl">Forgot Password?</label>
            <label className="mb-4 text-xs text-gray-400">Enter your NCAA email address below to reset your password.</label>

            {/* Username  */}
            <div className="flex flex-col gap-1 mb-2">
                <label className="font-bold text-xs">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full py-2 border rounded-sm px-3 border-black/20 text-sm outline-none " type="text" placeholder="doeJ@ncaa.na" />
                <label className="text-xs text-red-600 hidden">Please enter email</label>
            </div>

            <button 
              disabled={sending}
              onClick={handleSubmit}
              className="w-full mt-5 text-sm py-2 cursor-pointer flex items-center justify-center rounded-lg bg-primary text-white font-bold hover:bg-primary/70">
                 {sending ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                 ) : (
                    <>Send Reset Email</>
                 )}
            </button>
            

            <div className="w-full flex items-center justify-center text-xs mt-5">
              <label>Remember your password? <span onClick={() => navigate("/login")} className="font-bold cursor-pointer hover:underline">Click here</span></label>
            </div>
            </div>
          </div>
        </div>
     )
}

export default ForgotForm;
