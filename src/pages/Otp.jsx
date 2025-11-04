import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import Header from './Header';

const corrent_otp = "123456";

export default function Otp() {
    const [otp, setOtp] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const stored = localStorage.getItem("fastor_phone") || "";
        setPhone(stored);

        if (!stored) {
            navigate("/login", {replace: true})
        }
    }, [navigate]);

    const onVerify = (e) => {
        e.preventDefault();
        if (otp === corrent_otp) {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/list");
        } else {
            alert("Invalid OTP, Try 123456");
        }
    };

    const onResend = () => {
        alert(`OTP resend to ${phone || 'your phone'}. (Use 123456)`);
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Header />
            <div className="h-150 flex items-center justify-center bg-gray-900">
                <form onSubmit={onVerify} className="w-full max-w-sm space-y-4">
                    <h1 className="text-2xl font-semibold">Enter OTP</h1>
                    <p className="text-sm text-gray-600">OTP sent to: <span className="font-medium">{phone}</span></p>

                    <input
                    type="text"
                    inputMode="numeric"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0,6))}
                    placeholder="6-digit OTP"
                    className="w-full p-2 border rounded mt-1"
                    maxLength={6}
                    />

                    <button type="submit" className="w-full py-2 bg-green-600 text-white rounded">
                    Verify OTP
                    </button>

                    <div className="flex items-center justify-between text-sm">
                        <button type="button" onClick={onResend} className="underline">Resend</button>
                        <button type="button" onClick={() => navigate('/login')} className="underline">Change number</button>
                    </div>
                </form>
            </div>
        </div>
    );
}