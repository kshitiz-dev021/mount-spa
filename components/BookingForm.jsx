"use client";
 
import { useState, useEffect } from "react";
 
const SERVICES = [
  { id: "swedish", name: "Swedish Massage", duration: "60 min", price: "NPR 2,500", desc: "Gentle flowing strokes to melt away tension and restore calm.", icon: "◈" },
  { id: "deep", name: "Deep Tissue Massage", duration: "75 min", price: "NPR 3,200", desc: "Targeted pressure on deep muscle layers for chronic pain relief.", icon: "◆" },
  { id: "hotstone", name: "Hot Stone Therapy", duration: "90 min", price: "NPR 4,000", desc: "Volcanic stones warm the muscles for profound relaxation.", icon: "◉" },
  { id: "aroma", name: "Aromatherapy", duration: "60 min", price: "NPR 2,800", desc: "Essential oils combined with massage to balance mind and body.", icon: "✿" },
  { id: "facial", name: "Facial Treatment", duration: "60 min", price: "NPR 2,200", desc: "Deep-cleanse and nourish your skin for a natural radiant glow.", icon: "◎" },
  { id: "scrub", name: "Body Scrub", duration: "45 min", price: "NPR 1,800", desc: "Himalayan salt exfoliation leaving skin silky smooth.", icon: "❋" },
  { id: "couple", name: "Couple's Massage", duration: "90 min", price: "NPR 5,500", desc: "A shared journey of relaxation in our private couples suite.", icon: "◬" },
  { id: "foot", name: "Foot Reflexology", duration: "45 min", price: "NPR 1,500", desc: "Ancient pressure point therapy to restore your whole body.", icon: "⬡" },
];
 
const TIME_SLOTS = ["09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];
const initialForm = { name: "", service: "", date: "", time: "", phone: "", notes: "" };
 
function fmtTime(t) {
  const [h] = t.split(":").map(Number);
  return h < 12 ? `${h}:00 AM` : h === 12 ? "12:00 PM" : `${h - 12}:00 PM`;
}
 
function Nav() {
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,width:"100%",
      padding:"0",height:70,display:"flex",alignItems:"center",justifyContent:"space-between",
      background:"rgba(15,12,8,0.97)",backdropFilter:"blur(12px)",
      transition:"all 0.35s ease",
    }}>
      <a href="#" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
        <span style={{color:"#c9a84c",fontSize:"1.1rem"}}>✦</span>
        <span style={{fontFamily:"'inter',serif",color:"#f5efe6",fontSize:"1.15rem",fontWeight:400,letterSpacing:"0.04em"}}>Mount Heaven Spa</span>
      </a>
      <div style={{display:"flex",gap:32,alignItems:"center"}}>
        {[["Services","#services"],["About","#about"],["Gallery","#gallery"]].map(([l,h])=>(
          <a key={l} href={h} style={{color:"rgba(245,239,230,0.7)",fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",textDecoration:"none",transition:"color 0.2s"}}
            onMouseEnter={e=>e.target.style.color="#c9a84c"} onMouseLeave={e=>e.target.style.color="rgba(245,239,230,0.7)"}>{l}</a>
        ))}
        <a href="#booking" style={{
          background:"transparent",border:"1px solid #c9a84c",color:"#c9a84c",
          padding:"9px 22px",fontSize:"0.75rem",letterSpacing:"0.15em",textTransform:"uppercase",
          textDecoration:"none",borderRadius:2,transition:"all 0.2s"
        }} onMouseEnter={e=>{e.target.style.background="#c9a84c";e.target.style.color="#0f0c08"}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color="#c9a84c"}}>Book Now</a>
      </div>
    </nav>
  );
}
 
