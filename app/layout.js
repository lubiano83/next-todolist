import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import LoginForm from "./components/users/login/LoginForm";
import { cookies } from 'next/headers';
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {

  const cookieStore = await cookies();
  const cookie = cookieStore.get(process.env.COOKIE_NAME)?.value;

  return (
    <html lang="es">
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Navbar />
        { cookie ? children : 
        <LoginForm/> 
        }
        <Footer />
      </body>
    </html>
  );
}
