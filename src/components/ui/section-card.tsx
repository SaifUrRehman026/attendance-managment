import { useEffect, useState } from "react";
import axios from "axios";
import { FiArrowDownRight,FiArrowUpRight } from "react-icons/fi";
import {
  Card,
 
} from "@/components/ui/card";
import { Progress } from "./progress";

interface LeaveData {
  key: string;
  AssignedLeaves: number;
  RemainingLeaves: number;
    Vacation?: number;
  Paternal?: number;
  Marriage?: number;
}



interface ApiResponse {
  total_leaves: LeaveData[];
}

export function SectionCards() {
  const [regularLeave, setRegularLeave] = useState<LeaveData | null>(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "https://pkdservers.com/LMSDev/api/LeaveRequests/GetClanderData",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const regular = response.data.total_leaves.find(
          (leave) => leave.key === "Regular"
        );

        if (regular) setRegularLeave(regular);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaves();
  }, []);

  const availedLeaves = regularLeave
    ? regularLeave.AssignedLeaves - regularLeave.RemainingLeaves
    : 0;

  return (
     
    <div className="flex flex-wrap justify-center gap-6 px-4 lg:px-6">
<Card className="@container/card w-full sm:w-64 md:w-90 lg:w-100 h-50 bg-[#FFDDD3] p-4 shadow-lg rounded-xl">
  <div className="flex justify-between items-center w-full">
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 text-4xl mt-6 font-semibold text-[#F8977D]">
        <FiArrowDownRight />
        <span>{regularLeave ? availedLeaves : "Loading..."}</span>
      </div>
      <span className="text-[#6b7b86] mt-4">Availed Leaves</span>
    </div>

    <div className="border border-gray-400 text-[#6b7b86] rounded-2xl px-4 text-sm">
      Regular <span className="ml-4">{regularLeave && availedLeaves}</span>
    </div>
  </div>

  <Progress
    className="bg-[#FFFFFF] mt-4"
    value={
      regularLeave && regularLeave.AssignedLeaves > 0
        ? (availedLeaves / regularLeave.AssignedLeaves) * 100
        : 0
    }
    indicatorColor="bg-[#F8977D]"
  />
</Card>


<Card className="@container/card w-full sm:w-64 md:w-90 lg:w-100 h-auto bg-[#BDF6FD] p-4 shadow-xl rounded-xl">
  <div className="flex justify-between items-start w-full">
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2 text-4xl mt-6 font-semibold text-[#01C0C8]">
        <FiArrowUpRight />
        <span>{regularLeave ? regularLeave.RemainingLeaves : "Loading..."}</span>
      </div>
      <span className="text-[#6b7b86] mt-4">Remaining Leaves</span>
    </div>

<div className="flex flex-col gap-2 text-sm">
  {regularLeave && regularLeave.AssignedLeaves !== undefined && (
    <>
      {[
  { label: "Regular", value: regularLeave.RemainingLeaves },
  { label: "Vacation", value: (regularLeave as any).Vacation || 0 },
  { label: "Paternal", value: (regularLeave as any).Paternal || 0 },
  { label: "Marriage", value: (regularLeave as any).Marriage || 0 },
].map((item, idx) => (
        <div
          key={idx}
          className="flex justify-between border border-gray-400 rounded-2xl px-4 text-[#6b7b86]"
        >
          <span className="mr-4">{item.label}</span>
          <span>{item.value}</span>
        </div>
      ))}
    </>
  )}
</div>

  </div>

  <Progress
    className="bg-[#FFFFFF] mt-4 w-full"
    value={
      regularLeave && regularLeave.AssignedLeaves > 0
        ? (regularLeave.RemainingLeaves / regularLeave.AssignedLeaves) * 100
        : 0
    }
    indicatorColor="bg-[#01C0C8]"
  />
</Card>




    </div>
  );
}