function Hero() {
  return (
    <section id="home" style={{
      minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",width:"100%",
      position:"relative",overflow:"hidden",
      background:"linear-gradient(160deg,#0f0c08 0%,#1c1409 40%,#0f0c08 100%)",
      padding:"120px 40px 80px",
    }}>
      {/* Decorative bg rings */}
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:700,height:700,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.07)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.1)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:300,height:300,borderRadius:"50%",border:"1px solid rgba(201,168,76,0.13)",pointerEvents:"none"}}/>
      {/* Gradient orb */}
      <div style={{position:"absolute",top:"20%",right:"10%",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)",pointerEvents:"none"}}/>
 
      <div style={{textAlign:"center",maxWidth:760,position:"relative",zIndex:1}}>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.7rem",letterSpacing:"0.35em",textTransform:"uppercase",color:"#c9a84c",marginBottom:28,display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
          <span style={{width:40,height:1,background:"#c9a84c",opacity:0.5,display:"inline-block"}}/>
          Bardibas -3, Mahottari, Gauridanda
          <span style={{width:40,height:1,background:"#c9a84c",opacity:0.5,display:"inline-block"}}/>
        </p>
        <h1 style={{fontFamily:"'inter',serif",fontSize:"clamp(4rem,10vw,8rem)",fontWeight:400,lineHeight:0.95,color:"#f5efe6",marginBottom:32,letterSpacing:"-0.01em"}}>
          Mount<br/><em style={{fontStyle:"italic",color:"#c9a84c"}}>Heaven</em><br/>Spa
        </h1>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:"1rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(245,239,230,0.5)",marginBottom:12}}>
          Beauty is the illumination of the soul
        </p>
        <p style={{fontFamily:"serif",fontSize:"0.95rem",color:"rgba(201,168,76,0.6)",marginBottom:48,fontStyle:"italic"}}>
          शरीरलाई तनावमुक्त बनाउनुहोस्
        </p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="#booking" style={{
            background:"#c9a84c",color:"#0f0c08",padding:"16px 40px",
            fontSize:"0.8rem",letterSpacing:"0.2em",textTransform:"uppercase",
            textDecoration:"none",borderRadius:2,fontWeight:600,border:"1px solid #c9a84c",
            transition:"all 0.25s",fontFamily:"'Jost',sans-serif"
          }} onMouseEnter={e=>{e.target.style.background="transparent";e.target.style.color="#c9a84c"}}
            onMouseLeave={e=>{e.target.style.background="#c9a84c";e.target.style.color="#0f0c08"}}>
            Book a Treatment
          </a>
          <a href="#services" style={{
            background:"transparent",color:"rgba(245,239,230,0.8)",padding:"16px 40px",
            fontSize:"0.8rem",letterSpacing:"0.2em",textTransform:"uppercase",
            textDecoration:"none",borderRadius:2,border:"1px solid rgba(245,239,230,0.2)",
            transition:"all 0.25s",fontFamily:"'Jost',sans-serif"
          }} onMouseEnter={e=>{e.target.style.borderColor="rgba(245,239,230,0.6)";e.target.style.color="#f5efe6"}}
            onMouseLeave={e=>{e.target.style.borderColor="rgba(245,239,230,0.2)";e.target.style.color="rgba(245,239,230,0.8)"}}>
            Our Services
          </a>
        </div>
      </div>
      {/* Scroll hint */}
      <div style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
        <span style={{fontFamily:"'Jost',sans-serif",fontSize:"0.65rem",letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(201,168,76,0.5)"}}>Scroll</span>
        <div style={{width:1,height:40,background:"linear-gradient(to bottom,rgba(201,168,76,0.5),transparent)"}}/>
      </div>
    </section>
  );
}
 
