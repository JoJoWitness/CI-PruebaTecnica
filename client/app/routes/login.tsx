import { UserLogForm} from "~/components/form";
import logo from "../assets/icons/berry.svg"

export default function Login() {
  
  console.log("Login page loaded");
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background-100 dark:bg-dark-background-100">
       <div className="flex gap-2 items-end mb-3">
        <img src={logo} className="w-16"/>
        <p className="dark:text-dark-text-primary text-text-primary text-4xl  font-bold tracking-tighter ">Grape App</p>
      </div>
      <UserLogForm/>
    </div>
  );
}