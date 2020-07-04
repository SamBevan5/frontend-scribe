import React from 'react';
import UserContext from '../context/UserContext'

export default (props) => {
    
    const [notes, setNotes] = React.useState(null)
    const {userData} = React.useContext(UserContext)
    const [token, setToken] = React.useState(null)
    const [formData, updateFormData] = React.useState(null);

    React.useEffect(() => {
        const checkToken = JSON.parse(window.localStorage.getItem('auth-token'))
        if (checkToken) {
            setToken(checkToken)
        }
    }, [])

    React.useEffect(()=> {
        getNotes()
}, [])
    
    // Get all of the users notes from the API
    const getNotes = async () => {
        const response = await fetch('http://localhost:5000/notes', {
            headers: {Authorization: `bearer ${userData.token}`}
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
        console.log(formData);
        e.preventDefault()
        console.log(userData)

        const response = await fetch(`http://localhost:5000/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json" ,
            Authorization: `bearer ${userData.token}`
            },
            body: JSON.stringify(formData)
        });

        console.log(response)
        getNotes()

    }

    //Delete Note
    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:5000/notes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': "application/json" ,
            Authorization: `bearer ${userData.token}`}
        })
        getNotes();
    }
    

    return (
        <>
            <div className="Dashboard">
                <div className="Dashboard__header">
                    {<h1>Your Notes:</h1>}
                </div>
                <div className="Dashboard__main-content">
                    <ul className="Dashboard__main-content__grid">
                        { notes ? 
                            notes.map((note, index) => {
                                return (
                                    <div key={index}>
                                        <li key={index}>{note.title}</li>
                                        <div className="tooltip">
                                            <button onClick={()=> {
                                                    handleDelete(note._id)
                                                }}>Delete</button>
                                        </div>
                                    </div>
                                )  
                            })
                         : 
                         <div className="Notes__main-content__grid__error">
                             <h1> You dont have any Notes yet...</h1>
                         </div>
                        }
                        <form>
                            <fieldset>
                            <legend>New Note</legend>
                                <label htmlFor="title">Title:</label>
                                <input type="title" name="title" id="title" onChange={handleChange}/>

                                <label htmlFor="notes">Notes:</label>
                                <textarea id="notes"type="text" name="notes" onChange={handleChange}/>

                                <button type="submit" onClick={addNote}> Submit</button>
                                </fieldset>
                        </form>
                        
                    </ul>
                </div>
            </div>
        </>
    );
};
