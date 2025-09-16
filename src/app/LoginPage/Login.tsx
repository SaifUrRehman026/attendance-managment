import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex w-[100vh] h-[60vh] rounded shadow-2xl justify-center items-center", className)} {...props}>
     
      <div className="w-1/2 flex items-center justify-center bg-[#FFFFFF]">
        <img
          src="loginpage.jpg"
          alt="login banner"
          className="w-[50vh] h-[60vh] object-cover"
        />
      </div>

      
      <div className="w-1/2 flex items-center justify-center p-8">
        <Card className="w-[550px]">
          <CardHeader>
            <div className="flex gap-4 items-center">
              
              <div className="flex items-center justify-center border rounded-full h-[100px] w-[100px]">
                <img
                  src="mst-logo.png"
                  alt="login"
                  className="w-[60px]"
                />
              </div>
             
              <div className="flex flex-col items-start">
                <CardTitle className="text-xl">
                  Welcome to MST Employees Portal
                </CardTitle>
                <CardDescription>
                  Login To Your Account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input className="rounded-2xl border-1 border-[#CED4DA]"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <Input className="rounded-2xl border-1 border-[#CED4DA]" id="password" type="password" required />
                </div>
                <Button type="submit" className=" rounded-2xl w-full bg-linear-to-r from-[#71F7F3] to-[#37B6D0]">
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
