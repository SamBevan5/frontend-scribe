import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import 'primeicons/primeicons.css';

export default (props) => {

    const [notes, setNotes] = React.useState(null)
    const [token, setToken] = React.useState(null)
    const [formData, updateFormData] = React.useState(null);
    const [value, setValue] = useState('');
    const [showSidebar, setshowSidebar] = React.useState(true)

    React.useEffect(() => {
        const checkToken = JSON.parse(window.localStorage.getItem('auth-token'))
        if (checkToken) {
            setToken(checkToken)
        }
    }, [])

    React.useEffect(() => {
        getNotes()
    }, [])

    // Get all of the users notes from the API
    const getNotes = async () => {
        const response = await fetch('http://localhost:5000/notes', {
            headers: { Authorization: `bearer ${userData.token}` }
        })
        const result = await response.json();
        if (result.length > 0) {
            setNotes(result)
        } else {
            setNotes(null);
        }

    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const addNote = async (e) => {
        console.log(value)
        console.log(userData)
        console.log(formData);

        e.preventDefault()

        let finalData = formData;
        finalData.notes = value;
        console.log(finalData)

        const response = await fetch(`http://localhost:5000/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                Authorization: `bearer ${userData.token}`
            },
            body: JSON.stringify(finalData)
        });

        console.log(response)
        getNotes()

    }

    //Delete Note
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json",
                Authorization: `bearer ${userData.token}`
            }
        })
        getNotes();
    }

    const toggleSidebar = () => {
        if (showSidebar == true) {
            setshowSidebar(false)
        } else {
            setshowSidebar(true)
        }
        console.log(showSidebar);
    }

    const divStyle = {
        'height': '50vh',
        'overflow': 'hidden',
        'width': '100%',
        'border-bottom': '1px solid #d8d8d8',
    }

    const { userData, setUserData } = useContext(UserContext)
    const history = useHistory();

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.removeItem("auth-token")
        history.push('/')
    }


    return (
        <>
            <div className="Dashboard">
                <div className="Dashboard__main-content">
                    <div className="Dashboard__main-content__sidebar">
                        <div className="Dashboard__main-content__sidebar__slider">
                            <div className="Dashboard__main-content__sidebar__slider__icon" onClick={() => { toggleSidebar() }}>
                                <i className="pi pi-list"></i>
                            </div>
                        </div>
                        {showSidebar ?
                            <div className="Dashboard__main-content__sidebar__content">
                                <div className="Dashboard__main-content__sidebar__content__addnote" >
                                    <div className="item-add"> <i className="pi pi-plus-circle" style={{ color: "green", fontSize: "1.8em", margin: "0", padding: "0" }}></i> Add a Note</div>
                                </div>
                                {notes ?
                                    notes.map((note, index) => {
                                        return (
                                            <div className="Dashboard__main-content__sidebar__content__item" key={index}>
                                                <div className="item-title" key={index}>{note.title}</div>
                                                <div className="tooltip">
                                                    <button onClick={() => {
                                                        handleDelete(note._id)
                                                    }}>X</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : ""
                                }
                            </div> : ""
                        }
                    </div>
                    <div className="Dashboard__main-content__note-container">
                        <div className="Dashboard__main-content__note-container__logo">
                            <div></div>
                            <img src="scribe.png" alt="scribe-logo"></img>
                            <div className="dashnav__links">
                                <Link to="" style={{ textDecoration: 'none' }}><span id="logout" onClick={logout}>Logout</span></Link>
                            </div>
                        </div>
                        <div className="Dashboard__main-content__note-container__note">
                            <form>
                                <label htmlFor="title">Title:</label><br />
                                <input type="title" name="title" id="title" onChange={handleChange} /><br />
                                <label htmlFor="notes">Body:</label><br />
                                <div className="editor-area">
                                    <ReactQuill id="notes" theme="snow" value={value} onChange={setValue} style={divStyle} />
                                </div><br />
                                <button type="submit" onClick={addNote}> Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
