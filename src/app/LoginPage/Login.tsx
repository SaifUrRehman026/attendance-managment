import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import type { userInfo } from "os"


export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const data={username:"", password:""}
  const [inputData, setInputData]= useState(data)
  const [showPassword, setShowPassword] = useState(false)
const handleData=(e:React.ChangeEvent<HTMLInputElement>)=>{
  const { name, value } = e.target;
setInputData({...inputData, [name]:value})
}
 



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "https://pkdservers.com/LMSDev/api/AuthUser/Login",
      inputData,
      { headers: { "Content-Type": "application/json" } }
    );
    console.log("Login Api Response:", res.data);
    if(res.data){
     const parsedUser = res.data.user ? JSON.parse(res.data.user) : {};
      localStorage.setItem("token", parsedUser.access_token);
          localStorage.setItem("user", JSON.stringify({
        id: res.data.id,
        name: res.data.MachineName,
        profile: res.data.ProfilePicture,
        roles: res.data.role,
        ...parsedUser 
      }));

      console.log("Saved Data in localStorage");
       alert("Login successful");
    } else {
      alert("Invalid email or password ");
    }
      
    }

   catch (err: any) {
    if (err.response) {
      console.error("Server error:", err.response.status, err.response.data);
      
      
    } else {
      console.error("Error:", err.message);
    }
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div
        className={cn(
          "flex flex-col md:flex-row w-full max-w-5xl rounded shadow-2xl overflow-hidden bg-white",
          className
        )}
        {...props}
      >

        <div className="hidden md:flex w-1/2 items-center justify-center bg-white">
          <img
            src="loginpage.jpg"
            alt="login banner"
            className="w-full h-full object-cover"
          />
        </div>

       
        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <Card className="w-full max-w-md border-0 shadow-none">
            <CardHeader>
              <div className="flex gap-4 items-center my-5">
                <div className="flex items-center justify-center border rounded-full h-[80px] w-[80px]">
                  <img src="mst-logo.png" alt="login" className="w-[50px]" />
                </div>
                <div className="flex flex-col items-start mt-2">
                  <CardTitle className="text-xl">
                    <h1 className="pl-[23px]">Welcome to</h1>
                    <h1>MST Employees Portal</h1>
                  </CardTitle>
                  <CardDescription className="pt-2">
                    Login To Your Account
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}  className="space-y-6">
                
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="rounded-2xl border border-[#CED4DA]"
                    id="username"
                    type="email"
                    name="username"
                    onChange={handleData}
                    value={inputData.username}
                    placeholder="m@example.com"
                    required
                  />
                </div>

               
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="rounded-2xl border border-[#CED4DA] pr-24"
                      id="password"
                      name="password"
                      value={inputData.password}
                      onChange={handleData}
                      type={showPassword ? "text" : "password"}
                      required
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center gap-2">
                      <input
                        id="showPassword"
                        type="checkbox"
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                      />
                      <Label
                        htmlFor="showPassword"
                        className="cursor-pointer text-sm text-gray-600"
                      >
                        Show
                      </Label>
                    </div>
                  </div>
                </div>

               
                <Button 
                  type="submit"
                  className="rounded-2xl w-full bg-gradient-to-r from-[#71F7F3] to-[#37B6D0] text-white"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
