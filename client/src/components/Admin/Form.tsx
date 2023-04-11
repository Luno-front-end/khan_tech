import React, { ChangeEvent, FC, FormEvent } from 'react'
import { Button } from './Button'

interface FormProps {
    name: string,
    password:  string,
handleChange:(e: ChangeEvent<HTMLInputElement>)=> void
handleSubmite:(e:FormEvent<HTMLFormElement>)=> void
}


export const Form:FC<FormProps>= ({name,password, handleChange,handleSubmite}) => {
  return (
    <form className="form-signIn" onSubmit={(e) => handleSubmite(e)}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            required
            value={name}
            className="input-signIn"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            required
            value={password}
            className="input-signIn"
            onChange={handleChange}
          />
          <Button className="btn-signIn">SignIn</Button>
        </form>
  )
}
