import "./styles.css";
import Hero from "./hero";
import NavigationBar from "./navBar";
import UserForm from "./userForm";
import Footer from "./footer";

export default function App() {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <UserForm />
      <Footer />
    </div>
  );
}
