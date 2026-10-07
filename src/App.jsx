import React, { useState, useRef } from "react";

// ---------- small decorative corner ornament ----------
function Corner({ rotate = 0 }) {
  return (
    <svg
      viewBox="0 0 90 90"
      width="56"
      height="56"
      style={{ transform: `rotate(${rotate}deg)` }}
      className="corner-svg"
    >
      <circle cx="18" cy="18" r="9" fill="none" stroke="#8a6d3b" strokeWidth="1.4" />
      <circle cx="18" cy="18" r="3" fill="#8a6d3b" />
      <path
        d="M27 18 C45 8, 60 8, 82 4"
        fill="none"
        stroke="#8a6d3b"
        strokeWidth="1.4"
      />
      <path
        d="M18 27 C8 45, 8 60, 4 82"
        fill="none"
        stroke="#8a6d3b"
        strokeWidth="1.4"
      />
      <circle cx="66" cy="10" r="4" fill="none" stroke="#8a6d3b" strokeWidth="1.2" />
      <circle cx="10" cy="66" r="4" fill="none" stroke="#8a6d3b" strokeWidth="1.2" />
      <path
        d="M30 12 Q34 4 42 6"
        fill="none"
        stroke="#8a6d3b"
        strokeWidth="1"
      />
    </svg>
  );
}

