import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const COUNTRY_OPTIONS = [
  { code: '+91', label: 'India' },
  { code: '+1', label: 'USA' },
  { code: '+44', label: 'UK' },
  { code: '+61', label: 'Australia' },
];

export default function Login() {
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (phone.length !== 10) {
      alert('Enter a valid phone number (10 digits).');
      return;
    }

    const fullNumber = `${countryCode}${phone}`;

    localStorage.setItem('fastor_phone', fullNumber);
    navigate('/otp');
  };

  return (
    <div className='min-h-screen bg-gray-900'>
    <Header />
    <div className="h-150 flex flex-row justify-center items-center p-6 bg-gray-900">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>
        <label className="block">
          <span className="text-sm">Country</span>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          >
            {COUNTRY_OPTIONS.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label} ({c.code})
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-sm">Phone number</span>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 9876543210"
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          Send OTP
        </button>
      </form>
    </div>
    </div>
  );
}
