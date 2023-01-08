import './styles.css';
import Hero from './hero';
import NavigationBar from './navBar';
import UserForm from './userForm';


export default function App() {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <UserForm />
    </div>
  );
}
