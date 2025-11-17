export default function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" style={{
      position: "fixed",
      top:0,left:0,right:0,bottom:0,
      background:"rgba(0,0,0,0.5)",
      display:"flex",alignItems:"center",justifyContent:"center"
    }}>
      <div style={{background:"#fff", padding:"20px", borderRadius:"8px", minWidth:"300px", maxWidth:"500px"}}>
        {children}
        <button className="btn btn-danger" onClick={onClose} style={{marginTop:"10px"}}>Cerrar</button>
      </div>
    </div>
  )
}
