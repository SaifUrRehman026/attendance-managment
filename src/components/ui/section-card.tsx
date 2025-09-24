import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "./progress"

export function SectionCards() {
  return (
    <div className="flex flex-wrap justify-center gap-6 px-4 lg:px-6">
     
      <Card className="@container/card w-full sm:w-64 md:w-90 lg:w-100 h-50 bg-[#FFDDD3]">
        <CardHeader>
          <CardTitle className="text-lg font-semibold tabular-nums">
            $1,250.00
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Available Leaves <IconTrendingUp className="h-4 w-4" />
          </div>
      <Progress className="bg-amber-50 mt-10"/>
          
        </CardFooter >
      </Card>

      {/* Card 2 */}
      <Card className="@container/card w-full sm:w-64 md:w-90 lg:w-110 h-50 bg-[#BDF6FD]">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-lg font-semibold tabular-nums">
            1,234
          </CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <IconTrendingDown className="h-4 w-4" />
            -20%
          </Badge>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="flex gap-2 font-medium">
            Down 20% this period <IconTrendingDown className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
