import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCard from "../../components/organisms/AuthCard";
import InputField from "../../components/atoms/InputField";
import Button from "../../components/atoms/Button";
import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "", confirm: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    if (form.username && form.password && form.confirm) {
      navigate("/");
    }
  };

  return (
    <AuthCard title="Daftar" subtitle="Selamat datang!">
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
      <InputField
        label="Konfirmasi Kata Sandi"
        name="confirm"
        type="password"
        placeholder="Masukkan kata sandi"
        value={form.confirm}
        onChange={handleChange}
      />

      <p className={styles.loginLink}>
        Sudah punya akun?{" "}
        <span className={styles.highlight} onClick={() => navigate("/login")}>
          Masuk
        </span>
      </p>

      <Button fullWidth onClick={handleRegister}>Daftar</Button>
      <p className={styles.divider}>Atau</p>
      <Button fullWidth variant="outline" icon="G" onClick={handleRegister}>
        Daftar dengan Google
      </Button>
    </AuthCard>
  );
};

export default RegisterPage;
