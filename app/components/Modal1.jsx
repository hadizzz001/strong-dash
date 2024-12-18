const Modal1 = ({ children, modalOpen, setModalOpen }) => {
    return (
      <>
        {modalOpen && (
          <div className="bg-black/50 fixed inset-0" style={{zIndex:"9999"}}>
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-end bg-slate-300 p-5">
                <button onClick={() => setModalOpen(false)} className="text-2xl mb-3">&times;</button>
  
                {children}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal1;
  