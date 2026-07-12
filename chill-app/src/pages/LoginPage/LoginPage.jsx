import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/organisms/AuthCard";
import InputField from "../../components/atoms/InputField";
import Button from "../../components/atoms/Button";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    // Validation minimal — bisa dikembangkan
    if (form.username && form.password) {
      navigate("/");
    }
  };

  return (
    <AuthCard title="Masuk" subtitle="Selamat datang kembali!">
      <InputField
        label="Username"
        name="username"
        placeholder="Masukkan username"
        value={form.username}
        onChange={handleChange}
      />
      <InputField
        label="Kata Sandi"
        name="password"
        type="password"
        placeholder="Masukkan kata sandi"
        value={form.password}
        onChange={handleChange}
      />

      <div className={styles.meta}>
        <span className={styles.link}>
          Belum punya akun?{" "}
          <span className={styles.linkHighlight} onClick={() => navigate("/register")}>
            Daftar
          </span>
        </span>
        <span className={styles.linkHighlight}>Lupa kata sandi?</span>
      </div>

      <Button fullWidth onClick={handleLogin}>Masuk</Button>
      <p className={styles.divider}>Atau</p>
      <Button fullWidth variant="outline" icon="G" onClick={handleLogin}>
        Masuk dengan Google
      </Button>
    </AuthCard>
  );
};

export default LoginPage;
