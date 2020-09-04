import React, { useEffect, useState } from 'react'
import { useCombobox } from 'downshift'

function UserSearchBar() {
  const [inputItems, setInputItems] = useState([])
  const [users, setUsers] = useState([])
  const [singleUser, setSingleUser] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
  }, [])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        users.filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
  })

  return (
    <div className="searchUser">
      <h2>Hi user! {singleUser}</h2>
      <div {...getComboboxProps()}>
        <input {...getInputProps()}
          placeholder="Search users"
          enterBotton="Search"
          size="large"
        />
      </div>
      <ul {...getMenuProps}>
        {isOpen &&
          inputItems.map((item, index) => (
            <span key={item.id} {...getItemProps({item, index})} onClick={() => setSingleUser(item.name)}>
              <li style={highlightedIndex === index? {background: "#ede"} : {}}>
                <h4>{item.name}</h4>
              </li>
            </span>
          ))
        }
      </ul>
    </div>
  )
}

export default UserSearchBar

