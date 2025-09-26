import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaArrowsRotate } from "react-icons/fa6";

import {
  Table,

  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Leave {
  ID: number;
  name: string;
  from: string;
  to: string;
  days: number;
  leaveType: string;
  reason: string;
  Status: string;
}

export function MyLeaves() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [rotating, setRotating] = useState(false); 

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios
      .get<Leave[]>(
        "https://pkdservers.com/LMSDev/api/LeaveRequests/GetMyLeaves",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLeaves(res.data);
      })
      .catch((err) => {
        console.error("Error fetching leaves:", err);
      })
      .finally(() => {
        setLoading(false);
        setRotating(false); // stop rotation after reload
      });
  };

  const handleDelete = (leave: Leave) => {
    Swal.fire({
      title: "Are you sure?",
      html: `
        <p><strong>Name:</strong> ${leave.name}</p>
        <p><strong>From:</strong> ${leave.from}</p>
        <p><strong>To:</strong> ${leave.to}</p>
        <p><strong>Reason:</strong> ${leave.reason}</p>
        <p><strong>Status:</strong> ${leave.Status}</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");

          await axios.get(
            `https://pkdservers.com/LMSDev/api/LeaveRequests/DeleteLeaveRequest?ID=${leave.ID}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          setLeaves((prev) => prev.filter((l) => l.ID !== leave.ID));

          Swal.fire("Deleted!", "Your leave has been deleted.", "success");
        } catch (error) {
          console.error("Delete failed:", error);
          Swal.fire("Error", "Failed to delete leave.", "error");
        }
      }
    });
  };


  const filteredLeaves = leaves.filter((leave) =>
    Object.values(leave).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleReload = () => {
    setRotating(true);
    fetchLeaves(); // 🔄 API call instead of full page reload
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="bg-amber-200  m-auto">
        <div className="flex justify-between items-center rounded border p-2">
          <h2>Your Applied Leaves</h2>
          <div className="flex items-center space-x-3">
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-red-500 bg-amber-50 rounded-2xl h-7 px-2"
            />
            <button
              onClick={() => setSearch("")}
              className="bg-amber-50 ml-3 h-7 w-14 rounded-2xl"
            >
              Clear
            </button>
           
            <button onClick={handleReload}>
              <FaArrowsRotate
                className={`h-6 w-6 ${
      rotating ? "animate-spin" : ""
    }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-[#FFFFFF] p-4 overflow-x-hide">
          <div className="md:block overflow-x-auto">
            <Table className="min-w-full border">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeaves.length > 0 ? (
                  filteredLeaves.map((leave, index) => (
                    <TableRow key={leave.ID}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{leave.name}</TableCell>
                      <TableCell>{leave.from}</TableCell>
                      <TableCell>{leave.to}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>{leave.Status}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(leave)}
                        >
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-gray-500">
                      No matching results found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
