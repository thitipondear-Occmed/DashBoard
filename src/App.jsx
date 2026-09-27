import React, { useState, useMemo, useEffect } from 'react';

// 👇 ใส่ลิงก์ Deploy Google Apps Script ตัวใหม่ล่าสุดของคุณหมอที่นี่
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxsrrRlFpqKPaovzVQM8nIGeiA_FDpe6x9FNj7f-4u_U-liUVaSV6u-SIku_m2f_PIPMA/exec";

const EPA_DICTIONARY = {
  "EPA1": { name: "EPA 1: Fit for work / Return to work", color: "bg-blue-100 text-blue-800 border-blue-200" },
  "EPA2": { name: "EPA 2: การส่งเสริมสุขภาพพนักงาน", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  "EPA3": { name: "EPA 3: การเฝ้าระวังทางการแพทย์", color: "bg-purple-100 text-purple-800 border-purple-200" },
  "EPA4": { name: "EPA 4: การวินิจฉัยเนื่องจากการทำงาน", color: "bg-amber-100 text-amber-800 border-amber-200" },
  "EPA5": { name: "EPA 5: การสอบสวนโรคจากการทำงาน", color: "bg-rose-100 text-rose-800 border-rose-200" },
  "EPA6": { name: "EPA 6: Walk through survey", color: "bg-cyan-100 text-cyan-800 border-cyan-200" }
};

const IconSearch = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconFileText = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconExternalLink = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>;
const IconClose = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconClock = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconCrown = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconPresentation = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>;
const IconLogOut = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const IconStethoscope = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>;

export default function InterestingCaseDashboard() {
  const [userRole, setUserRole] = useState(null); 
  const [cases, setCases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL_STATUS");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCase, setSelectedCase] = useState(null);
  const [isSuccessScreenOpen, setIsSuccessScreenOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);
    
    fetch(WEB_APP_URL)
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) throw new Error("Data format is not an array");

        const formattedCases = data.map((item, index) => {
          let epaLabel = "EPA1"; 
          const epaText = String(item["EPA ที่เกี่ยวข้อง"] || "");
          const match = epaText.match(/\d+/);
          if (match) epaLabel = `EPA${match[0]}`;
          
          const timeRaw = item["Timestamp"] || item["ประทับเวลา"] || "";
          let formattedDate = "ไม่ระบุวันที่";
          let parsedYear = 2026; 
          let parsedMonth = 9;

          if (timeRaw) {
            const dateObj = new Date(timeRaw);
            if (!isNaN(dateObj.getTime())) {
              const day = String(dateObj.getDate()).padStart(2, '0');
              const month = String(dateObj.getMonth() + 1).padStart(2, '0');
              let year = dateObj.getFullYear();
              parsedYear = year < 2400 ? year : year - 543;
              parsedMonth = dateObj.getMonth() + 1;
              const displayYear = year < 2400 ? year + 543 : year;
              const hours = String(dateObj.getHours()).padStart(2, '0');
              const minutes = String(dateObj.getMinutes()).padStart(2, '0');
              formattedDate = `${day}/${month}/${displayYear} ${hours}:${minutes}`;
            } else {
              const parts = String(timeRaw).split(' ');
              if (parts.length > 0) {
                const dateParts = parts[0].includes('/') ? parts[0].split('/') : parts[0].split('-');
                if (dateParts.length === 3) {
                  let yearIndex = dateParts[2].length >= 4 ? 2 : 0;
                  let year = parseInt(dateParts[yearIndex], 10);
                  let dayIndex = yearIndex === 2 ? 0 : 2;
                  const day = String(dateParts[dayIndex]).padStart(2, '0');
                  const month = String(dateParts[1]).padStart(2, '0');
                  parsedYear = year < 2400 ? year : year - 543;
                  parsedMonth = parseInt(dateParts[1], 10);
                  const displayYear = year < 2400 ? year + 543 : year;
                  const timePart = parts[1] ? parts[1].substring(0, 5) : "";
                  formattedDate = `${day}/${month}/${displayYear}${timePart ? ' ' + timePart : ''}`;
                } else {
                  formattedDate = String(timeRaw);
                }
              }
            }
          }

          // 🌟 ดึงสถานะเดิมที่เคยเซฟไว้กลับมาแสดง
          return {
            id: `C${item._rowNumber || index + 2}`,
            timestamp: formattedDate,
            sortYear: parsedYear,
            sortMonth: parsedMonth,
            submitter: String(item["ไผส่งเด้อ"] || "ไม่ระบุชื่อ"),
            topic: String(item["ประเด็นสำคัญ"] || "ไม่มีหัวข้อ"),
            epas: [epaLabel],
            link: item["targetLink"] || "#",
            // อ่านค่า Boolean และ Text จาก Google Sheets
            isNominated: item["isNominated"] === true || item["isNominated"] === "true" || item["isNominated"] === "TRUE",
            isApproved: item["isApproved"] === true || item["isApproved"] === "true" || item["isApproved"] === "TRUE",
            isPresented: item["isPresented"] === true || item["isPresented"] === "true" || item["isPresented"] === "TRUE",
            presentationPoints: String(item["presentationPoints"] || ""),
            staffFeedback: String(item["staffFeedback"] || "")
          };
        });
        
        setCases(formattedCases.reverse());
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setFetchError("ไม่สามารถดึงข้อมูลจาก Google Sheets ได้");
        setIsLoading(false);
      });
  }, []);

  const filteredCases = useMemo(() => {
    let result = cases.filter(c => {
      const matchesEpa = activeFilter === "ALL" || c.epas.includes(activeFilter);
      let matchesStatus = true;
      if (statusFilter === "NOMINATED") matchesStatus = c.isNominated && !c.isPresented;
      if (statusFilter === "APPROVED") matchesStatus = c.isApproved && !c.isPresented;
      if (statusFilter === "PRESENTED") matchesStatus = c.isPresented;
      if (statusFilter === "ACTIVE") matchesStatus = !c.isPresented; 
      
      const matchesSearch = c.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.submitter.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesEpa && matchesStatus && matchesSearch;
    });

    result.sort((a, b) => {
      if (userRole === 'CHIEF') {
        const aApproved = (a.isApproved && !a.isPresented) ? 1 : 0;
        const bApproved = (b.isApproved && !b.isPresented) ? 1 : 0;
        if (aApproved !== bApproved) return bApproved - aApproved; 
      }
      if (userRole === 'STAFF') {
        const aNominated = (a.isNominated && !a.isPresented) ? 1 : 0;
        const bNominated = (b.isNominated && !b.isPresented) ? 1 : 0;
        if (aNominated !== bNominated) return bNominated - aNominated; 
      }
      return 0;
    });
    return result;
  }, [cases, activeFilter, statusFilter, searchQuery, userRole]);

  const groupedCases = useMemo(() => {
    const monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    const groups = {};
    filteredCases.forEach(c => {
      let monthName = "ข้อมูลทั้งหมด";
      try {
        const mIndex = c.sortMonth - 1;
        const thaiYear = c.sortYear + 543;
        if (mIndex >= 0 && mIndex < 12) {
          monthName = `${monthNames[mIndex]} ${thaiYear}`;
        }
      } catch (e) { monthName = "อื่นๆ"; }

      if (!groups[monthName]) groups[monthName] = [];
      groups[monthName].push(c);
    });
    return groups;
  }, [filteredCases]);

  // 🌟 ฟังก์ชันส่งข้อมูลไปบันทึกลง Google Sheets
  const updateCase = async (id, updates) => {
    // 1. อัปเดตหน้าจอผู้ใช้ทันที (Optimistic UI) 
    setCases(prevCases => prevCases.map(c => c.id === id ? { ...c, ...updates } : c));
    setSelectedCase(prev => prev && prev.id === id ? { ...prev, ...updates } : prev);

    // 2. แอบส่ง Request ไปอัปเดต Google Sheets เบื้องหลัง
    try {
      const rowNum = parseInt(id.replace('C', ''), 10);
      await fetch(WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ rowNumber: rowNum, updates: updates })
      });
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleCaseClick = (item) => {
    setSelectedCase(item); 
  };

  if (!userRole) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-xl w-full text-center border border-slate-100 relative overflow-hidden">
          <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-6">
            <IconStethoscope />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">Interesting Case Dashboard</h1>
          <p className="text-slate-500 mb-8 font-medium">กรุณาเลือกบทบาทในการเข้าใช้งานระบบ</p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <button 
              onClick={() => { setUserRole('CHIEF'); setStatusFilter('ACTIVE'); setActiveFilter('ALL'); }}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:bg-amber-50 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><IconUser /></div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Chief Resident</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">จัดการข้อมูลเคสทั้งหมด <br/>และพิจารณาเสนอเคสให้อาจารย์</p>
              </div>
            </button>
            <button 
              onClick={() => { setUserRole('STAFF'); setStatusFilter('NOMINATED'); setActiveFilter('ALL'); }}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl border-2 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"><IconCrown /></div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">Staff (อาจารย์)</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">ดูเคสที่ถูกจัดเตรียมมา <br/>และอนุมัติใช้งานใน Conference</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccessScreenOpen) {
    const approvedCount = cases.filter(c => c.isApproved && !c.isPresented).length;
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center border border-slate-100 transform transition-all relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner scale-110">
              <IconCheck />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">ดำเนินการเสร็จสิ้น!</h2>
            <p className="text-slate-500 mb-8 text-lg leading-relaxed">
              ระบบได้รับทราบการยืนยันการเลือกเคสจำนวน <span className="font-bold text-emerald-600 text-2xl mx-1">{approvedCount}</span> เคส <br/>สำหรับ Conference เรียบร้อยแล้ว
            </p>
            
            <div className="flex flex-col gap-3 mt-8">
              <button 
                onClick={() => { setIsSuccessScreenOpen(false); setUserRole(null); setStatusFilter('ALL_STATUS'); }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all w-full flex items-center justify-center gap-2 cursor-pointer"
              >
                <IconCheck /> เสร็จสิ้น และกลับสู่หน้าเลือกบทบาท
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg text-white"><IconFileText /></div>
            <h1 className="text-xl font-bold text-slate-900 hidden sm:block">Interesting Case Dashboard</h1>
            <h1 className="text-lg font-bold text-slate-900 sm:hidden">Case Dashboard</h1>
            <span className={`ml-2 px-2.5 py-1 rounded-md text-xs font-bold ${userRole === 'CHIEF' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
              {userRole === 'CHIEF' ? 'โหมด: Chief' : 'โหมด: Staff'}
            </span>
          </div>
          <button onClick={() => { setUserRole(null); setStatusFilter('ALL_STATUS'); }} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 font-medium transition-colors bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg cursor-pointer">
            <IconLogOut /> <span className="hidden sm:inline">เปลี่ยนบทบาท</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        <aside className="w-full lg:w-64 flex-shrink-0 space-y-6 order-2 lg:order-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><IconSearch /></div>
            <input
              type="text"
              placeholder="ค้นหา Topic, ชื่อผู้ส่ง..."
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">กรองตามสถานะ (Workflow)</h2>
            <div className="space-y-1 mb-6 border-b border-slate-100 pb-4">
              <button onClick={() => setStatusFilter("ALL_STATUS")} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === "ALL_STATUS" ? "bg-indigo-50 text-indigo-700 font-bold border border-indigo-100" : "text-slate-600 hover:bg-slate-50"}`}>🗂️ รายการเคสทั้งหมด</button>
              <button onClick={() => setStatusFilter("ACTIVE")} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors mt-1 ${statusFilter === "ACTIVE" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}>📥 เคสรอพิจารณา (ซ่อนพรีเซนต์แล้ว)</button>
              <button onClick={() => setStatusFilter("NOMINATED")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === "NOMINATED" ? "bg-amber-50 text-amber-700 font-bold" : "text-slate-600 hover:bg-slate-50"}`}><IconCrown /> เคสที่ Chief เสนอ</button>
              <button onClick={() => setStatusFilter("APPROVED")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === "APPROVED" ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-600 hover:bg-slate-50"}`}><IconCheck /> เคสที่อาจารย์เลือกแล้ว</button>
              <button onClick={() => setStatusFilter("PRESENTED")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${statusFilter === "PRESENTED" ? "bg-slate-200 text-slate-700 font-bold" : "text-slate-600 hover:bg-slate-50"}`}><IconPresentation /> ทำ Conference ไปแล้ว</button>
            </div>

            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">กรองตามหมวดหมู่ (EPA)</h2>
            <div className="space-y-1">
              <button onClick={() => setActiveFilter("ALL")} className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeFilter === "ALL" ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}>ดูทั้งหมด ({cases.length})</button>
              {Object.keys(EPA_DICTIONARY).map(epaKey => {
                const count = cases.filter(c => c.epas.includes(epaKey)).length;
                return (
                  <button key={epaKey} onClick={() => setActiveFilter(epaKey)} className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeFilter === epaKey ? "bg-slate-100 text-slate-900" : "text-slate-600 hover:bg-slate-50"}`}>
                    <span>{epaKey}</span>
                    <span className="bg-slate-200 text-slate-600 py-0.5 px-2 rounded-full text-xs">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <div className="flex-1 order-1 lg:order-2">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              {statusFilter === "ALL_STATUS" ? "รายการเคสทั้งหมด" : 
               statusFilter === "ACTIVE" ? "เคสทั้งหมดที่รอพิจารณา" :
               statusFilter === "NOMINATED" ? "เคสที่ Chief เสนอมา" :
               statusFilter === "APPROVED" ? "เคสที่อาจารย์อนุมัติแล้ว" : "เคสที่พรีเซนต์ไปแล้ว"}
               
              {(statusFilter === 'ACTIVE' || statusFilter === 'ALL_STATUS') && (
                <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                  {userRole === 'CHIEF' ? 'เคสที่อาจารย์เลือกจะอยู่บนสุด' : 'เรียงเคสที่ถูกเสนอก่อน'}
                </span>
              )}
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">พบ {filteredCases.length} รายการ</span>
          </div>

          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center text-slate-500">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
              <p className="font-medium">กำลังโหลดข้อมูลจาก Google Sheets...</p>
            </div>
          ) : fetchError ? (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl p-8 text-center">
              <p className="font-bold mb-1">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
              <p className="text-sm">{fetchError}</p>
            </div>
          ) : filteredCases.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-12 text-center flex flex-col items-center justify-center text-slate-500">
               <IconFileText />
               <p className="mt-2 text-sm font-medium">ไม่พบข้อมูลเคสที่ตรงกับเงื่อนไข</p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedCases).map(([monthName, monthCases]) => (
                <div key={monthName}>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <h3 className="text-lg font-extrabold text-slate-700 bg-slate-200/50 px-4 py-1.5 rounded-lg border border-slate-200">{monthName}</h3>
                    <div className="h-px bg-slate-200 flex-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {monthCases.map(item => {
                      const isPresented = item.isPresented;
                      return (
                        <div 
                          key={item.id}
                          onClick={() => handleCaseClick(item)} 
                          className={`bg-white rounded-xl border-2 transition-all cursor-pointer hover:shadow-md relative overflow-hidden flex flex-col h-full
                            ${item.isApproved && !isPresented ? 'border-emerald-500 ring-2 ring-emerald-300' : 'border-slate-200 hover:border-slate-300'}
                            ${isPresented ? 'opacity-60 bg-slate-50 border-dashed' : ''}
                          `}
                        >
                          <div className="absolute top-0 right-0 flex">
                            {isPresented && <div className="bg-slate-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1"><IconPresentation /> พรีเซนต์แล้ว</div>}
                            {!isPresented && item.isApproved && <div className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm"><IconCheck /> อาจารย์เลือกแล้ว</div>}
                            {!isPresented && item.isNominated && !item.isApproved && <div className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-bl-lg flex items-center gap-1 shadow-sm"><IconCrown /> Chief เสนอ</div>}
                          </div>
                          
                          <div className="p-5 flex-1 flex flex-col">
                            <div className="flex flex-wrap items-center gap-2 mb-3 mt-3">
                              {item.epas.map(epa => (
                                <span key={epa} className={`px-2.5 py-1 rounded-md text-xs font-bold border ${EPA_DICTIONARY[epa]?.color || 'bg-gray-100'}`}>{epa}</span>
                              ))}
                            </div>
                            
                            <h3 className="text-base font-bold text-slate-900 mb-2 line-clamp-3 leading-snug">{item.topic}</h3>
                            
                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <IconClock /> {item.timestamp} | โดย: {item.submitter}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity cursor-pointer" onClick={() => setSelectedCase(null)}></div>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col relative z-10 overflow-hidden transform transition-all">
            
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2"><IconFileText /> รายละเอียด Case</h3>
              <button onClick={() => setSelectedCase(null)} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200 cursor-pointer"><IconClose /></button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {selectedCase.epas.map(epa => (<span key={epa} className={`px-3 py-1 rounded-md text-sm font-bold border ${EPA_DICTIONARY[epa]?.color || 'bg-slate-200 text-slate-800'}`}>{epa}</span>))}
                <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-md">ผู้ส่ง: {selectedCase.submitter}</span>
                <span className="text-sm text-slate-400 flex items-center gap-1"><IconClock /> {selectedCase.timestamp}</span>
              </div>

              {selectedCase.isPresented && <div className="bg-slate-100 border border-slate-300 text-slate-700 p-3 rounded-lg flex items-center gap-2 font-bold text-sm shadow-sm"><IconPresentation /> เคสนี้ถูกนำไปใช้พรีเซนต์ใน Conference แล้ว</div>}
              {!selectedCase.isPresented && selectedCase.isApproved && <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg flex items-center gap-2 font-bold text-sm shadow-sm"><IconCheck /> 🎉 อาจารย์ (Staff) ได้อนุมัติเลือกเคสนี้สำหรับทำ Conference แล้ว</div>}

              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-1.5">
                  <IconFileText /> สรุปเคสและประเด็นสำคัญที่จะนำเสนอ (Case Summary & Discussion by Chief)
                  {userRole === 'CHIEF' && !selectedCase.isPresented && !selectedCase.isApproved && <span className="text-red-500">*จำเป็น</span>}
                </h4>
                {userRole === 'CHIEF' && !selectedCase.isPresented && !selectedCase.isApproved ? (
                  <textarea
                    className="w-full text-sm p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white shadow-inner" rows="5"
                    placeholder="Chief Resident กรุณาพิมพ์สรุป Case (อาการสำคัญ, ผลตรวจ) และ Discuss (ประเด็นปัญหา/ข้อถกเถียง) ให้อาจารย์ที่นี่..."
                    value={selectedCase.presentationPoints || ""}
                    onChange={(e) => updateCase(selectedCase.id, { presentationPoints: e.target.value })}
                    onBlur={(e) => updateCase(selectedCase.id, { presentationPoints: e.target.value })}
                  ></textarea>
                ) : (
                  <p className="text-sm text-blue-900 bg-white p-4 rounded-lg border border-blue-200 min-h-[5rem] whitespace-pre-wrap">{selectedCase.presentationPoints || <span className="text-slate-400 italic">Chief ยังไม่ได้ระบุสรุปเคสและประเด็นนำเสนอ</span>}</p>
                )}
              </div>

              {(selectedCase.isApproved || selectedCase.staffFeedback) && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-1.5"><IconCheck /> ข้อเสนอแนะ / ประเด็นเพิ่มเติมจากอาจารย์</h4>
                  {userRole === 'STAFF' && !selectedCase.isPresented ? (
                    <textarea
                      className="w-full text-sm p-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none bg-white" rows="3"
                      placeholder="พิมพ์ข้อเสนอแนะเพิ่มเติมเพื่อไกด์ Resident ได้ที่นี่..."
                      value={selectedCase.staffFeedback || ""}
                      onChange={(e) => updateCase(selectedCase.id, { staffFeedback: e.target.value })}
                      onBlur={(e) => updateCase(selectedCase.id, { staffFeedback: e.target.value })}
                    ></textarea>
                  ) : (
                    <p className="text-sm text-emerald-800 bg-white p-3 rounded-lg border border-emerald-100 min-h-[3rem]">{selectedCase.staffFeedback || <span className="text-emerald-600/50 italic">อาจารย์ไม่ได้ระบุข้อเสนอแนะเพิ่มเติม</span>}</p>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <a href={selectedCase.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-sm w-full sm:w-auto justify-center bg-indigo-50 hover:bg-indigo-100 px-4 py-2.5 rounded-lg border border-indigo-200">
                  <IconExternalLink /> เปิดดูไฟล์แนบต้นฉบับ
                </a>
                
                <div className="flex flex-wrap gap-2 w-full sm:w-auto justify-end">
                  {userRole === 'CHIEF' && !selectedCase.isPresented && (() => {
                    if (selectedCase.isApproved) {
                      return (
                        <button 
                          onClick={() => {
                            updateCase(selectedCase.id, { isPresented: true });
                            setSelectedCase(null); 
                          }}
                          className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm border bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer w-full sm:w-auto"
                        >
                          <IconCheck /> รับทราบ! เปลี่ยนสถานะเป็น "พรีเซนต์แล้ว"
                        </button>
                      );
                    }

                    const isNominateDisabled = !selectedCase.isNominated && (!selectedCase.presentationPoints || selectedCase.presentationPoints.trim() === "");
                    return (
                      <button 
                        disabled={isNominateDisabled}
                        onClick={() => updateCase(selectedCase.id, { isNominated: !selectedCase.isNominated })}
                        className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm border cursor-pointer w-full sm:w-auto
                          ${isNominateDisabled ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70' : selectedCase.isNominated ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'}`}
                      >
                        <IconCrown /> {selectedCase.isNominated ? 'ยกเลิกการเสนอ' : 'Chief: เสนอเคสนี้'}
                      </button>
                    );
                  })()}

                  {userRole === 'STAFF' && !selectedCase.isPresented && (
                    <button 
                      onClick={() => updateCase(selectedCase.id, { isApproved: !selectedCase.isApproved })}
                      className={`flex items-center justify-center gap-1 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm border cursor-pointer w-full sm:w-auto
                        ${selectedCase.isApproved ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200' : 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'}`}
                    >
                      <IconCheck /> {selectedCase.isApproved ? 'ยกเลิกการเลือก' : 'Staff: อนุมัติเคสนี้'}
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {userRole === 'STAFF' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] p-4 z-40">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 text-emerald-600 p-2 rounded-full"><IconCheck /></div>
              <div>
                <p className="text-slate-800 font-bold text-sm">สรุปการเลือกเคสสำหรับ Conference</p>
                <p className="text-slate-500 text-xs">คุณเลือกเคสที่รอทำเตรียมนำเสนอไว้ทั้งหมด <span className="font-bold text-emerald-600 text-base">{cases.filter(c => c.isApproved && !c.isPresented).length}</span> เคส</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSuccessScreenOpen(true)}
              disabled={cases.filter(c => c.isApproved && !c.isPresented).length === 0}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              ยืนยันการเลือกเคส และแจ้ง Chief
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
