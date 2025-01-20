import React from 'react';
import toast from 'react-hot-toast';
import { Copy, Eye, PencilLine, Trash2 } from 'lucide-react';
import axios from 'axios';


const deletetoast = () => toast.success('Note deleted successfully');
const copytoast = () => toast.success('Note copied to clipboard');



const NoteCard = ({ setisbeingviewed,note,index,id,fetchdata,setModalShow,setopenindex,setisbeingedited }) => {

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + ' ...';
    }
    return text;
  };

  const copynote=()=>{
    navigator.clipboard.writeText(note.noteContent)
      .then(() => {
        copytoast();
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  }

  const deletenote=async()=>{
    try{
      const response=await axios.delete(`http://localhost:5050/api/deleteNote/${id}?index=${index}`);
      if(response.data.success){
        console.log('response',response);
        fetchdata();
        deletetoast();
      }
    }catch(e){
      console.log(e);
    }
  }

  const viewnote=async()=>{
    setopenindex(index);
    setisbeingviewed(true);
    setModalShow(true);
  }

  const editnote=async()=>{
    setopenindex(index);
    setisbeingedited(true);
    setModalShow(true);
  }



  return (
    <div className="card shadow mb-4" style={{ height: '35vh', overflow: 'hidden' }}>
      <div className="card-header d-flex justify-content-between align-items-center bg-light p-3">
        <h5 className="m-0" >{note.title}</h5>
        <div>
          <button className="btn btn-sm btn-light border-0 text-secondary" title="Copy Note" onClick={copynote}>
            <Copy size={17}/>
          </button>
          <button className="btn btn-sm btn-light border-0 text-secondary" title="View Note" onClick={viewnote}>
            <Eye size={19}/>
          </button>
          <button className="btn btn-sm btn-light border-0 text-secondary" title="Edit Note" onClick={editnote}>
           <PencilLine size={17}/>
          </button>
          <button className="btn btn-sm btn-light border-0 text-secondary" title="Delete Note" onClick={deletenote}>
            <Trash2 size={17}/>
          </button>
        </div>
      </div>
      <div className="card-body text-secondary" style={{ overflow: 'hidden' }}>
        <p>{truncateText(note.noteContent, 150)}</p>
      </div>
    </div>
  );
};

export default NoteCard;