function Services() {
  return (
    <section id="services" style={{background:"#f8f4ee",width:"100%",padding:"100px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:64}}>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.68rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#a07830",marginBottom:12}}>Our Treatments</p>
          <h2 style={{fontFamily:"'inter',serif",fontSize:"clamp(2.2rem,4vw,3.2rem)",fontWeight:400,color:"#1a1408",lineHeight:1.15}}>Choose Your Experience</h2>
          <div style={{width:48,height:1,background:"#c9a84c",margin:"20px auto 0"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:24}}>
          {SERVICES.map(s=>(
            <a href="#booking" key={s.id} style={{
              background:"#fff",border:"1px solid #e8e0d4",borderRadius:2,padding:"32px 28px",
              textDecoration:"none",display:"block",transition:"all 0.25s",cursor:"pointer"
            }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#c9a84c";e.currentTarget.style.boxShadow="0 8px 40px rgba(0,0,0,0.08)";e.currentTarget.style.transform="translateY(-2px)"}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#e8e0d4";e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)"}}>
              <div style={{fontSize:"1.6rem",color:"#c9a84c",marginBottom:16}}>{s.icon}</div>
              <div style={{fontFamily:"'inter',serif",fontSize:"1.1rem",color:"#1a1408",marginBottom:10,fontWeight:400}}>{s.name}</div>
              <div style={{fontFamily:"'Jost',sans-serif",fontSize:"0.85rem",color:"#7a6f62",lineHeight:1.6,marginBottom:20}}>{s.desc}</div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",borderTop:"1px solid #f0e8dc",paddingTop:16}}>
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:"0.72rem",letterSpacing:"0.1em",color:"#a07830",textTransform:"uppercase"}}>{s.duration}</span>
                <span style={{fontFamily:"'inter',serif",fontSize:"0.95rem",color:"#1a1408",fontWeight:400}}>{s.price}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
 
function About() {
  const stats = [
    {num:"8+",label:"Years of Excellence"},
    {num:"12",label:"Expert Therapists"},
    {num:"5K+",label:"Happy Clients"},
    {num:"8",label:"Treatments"},
  ];
  return (
    <section id="about" style={{background:"#0f0c08",width:"100%",padding:"100px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>
        <div>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.68rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#c9a84c",marginBottom:12}}>Our Story</p>
          <h2 style={{fontFamily:"'inter',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:400,color:"#f5efe6",lineHeight:1.15,marginBottom:28}}>A Sanctuary<br/>in the Hills</h2>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.92rem",color:"rgba(245,239,230,0.6)",lineHeight:1.85,marginBottom:20,fontWeight:300}}>
            Nestled in the heart of Kathmandu, Mount Heaven Spa was born from a simple belief — that every person deserves a moment of pure peace. Since 2016, we have blended ancient Himalayan healing traditions with modern wellness techniques.
          </p>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.92rem",color:"rgba(245,239,230,0.6)",lineHeight:1.85,marginBottom:36,fontWeight:300}}>
            Our certified therapists bring years of training and a deep personal commitment to your well-being. Whether you seek relief from the demands of daily life or simply wish to indulge, we create a space where time slows.
          </p>
          <div style={{display:"inline-flex",alignItems:"center",gap:16,border:"1px solid rgba(201,168,76,0.25)",padding:"16px 24px",borderRadius:2}}>
            <span style={{color:"#c9a84c",fontSize:"0.65rem",letterSpacing:"0.2em",textTransform:"uppercase",fontFamily:"'Jost',sans-serif"}}>Open Daily</span>
            <span style={{width:1,height:20,background:"rgba(201,168,76,0.3)"}}/>
            <span style={{fontFamily:"'inter',serif",color:"#f5efe6",fontSize:"1rem"}}>9:00 AM — 8:00 PM</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20,position:"relative"}}>
          {stats.map(({num,label})=>(
            <div key={label} style={{border:"1px solid rgba(201,168,76,0.2)",padding:"32px 24px",borderRadius:2,textAlign:"center",background:"rgba(201,168,76,0.03)"}}>
              <div style={{fontFamily:"'inter',serif",fontSize:"2.8rem",fontWeight:400,color:"#c9a84c",lineHeight:1}}>{num}</div>
              <div style={{fontFamily:"'Jost',sans-serif",fontSize:"0.68rem",letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(245,239,230,0.4)",marginTop:10}}>{label}</div>
            </div>
          ))}
          <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"2rem",color:"rgba(201,168,76,0.15)",pointerEvents:"none"}}>✦</div>
        </div>
      </div>
    </section>
  );
}
 
function Gallery() {
  const panels = [
    {title:"The Ritual Room",sub:"Private treatment suites",bg:"linear-gradient(135deg,#2c1810 0%,#6b3a22 100%)"},
    {title:"Stone & Steam",sub:"Hot stone therapy",bg:"linear-gradient(160deg,#1a2636 0%,#3a6b8a 100%)"},
    {title:"Himalayan Touch",sub:"Traditional techniques",bg:"linear-gradient(120deg,#1e2d1e 0%,#3a7a40 100%)"},
    {title:"The Lotus Lounge",sub:"Relaxation space",bg:"linear-gradient(150deg,#2d1f3d 0%,#6b4a9a 100%)"},
  ];
  return (
    <section id="gallery" style={{background:"#f8f4ee",width:"100%",padding:"0"}}>
      <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center",marginBottom:52}}>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.68rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#a07830",marginBottom:12}}>The Space</p>
        <h2 style={{fontFamily:"'inter',serif",fontSize:"clamp(2.2rem,4vw,3.2rem)",fontWeight:400,color:"#1a1408"}}>Our Sanctuary</h2>
        <div style={{width:48,height:1,background:"#c9a84c",margin:"20px auto 0"}}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",minHeight:380}}>
        {panels.map(p=>(
          <div key={p.title} style={{
            background:p.bg,display:"flex",flexDirection:"column",justifyContent:"flex-end",
            padding:"40px 32px",transition:"flex 0.4s ease",cursor:"pointer",flex:1,position:"relative",overflow:"hidden"
          }}
          onMouseEnter={e=>e.currentTarget.style.flex="1.5"}
          onMouseLeave={e=>e.currentTarget.style.flex="1"}>
            <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:200,height:200,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.07)"}}/>
            <div style={{fontFamily:"'inter',serif",fontSize:"1.2rem",fontWeight:400,color:"rgba(255,255,255,0.92)",marginBottom:6}}>{p.title}</div>
            <div style={{fontFamily:"'Jost',sans-serif",fontSize:"0.7rem",letterSpacing:"0.15em",textTransform:"uppercase",color:"rgba(255,255,255,0.45)"}}>{p.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
 
function Booking() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [selSvc, setSelSvc] = useState(null);
 
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date(); maxDate.setDate(maxDate.getDate()+30);
  const maxDateStr = maxDate.toISOString().split("T")[0];
 
  function validate() {
    const e = {};
    if (!form.name.trim()||form.name.trim().length<2) e.name="Please enter your full name.";
    if (!form.service) e.service="Please select a service.";
    if (!form.date) e.date="Please choose a date.";
    if (!form.time) e.time="Please choose a time slot.";
    if (!/^(\+977)?[0-9]{10}$/.test(form.phone.replace(/\s/g,""))) e.phone="Enter a valid 10-digit number.";
    return e;
  }
 
  function handleChange(e) {
    const {name,value} = e.target;
    setForm(p=>({...p,[name]:value}));
    if (name==="service") setSelSvc(SERVICES.find(s=>s.name===value)||null);
    if (errors[name]) setErrors(p=>({...p,[name]:""}));
  }
 
  async function handleSubmit(e) {
    e.preventDefault();
    const errs=validate();
    if (Object.keys(errs).length){setErrors(errs);return;}
    setStatus("loading");
    try {
      const res=await fetch("/api/bookings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data=await res.json();
      if (!res.ok){setStatus("error");setServerMsg(data.error||"Something went wrong.");}
      else{setStatus("success");setServerMsg(`${form.service} confirmed for ${form.date} at ${fmtTime(form.time)}.`);setForm(initialForm);setSelSvc(null);}
    } catch {setStatus("error");setServerMsg("Network error. Please try again.");}
  }
 
  const inputStyle = (err) => ({
    width:"100%",padding:"13px 16px",
    background:"rgba(255,255,255,0.04)",
    border:`1px solid ${err?"#c0392b":"rgba(201,168,76,0.2)"}`,
    borderRadius:2,
    fontFamily:"'Jost',sans-serif",fontSize:"0.92rem",fontWeight:300,
    color:"#f5efe6",outline:"none",
    transition:"border-color 0.2s,box-shadow 0.2s",
    boxSizing:"border-box",
    appearance:"none",WebkitAppearance:"none",
  });
 
  const labelStyle = {
    display:"block",fontFamily:"'Jost',sans-serif",
    fontSize:"0.68rem",letterSpacing:"0.2em",textTransform:"uppercase",
    color:"rgba(201,168,76,0.7)",marginBottom:8,
  };
 
  const errStyle = {fontFamily:"'Jost',sans-serif",fontSize:"0.78rem",color:"#e74c3c",marginTop:5};
 
  return (
    <section id="booking" style={{background:"#0f0c08",width:"100%",padding:"100px 40px"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1.2fr",gap:80,alignItems:"start"}}>
        {/* Left info */}
        <div>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.68rem",letterSpacing:"0.3em",textTransform:"uppercase",color:"#c9a84c",marginBottom:12}}>Reserve</p>
          <h2 style={{fontFamily:"'inter',serif",fontSize:"clamp(2rem,3.5vw,3rem)",fontWeight:400,color:"#f5efe6",lineHeight:1.15,marginBottom:24}}>Book Your<br/>Treatment</h2>
          <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.9rem",color:"rgba(245,239,230,0.5)",lineHeight:1.8,marginBottom:40,fontWeight:300}}>
            Fill in your details and we will confirm your appointment. Walk-ins welcome, advance booking recommended.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:20,marginBottom:40}}>
            {[
              ["◎","Thamel, Kathmandu, Nepal"],
              ["◉","+977 98-0000-000"],
              ["✿","Open daily 9:00 AM – 8:00 PM"],
            ].map(([icon,text])=>(
              <div key={text} style={{display:"flex",alignItems:"center",gap:14}}>
                <span style={{color:"#c9a84c",fontSize:"0.9rem",width:20,textAlign:"center"}}>{icon}</span>
                <span style={{fontFamily:"'Jost',sans-serif",fontSize:"0.88rem",color:"rgba(245,239,230,0.55)",fontWeight:300}}>{text}</span>
              </div>
            ))}
          </div>
          {selSvc && (
            <div style={{border:"1px solid rgba(201,168,76,0.25)",borderRadius:2,padding:"20px 24px",background:"rgba(201,168,76,0.04)",display:"flex",gap:16,alignItems:"center"}}>
              <span style={{fontSize:"1.8rem",color:"#c9a84c"}}>{selSvc.icon}</span>
              <div>
                <div style={{fontFamily:"'inter',serif",color:"#f5efe6",fontSize:"1rem",marginBottom:4}}>{selSvc.name}</div>
                <div style={{fontFamily:"'Jost',sans-serif",fontSize:"0.78rem",color:"rgba(201,168,76,0.7)",letterSpacing:"0.05em"}}>{selSvc.duration} · {selSvc.price}</div>
              </div>
            </div>
          )}
        </div>
 
        {/* Right form */}
        <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(201,168,76,0.15)",borderRadius:2,padding:"44px 40px"}}>
          {status==="success" ? (
            <div style={{textAlign:"center",padding:"40px 0"}}>
              <div style={{fontSize:"2.5rem",color:"#c9a84c",marginBottom:20,animation:"pulse 2s infinite"}}>✦</div>
              <h3 style={{fontFamily:"'inter',serif",fontSize:"2rem",color:"#f5efe6",fontWeight:400,marginBottom:16}}>Confirmed!</h3>
              <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.9rem",color:"rgba(245,239,230,0.55)",lineHeight:1.7,marginBottom:8}}>{serverMsg}</p>
              <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.85rem",color:"rgba(245,239,230,0.4)",marginBottom:32}}>We'll reach out shortly to confirm.</p>
              <button onClick={()=>setStatus("idle")} style={{
                background:"transparent",border:"1px solid rgba(201,168,76,0.4)",color:"#c9a84c",
                padding:"12px 32px",fontSize:"0.75rem",letterSpacing:"0.15em",textTransform:"uppercase",
                cursor:"pointer",borderRadius:2,fontFamily:"'Jost',sans-serif",transition:"all 0.2s"
              }}>Book Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"24px 20px"}}>
 
                {/* Name */}
                <div style={{gridColumn:"span 2"}}>
                  <label style={labelStyle}>Full Name <span style={{color:"#c9a84c"}}>*</span></label>
                  <input name="name" type="text" value={form.name} onChange={handleChange}
                    placeholder="Your full name" style={inputStyle(errors.name)} autoComplete="name"
                    onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,0.1)"}}
                    onBlur={e=>{e.target.style.borderColor=errors.name?"#c0392b":"rgba(201,168,76,0.2)";e.target.style.boxShadow="none"}}/>
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>
 
                {/* Service */}
                <div style={{gridColumn:"span 2"}}>
                  <label style={labelStyle}>Treatment <span style={{color:"#c9a84c"}}>*</span></label>
                  <select name="service" value={form.service} onChange={handleChange}
                    style={{...inputStyle(errors.service),cursor:"pointer",
                      backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%23c9a84c' d='M5 6L0 0h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center",paddingRight:40}}
                    onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,0.1)"}}
                    onBlur={e=>{e.target.style.borderColor=errors.service?"#c0392b":"rgba(201,168,76,0.2)";e.target.style.boxShadow="none"}}>
                    <option value="" style={{background:"#1a1408"}}>— Choose a treatment —</option>
                    {SERVICES.map(s=>(
                      <option key={s.id} value={s.name} style={{background:"#1a1408"}}>
                        {s.name} · {s.duration} · {s.price}
                      </option>
                    ))}
                  </select>
                  {errors.service && <p style={errStyle}>{errors.service}</p>}
                </div>
 
                {/* Date */}
                <div>
                  <label style={labelStyle}>Date <span style={{color:"#c9a84c"}}>*</span></label>
                  <input name="date" type="date" value={form.date} onChange={handleChange}
                    min={today} max={maxDateStr} style={inputStyle(errors.date)}
                    onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,0.1)"}}
                    onBlur={e=>{e.target.style.borderColor=errors.date?"#c0392b":"rgba(201,168,76,0.2)";e.target.style.boxShadow="none"}}/>
                  {errors.date && <p style={errStyle}>{errors.date}</p>}
                </div>
 
                {/* Time */}
                <div>
                  <label style={labelStyle}>Time <span style={{color:"#c9a84c"}}>*</span></label>
                  <select name="time" value={form.time} onChange={handleChange}
                    style={{...inputStyle(errors.time),cursor:"pointer",
                      backgroundImage:"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath fill='%23c9a84c' d='M5 6L0 0h10z'/%3E%3C/svg%3E\")",
                      backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center",paddingRight:40}}
                    onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,0.1)"}}
                    onBlur={e=>{e.target.style.borderColor=errors.time?"#c0392b":"rgba(201,168,76,0.2)";e.target.style.boxShadow="none"}}>
                    <option value="" style={{background:"#1a1408"}}>— Select time —</option>
                    {TIME_SLOTS.map(t=>(
                      <option key={t} value={t} style={{background:"#1a1408"}}>{fmtTime(t)}</option>
                    ))}
                  </select>
                  {errors.time && <p style={errStyle}>{errors.time}</p>}
                </div>
 
                {/* Phone */}
                <div style={{gridColumn:"span 2"}}>
                  <label style={labelStyle}>Phone Number <span style={{color:"#c9a84c"}}>*</span></label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                    placeholder="+977 98XXXXXXXX" style={inputStyle(errors.phone)} autoComplete="tel"
                    onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,0.1)"}}
                    onBlur={e=>{e.target.style.borderColor=errors.phone?"#c0392b":"rgba(201,168,76,0.2)";e.target.style.boxShadow="none"}}/>
                  {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                </div>
 
                {/* Notes */}
                <div style={{gridColumn:"span 2"}}>
                  <label style={labelStyle}>Special Requests <span style={{fontFamily:"'Jost',sans-serif",fontSize:"0.78rem",textTransform:"none",letterSpacing:0,color:"rgba(245,239,230,0.3)"}}>optional</span></label>
                  <textarea name="notes" value={form.notes} onChange={handleChange}
                    placeholder="Allergies, preferences, medical conditions..." rows={3} maxLength={500}
                    style={{...inputStyle(false),resize:"vertical",minHeight:88,lineHeight:1.6}}
                    onFocus={e=>{e.target.style.borderColor="#c9a84c";e.target.style.boxShadow="0 0 0 3px rgba(201,168,76,0.1)"}}
                    onBlur={e=>{e.target.style.borderColor="rgba(201,168,76,0.2)";e.target.style.boxShadow="none"}}/>
                  <div style={{textAlign:"right",fontFamily:"'Jost',sans-serif",fontSize:"0.7rem",color:"rgba(245,239,230,0.25)",marginTop:4}}>{form.notes.length}/500</div>
                </div>
 
                {/* Error */}
                {status==="error" && (
                  <div style={{gridColumn:"span 2",background:"rgba(192,57,43,0.1)",border:"1px solid rgba(192,57,43,0.3)",borderLeft:"3px solid #c0392b",padding:"12px 16px",borderRadius:2,fontFamily:"'Jost',sans-serif",fontSize:"0.88rem",color:"#e74c3c"}}>
                    ⚠ {serverMsg}
                  </div>
                )}
 
                {/* Submit */}
                <div style={{gridColumn:"span 2"}}>
                  <button type="submit" disabled={status==="loading"} style={{
                    width:"100%",padding:"16px 24px",
                    background: status==="loading" ? "rgba(201,168,76,0.5)" : "#c9a84c",
                    color:"#0f0c08",border:"none",borderRadius:2,
                    fontFamily:"'Jost',sans-serif",fontSize:"0.8rem",fontWeight:600,
                    letterSpacing:"0.2em",textTransform:"uppercase",
                    cursor: status==="loading" ? "not-allowed" : "pointer",
                    transition:"all 0.25s",display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                  }}
                  onMouseEnter={e=>{ if(status!=="loading"){e.target.style.background="#a07830";e.target.style.color="#fff";}}}
                  onMouseLeave={e=>{ if(status!=="loading"){e.target.style.background="#c9a84c";e.target.style.color="#0f0c08";}}}>
                    {status==="loading" ? (
                      <>
                        <span style={{width:14,height:14,border:"2px solid rgba(15,12,8,0.3)",borderTopColor:"#0f0c08",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite"}}/>
                        Confirming...
                      </>
                    ) : "Confirm Booking"}
                  </button>
                </div>
 
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
 
function Footer() {
  return (
    <footer style={{background:"#080604",borderTop:"1px solid rgba(201,168,76,0.1)",width:"100%",padding:"60px 40px"}}>
      <div style={{maxWidth:1200,margin:"0 auto",textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:12}}>
          <span style={{color:"#c9a84c",fontSize:"1rem"}}>✦</span>
          <span style={{fontFamily:"'inter',serif",color:"#f5efe6",fontSize:"1.2rem",fontWeight:400}}>Mount Heaven Spa</span>
        </div>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.78rem",letterSpacing:"0.15em",color:"rgba(245,239,230,0.3)",marginBottom:28,textTransform:"uppercase"}}>
          Beauty is the illumination of the soul
        </p>
        <div style={{display:"flex",justifyContent:"center",gap:24,marginBottom:32,flexWrap:"wrap"}}>
          {[["Services","#services"],["About","#about"],["Gallery","#gallery"],["Book Now","#booking"],["Admin","/admin"]].map(([l,h])=>(
            <a key={l} href={h} style={{fontFamily:"'Jost',sans-serif",fontSize:"0.78rem",letterSpacing:"0.1em",color:"rgba(245,239,230,0.35)",textDecoration:"none",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color="#c9a84c"} onMouseLeave={e=>e.target.style.color="rgba(245,239,230,0.35)"}>{l}</a>
          ))}
        </div>
        <div style={{width:1,height:40,background:"linear-gradient(to bottom,rgba(201,168,76,0.2),transparent)",margin:"0 auto 24px"}}/>
        <p style={{fontFamily:"'Jost',sans-serif",fontSize:"0.72rem",color:"rgba(245,239,230,0.2)",letterSpacing:"0.05em"}}>
          © {new Date().getFullYear()} Mount Heaven Spa, Thamel, Kathmandu, Nepal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
 
export default function SpaWebsite() {
  return (
    <>
      <Nav />
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Booking />
      <Footer />
    </>
  );
}