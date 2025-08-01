// 'use client'

// import { assets } from "@/Assets/assets";
// import Sidebar from "@/Components/AdminComponents/Sidebar";
// import Image from "next/image";
// import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// export default function Layout({ children }) {
//     return (
//         <>
//             <div className="flex">
//                 <Sidebar />
//                 <ToastContainer
//                         theme="dark"
//                         position="bottom-right"
//                         autoClose={3000}
//                         hideProgressBar={false}
//                         newestOnTop={false}
//                         closeOnClick
//                         pauseOnFocusLoss
//                         draggable
//                         pauseOnHover
//                     />
//                 <div className="flex flex-col w-full">
//                     <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
//                         <h3 className="font-medium">Admin Panel</h3>
//                         <Image src={assets.profile_icon} width={40} alt='' />
//                     </div>

//                     {children}

//                     {/* ✅ Toast container */}
                    
//                 </div>
//             </div>
//         </>
//     )
// }


'use client'
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
    return (
        <>
            <div className="flex">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                        <h3 className="font-medium">Admin Panel</h3>
                        <Image src={assets.profile_icon} width={40} alt='' />
                    </div>
                    {children}
                </div>
            </div>
            {/* Move ToastContainer outside the flex container */}
            <ToastContainer
                theme="dark"
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                style={{ zIndex: 9999 }} // Add high z-index
            />
        </>
    )
}