// ---------- editable label:value row ----------
function Row({ label, value, onChange, multiline = false }) {
  return (
    <div className="row">
      <div className="row-label">{label}</div>
      <div className="row-colon">:</div>
      {multiline ? (
        <textarea
          className="row-value row-value-area"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={2}
        />
      ) : (
        <input
          className="row-value"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

export default function App() {
  const [personal, setPersonal] = useState({
    नाव: "ऋतुजा भागवत खर्चे",
    जन्मतारीख: "16-04-2001",
    जन्मवेळ: "दुपारी 2 वाजून 10 मिनिटे",
    जन्मनाव: "जया",
    जन्मस्थळ: "बोरगांव बाजार, तालुका - सिल्लोड, जिल्हा - संभाजीनगर",
    मूळगावं: "शेलगाव बाजार ता. मलकापूर जि. बुलढाणा",
    मामकुळ: "चौंधरी (झोपे), फैजपुर",
    गोत्र: "वशिष्ठ",
    राशी: "मकर",
    नक्षत्र: "श्रवण",
    गण: "देव",
    वर्ण: "निमगोटा",
    रक्तगट: "ए+",
    उंची: "5 फूट 3 इंच",
    शिक्षण: "BE (Computer)",
    नोकरी: "Software Engineer, Neosoft Technologies International, Pune",
    वेतन: "5,64,000 वार्षिक",
  });

  const [family, setFamily] = useState({
    वडिलांचेनाव: "भागवत किसन खर्चे, धनकवडी, पुणे , 9890974966",
    वडिलांचाव्यवसाय: "नोकरी",
    आईचेनाव: "रंजना भागवत खर्चे (गृहिणी) 9762307750",
    बहीण: "1 , अविवाहित",
  });

  const [contacts, setContacts] = useState([
    { name: "श्री श्रीकृष्ण भोळे", detail: "9960287624 , भारती विद्यापीठं , पुणे" },
    { name: "श्री राजेंद्र पाटील", detail: "9561198611, नाशिक" },
    { name: "श्री निलेश चौधरी", detail: "9765688030, बोरगांव बाजार (सिल्लोड)" },
  ]);

  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const updatePersonal = (key) => (val) =>
    setPersonal((p) => ({ ...p, [key]: val }));
  const updateFamily = (key) => (val) =>
    setFamily((f) => ({ ...f, [key]: val }));
  const updateContact = (idx, field) => (val) =>
    setContacts((c) => {
      const next = [...c];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handlePrint = () => window.print();

  return (
    <div className="page-wrap">
      <style>{`
        * { box-sizing: border-box; }
        .page-wrap {
          background: #ece7dc;
          min-height: 100vh;
          padding: 24px 12px 60px;
          font-family: 'Noto Sans Devanagari', 'Noto Sans', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .toolbar {
          width: 100%;
          max-width: 760px;
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-bottom: 14px;
        }
        .btn {
          background: #8a6d3b;
          color: #fff;
          border: none;
          padding: 9px 16px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          font-weight: 600;
          letter-spacing: .2px;
        }
        .btn.secondary {
          background: transparent;
          color: #6b5a3a;
          border: 1px solid #8a6d3b;
        }
        .sheet {
          background: #f7f4ec;
          width: 100%;
          max-width: 760px;
          position: relative;
          border: 2.5px solid #4a3c22;
          padding: 10px;
        }
        .sheet-inner {
          border: 1px solid #8a6d3b;
          padding: 26px 34px 30px;
          position: relative;
        }
        .corner-svg { position: absolute; }
        .corner-tl { top: -4px; left: -4px; }
        .corner-tr { top: -4px; right: -4px; }
        .corner-bl { bottom: -4px; left: -4px; }
        .corner-br { bottom: -4px; right: -4px; }

        .header {
          text-align: center;
          margin-bottom: 14px;
        }
        .header .om-line {
          font-size: 17px;
          font-weight: 700;
          color: #4a3c22;
          margin-bottom: 2px;
        }
        .header .section-title {
          font-size: 21px;
          font-weight: 800;
          color: #3a2f18;
          letter-spacing: .5px;
        }

        .personal-flex {
          display: flex;
          gap: 18px;
        }
        .fields-col { flex: 1; min-width: 0; }
        .photo-col {
          width: 150px;
          flex-shrink: 0;
        }
        .photo-box {
          width: 150px;
          height: 180px;
          border: 1.5px dashed #a3906a;
          background: #efe9da;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          cursor: pointer;
          border-radius: 4px;
        }
        .photo-box img { width: 100%; height: 100%; object-fit: cover; }
        .photo-box .placeholder {
          font-size: 12px;
          color: #8a7550;
          text-align: center;
          padding: 8px;
        }

        .row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          padding: 2.5px 0;
          font-size: 14px;
        }
        .row-label {
          width: 122px;
          flex-shrink: 0;
          color: #3a2f18;
          font-weight: 500;
        }
        .row-colon { width: 10px; color: #3a2f18; }
        .row-value {
          flex: 1;
          border: none;
          border-bottom: 1px solid transparent;
          background: transparent;
          color: #22190c;
          font-size: 14px;
          font-family: inherit;
          padding: 1px 2px;
          min-width: 0;
        }
        .row-value:focus {
          outline: none;
          border-bottom: 1px solid #8a6d3b;
        }
        .row-value-area {
          resize: none;
          line-height: 1.35;
        }

        .section-heading {
          text-align: center;
          font-size: 17px;
          font-weight: 800;
          color: #3a2f18;
          margin: 16px 0 6px;
        }

        .contact-row {
          display: flex;
          align-items: baseline;
          gap: 4px;
          padding: 2.5px 0;
          font-size: 14px;
        }
        .contact-name {
          width: 150px;
          flex-shrink: 0;
          border: none;
          background: transparent;
          font-family: inherit;
          font-size: 14px;
          color: #3a2f18;
          font-weight: 500;
        }
        .contact-name:focus { outline: none; border-bottom: 1px solid #8a6d3b; }
        .contact-colon { width: 10px; }
        .contact-detail {
          flex: 1;
          border: none;
          background: transparent;
          font-family: inherit;
          font-size: 14px;
          color: #22190c;
        }
        .contact-detail:focus { outline: none; border-bottom: 1px solid #8a6d3b; }

        @media print {
          @page { size: A4; margin: 10mm; }
          body { background: #fff; }
          .toolbar { display: none !important; }
          .page-wrap { background: #fff; padding: 0; }
          .sheet { box-shadow: none; max-width: 100%; }
          .photo-box { border-style: solid; }
          .row-value, .contact-name, .contact-detail { border-bottom: none !important; }
        }
      `}</style>

      <div className="toolbar">
        <button className="btn secondary" onClick={() => fileInputRef.current?.click()}>
          फोटो अपलोड करा
        </button>
        <button className="btn" onClick={handlePrint}>
          Print / Save as PDF
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handlePhoto}
        style={{ display: "none" }}
      />

      <div className="sheet">
        <div className="sheet-inner">
          <Corner rotate={0} />
          <div className="corner-svg corner-tr" style={{ transform: "scaleX(-1)" }}>
            <Corner rotate={0} />
          </div>
          <div className="corner-svg corner-bl" style={{ transform: "scaleY(-1)" }}>
            <Corner rotate={0} />
          </div>
          <div className="corner-svg corner-br" style={{ transform: "scale(-1,-1)" }}>
            <Corner rotate={0} />
          </div>

          <div className="header">
            <div className="om-line">|| श्री गणेशाय नम: ||</div>
            <div className="section-title">वैयक्तिक माहिती</div>
          </div>

          <div className="personal-flex">
            <div className="fields-col">
              <Row label="नाव" value={personal.नाव} onChange={updatePersonal("नाव")} />
              <Row label="जन्म तारीख" value={personal.जन्मतारीख} onChange={updatePersonal("जन्मतारीख")} />
              <Row label="जन्म वेळ" value={personal.जन्मवेळ} onChange={updatePersonal("जन्मवेळ")} />
              <Row label="जन्म नाव" value={personal.जन्मनाव} onChange={updatePersonal("जन्मनाव")} />
              <Row label="जन्म स्थळ" value={personal.जन्मस्थळ} onChange={updatePersonal("जन्मस्थळ")} multiline />
              <Row label="मूळ गावं" value={personal.मूळगावं} onChange={updatePersonal("मूळगावं")} multiline />
              <Row label="मामकुळ" value={personal.मामकुळ} onChange={updatePersonal("मामकुळ")} />
            </div>
            <div className="photo-col">
              <div className="photo-box" onClick={() => fileInputRef.current?.click()}>
                {photo ? (
                  <img src={photo} alt="profile" />
                ) : (
                  <div className="placeholder">+ फोटो जोडा</div>
                )}
              </div>
            </div>
          </div>

          <Row label="गोत्र" value={personal.गोत्र} onChange={updatePersonal("गोत्र")} />
          <Row label="राशी" value={personal.राशी} onChange={updatePersonal("राशी")} />
          <Row label="नक्षत्र" value={personal.नक्षत्र} onChange={updatePersonal("नक्षत्र")} />
          <Row label="गण" value={personal.गण} onChange={updatePersonal("गण")} />
          <Row label="वर्ण" value={personal.वर्ण} onChange={updatePersonal("वर्ण")} />
          <Row label="रक्तगट" value={personal.रक्तगट} onChange={updatePersonal("रक्तगट")} />
          <Row label="ऊंची" value={personal.उंची} onChange={updatePersonal("उंची")} />
          <Row label="शिक्षण" value={personal.शिक्षण} onChange={updatePersonal("शिक्षण")} />
          <Row label="नोकरी/व्यवसाय" value={personal.नोकरी} onChange={updatePersonal("नोकरी")} multiline />
          <Row label="वेतन/उत्पन्न" value={personal.वेतन} onChange={updatePersonal("वेतन")} />

          <div className="section-heading">कौटुंबिक माहिती</div>
          <Row label="वडिलांचे नाव" value={family.वडिलांचेनाव} onChange={updateFamily("वडिलांचेनाव")} multiline />
          <Row label="वडिलांचा व्यवसाय" value={family.वडिलांचाव्यवसाय} onChange={updateFamily("वडिलांचाव्यवसाय")} />
          <Row label="आईचे नाव" value={family.आईचेनाव} onChange={updateFamily("आईचेनाव")} multiline />
          <Row label="बहीण" value={family.बहीण} onChange={updateFamily("बहीण")} />

          <div className="section-heading">संपर्क</div>
          {contacts.map((c, i) => (
            <div className="contact-row" key={i}>
              <input
                className="contact-name"
                value={c.name}
                onChange={(e) => updateContact(i, "name")(e.target.value)}
              />
              <div className="contact-colon">:</div>
              <input
                className="contact-detail"
                value={c.detail}
                onChange={(e) => updateContact(i, "detail")(e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
