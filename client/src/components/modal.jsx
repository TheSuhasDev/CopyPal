import axios from "axios";
import { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";


const initialstate={
    title:'',
    noteContent:''
  }

const addtoast = () => toast.success('Note created successfully');
const edittoast = () => toast.success('Note updated successfully');


export default function BootstrapModal(props) {
    
    console.log('user details in modal:',props.user)
    const id=props.user._id;
    
    
    useEffect(() => {
        if (props.isbeingviewed || props.isbeingedited) {
          props.setnote(props.user.notes[props.openindex]);
        } else {
          props.setnote(initialstate);
        }
      }, [props.isbeingviewed, props.isbeingedited, props.user.notes, props.openindex]);


    const addnote=async()=>{
        try{
            const result=await axios.post(`http://localhost:5050/api/addNote/${id}`,props.note);
            if(result.status===200){
                console.log('note added',result.user);
                props.fetchdata();
            }
        }catch(e){
            console.log(e)
        }
    }
    const editnote=async()=>{
        try{
            console.log('openindex',props.openindex)
            const result=await axios.put(`http://localhost:5050/api/editNote/${id}`,{title:props.note.title,noteContent:props.note.noteContent,index:props.openindex});
            if(result.status===200){
                console.log('note updated',result.user);
                props.fetchdata();
            }
        }catch(e){
            console.log(e)
        }
    }

    const handleaddclick=()=>{
        addnote();
        props.setnote(initialstate);
        props.setModalShow(false);
        addtoast();
    }

    const handleeditclick=()=>{
        editnote();
        props.setnote(initialstate);
        props.setModalShow(false);
        edittoast();
    }

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            {
                props.isbeingviewed||props.isbeingedited?props.user.notes[props.openindex].title:'Add new note'
            }
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p className="fs-5">Title :</p>
            <input
            value={props.note.title}
            onChange={(e) =>
                props.setnote({
                  ...props.note,
                  title: e.target.value,
                })
              }
            type="text"
            disabled={props.isbeingviewed}
            placeholder="Enter title"
            className="mb-4 text-secondary form-control "
            />
            <p className="fs-5">Note :</p>
            <textarea
            value={props.note.noteContent}
            onChange={(e) =>
                props.setnote({
                  ...props.note,
                  noteContent: e.target.value,
                })
              }
            type="text"
            disabled={props.isbeingviewed}
            style={{ height: "200px" }}
            placeholder="Enter note"
            className="col-8 text-secondary form-control mb-4"
            />
            <div className="row justify-content-center px-3">
            <button
            onClick={()=>{
                props.isbeingedited?
                handleeditclick()
                :
                handleaddclick()
            }}
            className={`${props.isbeingviewed?'d-none':''} btn col-sm-6 col-md-8 col-lg-6 py-2 text-light`} style={{backgroundColor:'rgb(74, 191, 156)'}}>
                {props.isbeingedited?'Update':'Add'}
            </button>
            </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
        </Modal>
    );
}
