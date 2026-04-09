import { useState } from "react";
import { clsx } from "clsx";
import { signUp, signIn } from "../lib/supabase";

type Mode = "login" | "register";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<Mode>("register");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const reset = () => {
    setError(null);
    setSuccess(null);
    setFullName("");
    setEmail("");
    setPassword("");
  };

  const switchMode = (m: Mode) => {
    reset();
    setMode(m);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    if (mode === "register") {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("✅ تم التسجيل! تحقق من بريدك الإلكتروني لتأكيد حسابك.");
        reset();
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      } else {
        setSuccess("✅ تم تسجيل الدخول بنجاح!");
        setTimeout(() => onClose(), 1500);
      }
    }

    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4 bg-slate-900 border border-slate-700 rounded-2xl p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors text-xl"
          aria-label="إغلاق"
        >
          ✕
        </button>

        {/* العنوان */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            {mode === "register" ? "إنشاء حساب جديد" : "تسجيل الدخول"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {mode === "register"
              ? "ابدأ تجربتك المجانية مع ClawCommerce"
              : "مرحباً بعودتك!"}
          </p>
        </div>

        {/* تبديل Login / Register */}
        <div className="flex bg-slate-800 rounded-xl p-1 mb-6">
          {(["register", "login"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={clsx(
                "flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                mode === m
                  ? "bg-orange-500 text-white shadow"
                  : "text-slate-400 hover:text-white"
              )}
            >
              {m === "register" ? "تسجيل" : "دخول"}
            </button>
          ))}
        </div>

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <div className="flex flex-col gap-1">
              <label className="text-slate-300 text-sm font-medium">
                الاسم الكامل
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="مثال: سارة أحمد"
                className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
          )}

          <div className="flex flex-col gap-1">
            <label className="text-slate-300 text-sm font-medium">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-slate-300 text-sm font-medium">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="6 أحرف على الأقل"
              className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* رسائل الخطأ / النجاح */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm text-right">
              ❌ {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 text-green-400 text-sm text-right">
              {success}
            </div>
          )}

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors mt-2"
          >
            {loading
              ? "⏳ جارٍ المعالجة..."
              : mode === "register"
              ? "إنشاء الحساب"
              : "دخول"}
          </button>
        </form>

        {/* فوتر */}
        <p className="text-center text-slate-500 text-xs mt-4">
          {mode === "register" ? "لديك حساب؟" : "ليس لديك حساب؟"}{" "}
          <button
            onClick={() => switchMode(mode === "register" ? "login" : "register")}
            className="text-orange-400 hover:text-orange-300 underline transition-colors"
          >
            {mode === "register" ? "سجّل دخولك" : "أنشئ حساباً"}
          </button>
        </p>
      </div>
    </div>
  );
}