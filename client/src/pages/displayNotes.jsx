import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NotebookPen } from 'lucide-react';
import { useParams } from 'react-router'
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import Modal from '../components/modal'


const initialstate={
  title:'',
  noteContent:''
}



const displayNotes = () => {

  const fetchUser=async(id)=>{
    try{
      const result=await axios.get(`http://localhost:5050/api/fetchUser/${id}`);
      console.log('user result from fetchuser',result.data.user);
      return result.data.user;
    }catch(e){
      console.log(e);
      return null;
    }
  }

  const [searchparams,setsearchparams]=useState('');
  const [user,setuser]=useState(null);
  const[note,setnote]=useState(initialstate);
  const [modalShow, setModalShow] =useState(false);
  const[isbeingviewed,setisbeingviewed]=useState(false);
  const[openindex,setopenindex]=useState(0);
  const[isbeingedited,setisbeingedited]=useState(false);


  const {id}=useParams();
  console.log('id',id);

  const fetchdata=async()=>{
    const res=await fetchUser(id);
    setuser(res);
  }
  
  useEffect(()=>{
      fetchdata();
  },[])

  useEffect(() => {
    console.log("Updated user state:", user);
  }, [user]);


  return (
    <div className='container-fluid p-0 bg-secondary-subtle' style={{minHeight:'100vh',overflowX: 'hidden', overflowY: 'auto'}}>
      <Navbar usercode={user?user.usercode:''}/>

      {user && (
        <Modal
          note={note}
          setnote={setnote}
          user={user}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => {
            setModalShow(false)
            setisbeingviewed(false)
            setisbeingedited(false)
            setnote(initialstate)
          }}
          fetchdata={fetchdata}
          isbeingviewed={isbeingviewed}
          isbeingedited={isbeingedited}
          openindex={openindex}
        />
      )}
      <div className='container'>
      <div>
        <button className='px-4 py-2 fs-5 fw-semibold shadow-sm border-0 text-light rounded-5 my-5' style={{backgroundColor:'rgb(70, 176, 144)'}}
        onClick={()=>{
          setModalShow(!modalShow);
        }}
        >Add New <NotebookPen className='mb-1' /></button>
      </div>

      <h3 className='mb-4 ms-3'> Saved Notes: </h3>

      <div className="container-fluid row mb-5">
        {user?.notes && user.notes.length > 0 ? (
          user.notes.map((note, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-lg-4 mb-4" style={{height:'35vh'}}>
              <NoteCard setisbeingviewed={setisbeingviewed} note={note} index={index} id={id} fetchdata={fetchdata} setModalShow={setModalShow} setopenindex={setopenindex} setisbeingedited={setisbeingedited} isbeingedited={isbeingedited}/>
            </div>
          ))
        ) : (
          <p className="text-center mt-5">No notes available. Click "Add New" to create a note.</p>
        )}
      </div>
      </div>
      
    </div>
  )
}

export default displayNotes;