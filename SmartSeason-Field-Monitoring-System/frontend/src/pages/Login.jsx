import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api, { API_PATHS } from '../utils/apiPaths';
import BrandSidebar from '../components/auth/BrandSidebar';
import AuthToggle from '../components/auth/AuthToggle';
import AuthHeader from '../components/auth/AuthHeader';
import ErrorAlert from '../components/auth/ErrorAlert';
import FormFields from '../components/auth/FormFields';
import RoleSelector from '../components/auth/RoleSelector';
import ForgotPasswordLink from '../components/auth/ForgotPasswordLink';
import SubmitButton from '../components/auth/SubmitButton';
import SocialSignIn from '../components/auth/SocialSignIn';

const Auth = () => {
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'agent'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? API_PATHS.AUTH.LOGIN : API_PATHS.AUTH.REGISTER;
      const { data } = await api.post(endpoint, formData);
      login(data.user, data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuth = (newIsLogin) => {
    setIsLogin(newIsLogin);
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex bg-white overflow-hidden font-sans">
      {/* LEFT SIDE: Brand/Atmosphere */}
      <BrandSidebar />

      {/* RIGHT SIDE: Interactive Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 bg-white shrink-0 relative">
        <div className="w-full max-w-md">
          {/* Auth Toggle */}
          <AuthToggle isLogin={isLogin} onToggle={toggleAuth} />

          {/* Header */}
          <AuthHeader isLogin={isLogin} />

          {/* Error Alert */}
          <ErrorAlert error={error} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Form Fields */}
            <FormFields
              isLogin={isLogin}
              formData={formData}
              onFormChange={setFormData}
              showPassword={showPassword}
              onShowPasswordToggle={() => setShowPassword(!showPassword)}
            />

            {/* Role Selector */}
            <RoleSelector isLogin={isLogin} formData={formData} onFormChange={setFormData} />

            {/* Forgot Password Link */}
            <ForgotPasswordLink isLogin={isLogin} />

            {/* Submit Button */}
            <SubmitButton isLogin={isLogin} loading={loading} />
          </form>

          {/* Social Sign-In */}
          <SocialSignIn />
        </div>
      </div>
    </div>
  );
};

export default Auth;