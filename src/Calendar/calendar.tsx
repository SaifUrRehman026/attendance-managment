import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import type { SlotInfo } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

interface MyEvent {
  title: string;
  start: Date;
  end: Date;
  id?: number;
  color?: string;
  className?: string;
}

type LeaveType = "Full Day" | "Half Day" | "Late arrival / Early leaving";

export default function CalendarComponent() {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [date, setDate] = useState(new Date());

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState<LeaveType>("Full Day");
  const [reason, setReason] = useState("");
  const [fullDaySubType, setFullDaySubType] = useState<string>("");

  const leaveTypes: LeaveType[] = ["Full Day", "Half Day", "Late arrival / Early leaving"];
  const fullDayOptions = ["Regular", "Annual", "Paternal", "Marriage"];

  const pad = (n: number) => n.toString().padStart(2, "0");
  const formatForAPI = (d: Date, endOfDay = false) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${endOfDay ? "23:59:59.999" : "00:00:00.000"}Z`;

  const resetForm = () => {
    setSelectedDate(null);
    setStartDate("");
    setEndDate("");
    setLeaveType("Full Day");
    setReason("");
    setFullDaySubType("");
  };

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(
        "https://pkdservers.com/LMSDev/api/LeaveRequests/GetClanderData",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const apiEvents: MyEvent[] = res.data.calendarData.map((e: any) => ({
        id: e.id,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
        color: e.color,
        className: e.className,
      }));
      setEvents(apiEvents);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSelectedDate(slotInfo.start);
    const formatted = format(slotInfo.start, "yyyy-MM-dd");
    setStartDate(formatted);
    setEndDate(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("User_id");

    if (!token || !userId) {
      alert("User not logged in.");
      return;
    }

    if (!startDate || !endDate || !reason.trim()) {
      alert("Please fill all fields.");
      return;
    }

    if (leaveType === "Full Day" && !fullDaySubType) {
      alert("Please select a Full Day category.");
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      alert("End date cannot be earlier than start date.");
      return;
    }

    const payload = {
      StartDate: formatForAPI(start),
      EndDate: formatForAPI(end, false),
      HalfDay: leaveType === "Half Day",
      IsShortLeave: leaveType === "Late arrival / Early leaving",
      Leave_Type_ID: 1,
      Reason: reason,
      User_id: userId,
      LeaveSubType: leaveType === "Full Day" ? fullDaySubType : undefined,
    };

    try {
      await axios.post(
        "https://pkdservers.com/LMSDev/api/LeaveRequests/PostLeaveRequest",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await fetchEvents();
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to submit leave request. Please try again.");
    }
  };

  const handleCancel = () => resetForm();

  const inputStyle = { width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 6, fontSize: 14 };

  return (
    <div style={{ height: "80vh", width: "100%", margin: "10px auto", maxWidth: "1200px" }}>
      <Calendar<MyEvent>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        date={date}
        onNavigate={setDate}
        views={["month"]}
        style={{ height: "100%", width: "100%" }}
      />

      {selectedDate && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px 25px",
              borderRadius: 12,
              width: 420,
              maxWidth: "90vw",
              boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 25, color: "#333" }}>Leave Request</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                    if (new Date(endDate) < new Date(e.target.value)) setEndDate(e.target.value);
                  }}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Leave Type + Full Day Subtype */}
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Leave Type</label>
                <div style={{ display: "flex", gap: 15 }}>
                  {leaveTypes.map((type) => (
                    <label key={type} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <input
                        type="radio"
                        value={type}
                        checked={leaveType === type}
                        onChange={(e) => {
                          setLeaveType(e.target.value as LeaveType);
                          if (e.target.value !== "Full Day") setFullDaySubType("");
                        }}
                      />
                      <span style={{ fontSize: 14 }}>{type}</span>
                    </label>
                  ))}
                </div>

                {leaveType === "Full Day" && (
                  <div style={{ marginTop: 12 }}>
                    <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Full Day Category</label>
                    <div style={{ display: "flex", gap: 15, flexWrap: "wrap" }}>
                      {fullDayOptions.map((opt) => (
                        <label key={opt} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <input
                            type="radio"
                            value={opt}
                            checked={fullDaySubType === opt}
                            onChange={(e) => setFullDaySubType(e.target.value)}
                          />
                          <span style={{ fontSize: 14 }}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: 25 }}>
                <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Reason</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  maxLength={250}
                  rows={4}
                  placeholder="Enter your reason (max 250 characters)"
                  style={{ ...inputStyle, resize: "vertical" }}
                  required
                />
                <div style={{ fontSize: 12, color: "#888", textAlign: "right" }}>{reason.length}/250</div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{ padding: "10px 18px", borderRadius: 6, border: "1px solid #ccc", backgroundColor: "#f5f5f5", cursor: "pointer", fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 18px", borderRadius: 6, border: "none", backgroundColor: "#007bff", color: "#fff", fontWeight: 500, cursor: "pointer" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
