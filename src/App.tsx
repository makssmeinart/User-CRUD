import {useEffect, useState} from "react";
import {addUser, findUser, removeUser, updateUserName, usersType} from "./store/reducers/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {globalReducer} from "./store/store";
import {User} from "./components/User";
import {AddItemForm} from "./components/AddItemForm";


export const App = () => {
    const [choseStorage, setChooseStorage] = useState(false)

    // Get Data from Redux Store
    const users = useSelector<globalReducer, usersType>(state => state.users.users)
    const dispatch = useDispatch()

    // onComponentDidMount chose the storage
    useEffect(() => {
        const storageType = localStorage.getItem("storageType")

        if (!storageType) {
            setChooseStorage(true)
        }

    }, [])

    // set Chosen method to localStorage
    const choseStoreType = (type: string) => {
        localStorage.setItem("storageType", type)
        setChooseStorage(false)
    }

    // CRUD
    const addUserCallback = (name: string) => {
        dispatch(addUser(name))
    }

    const updateUserNameCallback = (userId: string, newName: string) => {
        dispatch(updateUserName(userId, newName))
    }

    const removeUserCallback = (userId: string) => {
        dispatch(removeUser(userId))
    }

    const findUserCallback = (name: string) => {
        dispatch(findUser(name))
    }


    return (
        <>
            <div>
                <AddItemForm callback={addUserCallback} />
                <div>
                    <div>
                        <p>Search User</p>
                        <button>+</button>
                        <input type="text"/>
                    </div>
                </div>
                {choseStorage && <div>
                    <p>How would you like to manage your state?</p>
                    <button onClick={() => choseStoreType("localStorage")}>LocalStorage</button>
                    <button onClick={() => choseStoreType("reduxStorage")}>Redux Store</button>
                </div>}
                {/*    Users  */}
                {
                    users.map(user => {
                        return <User key={user.id}
                                     id={user.id}
                                     name={user.name}
                                     updateUserName={updateUserNameCallback}
                                     removeUser={removeUserCallback}
                        />
                    })
                }
            </div>
        </>

    )
}

export default App;
