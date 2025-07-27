import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SignUpPrompt = () => {
  const { signUp, authError, clearError } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear auth error
    if (authError) {
      clearError();
    }
  };

  const validateSignUpForm = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!validateSignUpForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        role: 'member'
      });
      
      if (result?.success) {
        setSignUpSuccess(true);
        // Reset form
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          fullName: ''
        });
      }
    } catch (error) {
      console.log('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (signUpSuccess) {
    return (
      <div className="text-center">
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg mb-4">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <p className="text-sm text-success font-medium">
              Account created successfully! Please check your email to verify your account.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSignUpSuccess(false);
            setShowSignUp(false);
          }}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-150"
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  if (!showSignUp) {
    return (
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <button
            onClick={() => setShowSignUp(true)}
            className="text-primary hover:text-primary/80 font-medium transition-colors duration-150"
          >
            Sign up here
          </button>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">Create New Account</h3>
        <p className="text-sm text-muted-foreground">Join ProjectHub Dashboard today</p>
      </div>

      {authError && (
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <p className="text-sm text-error font-medium">{authError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSignUp} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleInputChange}
          error={errors.fullName}
          required
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
          required
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          required
          disabled={isLoading}
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          required
          disabled={isLoading}
        />

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => setShowSignUp(false)}
            disabled={isLoading}
          >
            Back to Sign In
          </Button>
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="UserPlus"
            iconPosition="right"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPrompt;