import React, { useState } from 'react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Loader2, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';

interface AuthPageProps {
  mode: 'signin' | 'signup';
  onNavigate: (page: PageView) => void;
}

const MIN_PASSWORD = 8;

const TRUST_POINTS = [
  'Reserve stones to your private vault across devices',
  '14-day memo consignment for verified trade accounts',
  'Allocation notices before stones reach the public catalog',
];

/** Shared field styling — the form is long, so this keeps it readable. */
const fieldClass =
  'w-full px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] dark:bg-[#121110] border text-sm text-[#1A1918] dark:text-[#F5F2ED] placeholder:text-[#A8A29E] dark:placeholder:text-[#6E6760] focus:outline-none transition-colors';

const Label: React.FC<{ htmlFor: string; children: React.ReactNode; optional?: boolean }> = ({
  htmlFor,
  children,
  optional,
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-xs uppercase tracking-[0.18em] text-[#57534E] dark:text-[#A69C94] font-bold mb-1.5"
  >
    {children}
    {optional && <span className="ml-1.5 normal-case tracking-normal font-medium text-[#A8A29E]">optional</span>}
  </label>
);

export const AuthPage: React.FC<AuthPageProps> = ({ mode, onNavigate }) => {
  const { signIn, signUp } = useAuth();
  const isSignUp = mode === 'signup';

  const [form, setForm] = useState({
    clientName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // Clear a field's error as soon as the visitor starts correcting it.
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (!form.email.trim()) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email address.';

    if (!form.password) next.password = 'Password is required.';
    else if (isSignUp && form.password.length < MIN_PASSWORD)
      next.password = `Use at least ${MIN_PASSWORD} characters.`;

    if (isSignUp) {
      if (!form.clientName.trim()) next.clientName = 'Your name is required.';
      if (!form.companyName.trim()) next.companyName = 'Atelier or company name is required.';
      if (form.confirmPassword !== form.password) next.confirmPassword = 'Passwords do not match.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    const result = isSignUp
      ? await signUp({
          clientName: form.clientName.trim(),
          companyName: form.companyName.trim(),
          email: form.email.trim(),
          password: form.password,
          phone: form.phone.trim(),
          address: form.address.trim(),
        })
      : await signIn(form.email.trim(), form.password);

    if (result.ok) {
      // Straight into the portal the account exists for.
      onNavigate('vault');
    } else {
      setFormError(result.error ?? 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const borderFor = (key: string) =>
    errors[key]
      ? 'border-[#B4553F] dark:border-[#8C4632] focus:border-[#B4553F]'
      : 'border-[#E0D8CE] dark:border-[#332F2B] focus:border-[#1A1918] dark:focus:border-[#C5A880]';

  const FieldError: React.FC<{ name: string }> = ({ name }) =>
    errors[name] ? (
      <p className="text-xs text-[#B4553F] dark:text-[#D9846C] mt-1.5 font-medium">{errors[name]}</p>
    ) : null;

  return (
    <div className="py-12 lg:py-20 bg-[#FAF8F5] dark:bg-[#0F0E0D] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] dark:bg-[#181614] border border-[#E8E1D9] dark:border-[#262320] rounded-xl p-6 sm:p-9 shadow-sm">

              <div className="space-y-2 mb-8">
                <span className="text-xs uppercase tracking-[0.3em] text-[#8C6D44] dark:text-[#C5A880] font-bold block">
                  {isSignUp ? 'Trade Registration' : 'Member Access'}
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1918] dark:text-[#F5F2ED] font-normal">
                  {isSignUp ? 'Open a Trade Account' : 'Sign In to Your Vault'}
                </h1>
                <p className="text-sm text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
                  {isSignUp
                    ? 'Registration is for licensed jewellers, appraisers and verified ateliers. Your details go to our trade desk for verification.'
                    : 'Access your saved stones, active memo consignments and allocation notices.'}
                </p>
              </div>

              {/* Server-side failure (bad credentials, duplicate email, outage) */}
              {formError && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-2.5 px-4 py-3 rounded-lg bg-[#FAF3F0] dark:bg-[#2A1C17] border border-[#E3BCAE] dark:border-[#4A332A]"
                >
                  <AlertCircle className="w-4 h-4 text-[#B4553F] dark:text-[#D9846C] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#8C4632] dark:text-[#D9846C] leading-relaxed">{formError}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {isSignUp && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="clientName">Your Name</Label>
                      <input
                        id="clientName"
                        value={form.clientName}
                        onChange={set('clientName')}
                        autoComplete="name"
                        placeholder="Arthur Sterling"
                        className={`${fieldClass} ${borderFor('clientName')}`}
                      />
                      <FieldError name="clientName" />
                    </div>
                    <div>
                      <Label htmlFor="companyName">Atelier / Company</Label>
                      <input
                        id="companyName"
                        value={form.companyName}
                        onChange={set('companyName')}
                        autoComplete="organization"
                        placeholder="Sterling & Co."
                        className={`${fieldClass} ${borderFor('companyName')}`}
                      />
                      <FieldError name="companyName" />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    placeholder="you@atelier.com"
                    className={`${fieldClass} ${borderFor('email')}`}
                  />
                  <FieldError name="email" />
                </div>

                {isSignUp && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="phone" optional>Telephone</Label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={set('phone')}
                        autoComplete="tel"
                        placeholder="+44 20 7946 0912"
                        className={`${fieldClass} ${borderFor('phone')}`}
                      />
                    </div>
                    <div>
                      <Label htmlFor="address" optional>Workshop Address</Label>
                      <input
                        id="address"
                        value={form.address}
                        onChange={set('address')}
                        autoComplete="street-address"
                        placeholder="14 Hatton Garden, London"
                        className={`${fieldClass} ${borderFor('address')}`}
                      />
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={set('password')}
                      autoComplete={isSignUp ? 'new-password' : 'current-password'}
                      placeholder={isSignUp ? `At least ${MIN_PASSWORD} characters` : '••••••••'}
                      className={`${fieldClass} ${borderFor('password')} pr-11`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] dark:text-[#A69C94] hover:text-[#1A1918] dark:hover:text-[#F5F2ED] transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <FieldError name="password" />
                </div>

                {isSignUp && (
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={set('confirmPassword')}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      className={`${fieldClass} ${borderFor('confirmPassword')}`}
                    />
                    <FieldError name="confirmPassword" />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-7 py-3.5 bg-[#1A1918] dark:bg-[#F5F2ED] text-[#FAF8F5] dark:text-[#1A1918] hover:bg-[#33312E] dark:hover:bg-[#E3DDD4] text-xs sm:text-sm uppercase tracking-[0.2em] font-bold rounded transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md !mt-7"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isSubmitting
                    ? isSignUp ? 'Submitting Registration' : 'Verifying'
                    : isSignUp ? 'Request Trade Account' : 'Sign In'}
                </button>
              </form>

              {/* Mode switch */}
              <div className="mt-7 pt-6 border-t border-[#F2ECE4] dark:border-[#262320] text-center">
                <p className="text-sm text-[#57534E] dark:text-[#D5CDC4]">
                  {isSignUp ? 'Already hold a trade account?' : 'No trade account yet?'}{' '}
                  <button
                    onClick={() => onNavigate(isSignUp ? 'signin' : 'signup')}
                    className="text-[#8C6D44] dark:text-[#C5A880] hover:text-[#1A1918] dark:hover:text-[#F5F2ED] underline underline-offset-4 font-semibold transition-colors cursor-pointer"
                  >
                    {isSignUp ? 'Sign in' : 'Register your atelier'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Assurance Column */}
          <aside className="lg:col-span-5 space-y-6 lg:pt-4">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#8C6D44] dark:text-[#C5A880]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#57534E] dark:text-[#A69C94] font-bold">
                Verified Trade Access
              </span>
            </div>

            <p className="font-serif text-2xl sm:text-3xl text-[#1A1918] dark:text-[#F5F2ED] font-light leading-snug">
              A private desk for jewellers who buy at origin.
            </p>

            <ul className="space-y-3.5">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-[#57534E] dark:text-[#D5CDC4] font-light leading-relaxed">
                  <Check className="w-4 h-4 text-[#8C6D44] dark:text-[#C5A880] shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>

            <div className="p-5 rounded-lg bg-[#F5EFE8] dark:bg-[#181614] border border-[#E8E1D9] dark:border-[#262320]">
              <p className="text-xs text-[#57534E] dark:text-[#A69C94] leading-relaxed">
                Trade accounts are reviewed by our gemological desk. Allocation of investment-grade
                stones remains at the discretion of the atelier. Questions about eligibility go to{' '}
                <span className="text-[#1A1918] dark:text-[#F5F2ED] font-semibold">consult@yosenamora.com</span>.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};
